document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const form = document.getElementById('analyzer-form');
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('resume-file');
    const filePreview = document.getElementById('file-preview');
    const fileName = document.getElementById('file-name');
    const btnRemoveFile = document.getElementById('btn-remove-file');
    
    const tabFileMode = document.getElementById('tab-file-mode');
    const tabTextMode = document.getElementById('tab-text-mode');
    const dropzoneContent = document.querySelector('.dropzone-content');
    const textModeArea = document.getElementById('text-mode-area');
    const resumeText = document.getElementById('resume-text');
    const jobDescription = document.getElementById('job-description');
    
    const btnAnalyze = document.getElementById('btn-analyze');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const btnLoadSample = document.getElementById('btn-load-sample');
    
    const accordionToggle = document.getElementById('accordion-toggle');
    const accordionContent = document.getElementById('accordion-content');
    const apiKeyInput = document.getElementById('api-key');
    const apiStatusText = document.getElementById('api-status-text');
    
    const emptyState = document.getElementById('empty-state');
    const resultsDashboard = document.getElementById('results-dashboard');

    let currentMode = 'file'; // 'file' or 'text'
    let selectedFile = null;

    // --- Mode Tab Switching ---
    tabFileMode.addEventListener('click', () => {
        currentMode = 'file';
        tabFileMode.classList.add('active');
        tabTextMode.classList.remove('active');
        dropzone.classList.remove('hidden');
        textModeArea.classList.add('hidden');
    });

    tabTextMode.addEventListener('click', () => {
        currentMode = 'text';
        tabTextMode.classList.add('active');
        tabFileMode.classList.remove('active');
        dropzone.classList.add('hidden');
        textModeArea.classList.remove('hidden');
    });

    // --- Drag and Drop Handlers ---
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFileSelect(fileInput.files[0]);
        }
    });

    function handleFileSelect(file) {
        selectedFile = file;
        fileName.textContent = file.name;
        dropzoneContent.classList.add('hidden');
        filePreview.classList.remove('hidden');
    }

    btnRemoveFile.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedFile = null;
        fileInput.value = '';
        filePreview.classList.add('hidden');
        dropzoneContent.classList.remove('hidden');
    });

    // --- Accordion Toggle ---
    accordionToggle.addEventListener('click', () => {
        accordionContent.classList.toggle('hidden');
    });

    apiKeyInput.addEventListener('input', () => {
        if (apiKeyInput.value.trim().length > 5) {
            apiStatusText.textContent = "Gemini AI Enabled";
        } else {
            apiStatusText.textContent = "NLP Matcher Active";
        }
    });

    // --- Load Sample Data ---
    btnLoadSample.addEventListener('click', async () => {
        try {
            btnLoadSample.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Loading...`;
            const response = await fetch('/api/sample');
            const data = await response.json();
            
            // Switch to text mode and populate text fields
            tabTextMode.click();
            resumeText.value = data.resume;
            jobDescription.value = data.job_description;
            
            btnLoadSample.innerHTML = `<i class="fa-solid fa-check"></i> Sample Loaded`;
            setTimeout(() => {
                btnLoadSample.innerHTML = `<i class="fa-solid fa-bolt"></i> Load Sample Data`;
            }, 2000);
        } catch (err) {
            alert('Failed to load sample data.');
            btnLoadSample.innerHTML = `<i class="fa-solid fa-bolt"></i> Load Sample Data`;
        }
    });

    // --- Results Dashboard Navigation Tabs ---
    const dashTabs = document.querySelectorAll('.dash-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');

    dashTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPaneId = tab.getAttribute('data-tab');
            
            dashTabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(targetPaneId).classList.add('active');
        });
    });

    // --- Form Submission & API Call ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const jdValue = jobDescription.value.trim();
        if (!jdValue) {
            alert("Please enter a target Job Description.");
            return;
        }

        if (currentMode === 'file' && !selectedFile) {
            alert("Please upload a resume file or switch to Paste Text mode.");
            return;
        }

        if (currentMode === 'text' && !resumeText.value.trim()) {
            alert("Please paste your resume text.");
            return;
        }

        // Show loading state
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        btnAnalyze.disabled = true;

        const formData = new FormData();
        if (currentMode === 'file' && selectedFile) {
            formData.append('file', selectedFile);
        } else {
            formData.append('resume_text', resumeText.value.trim());
        }
        formData.append('job_description', jdValue);
        
        if (apiKeyInput.value.trim()) {
            formData.append('api_key', apiKeyInput.value.trim());
        }

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Error processing request.");
            }

            renderDashboardResults(data);

        } catch (err) {
            alert(err.message || "An unexpected error occurred.");
        } finally {
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
            btnAnalyze.disabled = false;
        }
    });

    // --- Render Results Function ---
    function renderDashboardResults(data) {
        emptyState.classList.add('hidden');
        resultsDashboard.classList.remove('hidden');

        // 1. Overall Score Ring & Breakdown Bars
        const score = data.ats_score;
        const ring = document.getElementById('score-progress-ring');
        const circumference = 314; // 2 * pi * r (50)
        const offset = circumference - (score / 100) * circumference;
        ring.style.strokeDashoffset = offset;

        // Color thresholding
        if (score >= 80) {
            ring.style.stroke = "var(--success)";
            document.getElementById('score-verdict-tag').textContent = "Excellent Fit";
            document.getElementById('score-verdict-tag').className = "score-verdict-tag";
        } else if (score >= 60) {
            ring.style.stroke = "var(--warning)";
            document.getElementById('score-verdict-tag').textContent = "Moderate Fit";
            document.getElementById('score-verdict-tag').style.color = "var(--warning)";
            document.getElementById('score-verdict-tag').style.background = "var(--warning-bg)";
        } else {
            ring.style.stroke = "var(--danger)";
            document.getElementById('score-verdict-tag').textContent = "Low Alignment";
            document.getElementById('score-verdict-tag').style.color = "var(--danger)";
            document.getElementById('score-verdict-tag').style.background = "var(--danger-bg)";
        }

        // Animate counter
        animateCounter('ats-score-num', 0, Math.round(score), 800);

        // Breakdown bars
        const bd = data.similarity_breakdown;
        document.getElementById('score-tfidf').textContent = `${bd.tf_idf_similarity}%`;
        document.getElementById('fill-tfidf').style.width = `${bd.tf_idf_similarity}%`;

        document.getElementById('score-skill').textContent = `${bd.skill_match_percentage}%`;
        document.getElementById('fill-skill').style.width = `${bd.skill_match_percentage}%`;

        document.getElementById('score-health').textContent = `${bd.health_score}%`;
        document.getElementById('fill-health').style.width = `${bd.health_score}%`;

        // 2. Skill Gap Tab
        const skills = data.skill_analysis;
        document.getElementById('count-matched').textContent = skills.matched_skills.length;
        document.getElementById('count-missing').textContent = skills.missing_skills.length;

        const containerMatched = document.getElementById('container-matched-skills');
        containerMatched.innerHTML = skills.matched_skills.length > 0 
            ? skills.matched_skills.map(s => `<span class="skill-pill matched-pill">${s}</span>`).join('')
            : `<p class="health-text">No matched skills detected in taxomony.</p>`;

        const containerMissing = document.getElementById('container-missing-skills');
        containerMissing.innerHTML = skills.missing_skills.length > 0
            ? skills.missing_skills.map(s => `<span class="skill-pill missing-pill">${s}</span>`).join('')
            : `<p class="health-text">Great job! All key required skills are present in your resume.</p>`;

        // 3. Resume Health Tab
        const health = data.health_metrics;
        document.getElementById('health-word-status').textContent = health.word_count_status;
        document.getElementById('health-word-msg').textContent = health.word_count_msg;

        const contacts = health.contact_health.contacts_found;
        const contactList = document.getElementById('health-contact-list');
        contactList.innerHTML = `
            <li><i class="fa-solid ${contacts.email ? 'fa-check text-success' : 'fa-xmark text-danger'}"></i> Email: ${contacts.email || 'Not found'}</li>
            <li><i class="fa-solid ${contacts.phone ? 'fa-check text-success' : 'fa-xmark text-danger'}"></i> Phone: ${contacts.phone || 'Not found'}</li>
            <li><i class="fa-solid ${contacts.linkedin ? 'fa-check text-success' : 'fa-xmark text-danger'}"></i> LinkedIn: ${contacts.linkedin ? 'Present' : 'Not found'}</li>
            <li><i class="fa-solid ${contacts.github ? 'fa-check text-success' : 'fa-xmark text-danger'}"></i> GitHub: ${contacts.github ? 'Present' : 'Not found'}</li>
        `;

        document.getElementById('health-metrics-text').textContent = `Detected ${health.quantifiable_metrics.count} measurable data points (%, $, figures). Score: ${health.quantifiable_metrics.score}/100`;
        
        document.getElementById('health-verbs-text').textContent = `Strong action verb intensity ratio: ${health.action_verbs.strong_ratio}%. Weak phrases found: ${health.action_verbs.weak_verbs_found.length}`;

        // 4. AI Insights Tab
        const ai = data.ai_insights;
        document.getElementById('ai-exec-summary').textContent = ai.executive_summary || "Executive summary unavailable.";

        const strengthsList = document.getElementById('ai-strengths-list');
        strengthsList.innerHTML = (ai.top_strengths || []).map(str => `<li><i class="fa-solid fa-circle-check text-success"></i> ${str}</li>`).join('');

        const improvementsList = document.getElementById('ai-improvements-list');
        improvementsList.innerHTML = (ai.key_improvements || []).map(imp => `<li><i class="fa-solid fa-lightbulb text-warning"></i> ${imp}</li>`).join('');

        // 5. Bullet Rewriter Tab
        const rewritesContainer = document.getElementById('rewrite-cards-container');
        if (ai.bullet_rewrites && ai.bullet_rewrites.length > 0) {
            rewritesContainer.innerHTML = ai.bullet_rewrites.map(rw => `
                <div class="rewrite-card">
                    <div class="rewrite-box original">
                        <span class="label">Original Bullet</span>
                        <p>${rw.original}</p>
                    </div>
                    <div class="rewrite-box transformed">
                        <span class="label"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Re-engineered Bullet</span>
                        <p>${rw.rewritten}</p>
                    </div>
                </div>
            `).join('');
        } else {
            rewritesContainer.innerHTML = `<p class="health-text">No bullet points require rewriting.</p>`;
        }
    }

    function animateCounter(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
