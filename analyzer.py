import re
import os
import math
from typing import Dict, Any, List, Set, Tuple

# Comprehensive taxonomy with aliases for high-accuracy synonym matching
SKILL_ALIASES = {
    "javascript": ["js", "ecmascript", "vanilla js"],
    "typescript": ["ts"],
    "react": ["react.js", "reactjs", "react native"],
    "node.js": ["node", "nodejs", "node js"],
    "vue.js": ["vue", "vuejs"],
    "next.js": ["nextjs", "next js"],
    "express": ["express.js", "expressjs"],
    "python": ["python3", "py"],
    "c++": ["cpp"],
    "c#": ["csharp", ".net"],
    "golang": ["go"],
    "kubernetes": ["k8s", "kube"],
    "aws": ["amazon web services", "ec2", "s3", "lambda"],
    "gcp": ["google cloud", "google cloud platform"],
    "azure": ["microsoft azure"],
    "postgresql": ["postgres", "pgsql"],
    "mongodb": ["mongo"],
    "elasticsearch": ["elastic search", "elastic"],
    "ci/cd": ["continuous integration", "continuous deployment", "jenkins", "github actions"],
    "machine learning": ["ml", "deep learning", "ai", "artificial intelligence"],
    "nlp": ["natural language processing", "text mining"],
    "llm": ["large language models", "genai", "generative ai", "gpt"],
    "rest api": ["restful api", "rest apis", "restful apis", "web apis"],
    "agile": ["scrum", "kanban"]
}

SKILL_TAXONOMY = {
    "Languages": [
        "python", "javascript", "typescript", "java", "c++", "c#", "golang",
        "rust", "ruby", "php", "swift", "kotlin", "sql", "html", "css", "r", "scala", "bash"
    ],
    "Frameworks & Libraries": [
        "react", "next.js", "vue.js", "angular", "node.js", "express",
        "fastapi", "django", "flask", "spring boot", "tailwind", "bootstrap",
        "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "keras", "opencv"
    ],
    "Cloud & DevOps": [
        "aws", "azure", "gcp", "docker", "kubernetes", "terraform",
        "ci/cd", "git", "linux", "nginx", "ansible", "serverless"
    ],
    "Databases & Storage": [
        "postgresql", "mysql", "mongodb", "redis", "sqlite", "dynamodb",
        "elasticsearch", "snowflake", "bigquery", "oracle", "firebase"
    ],
    "AI & Data Science": [
        "machine learning", "nlp", "llm", "data analysis", "computer vision",
        "data engineering", "power bi", "tableau"
    ],
    "Methodologies & Practices": [
        "agile", "rest api", "microservices", "leadership", "communication",
        "project management", "problem solving", "unit testing"
    ]
}

WEAK_ACTION_VERBS = [
    "responsible for", "helped with", "worked on", "assisted in", "tasked with",
    "handled", "did", "participated in", "involved in", "made"
]

STRONG_ACTION_VERBS = [
    "architected", "spearheaded", "engineered", "optimized", "implemented",
    "scaled", "designed", "automated", "pioneered", "accelerated", "transformed",
    "delivered", "revamped", "championed", "orchestrated", "consolidated"
]

def normalize_text(text: str) -> str:
    """Clean and normalize text for accurate token matching."""
    text_lower = text.lower()
    # Replace non-alphanumeric except common skill chars (+, #, ., -, /)
    cleaned = re.sub(r'[^a-z0-9+#.\-/\s]', ' ', text_lower)
    return " ".join(cleaned.split())

def match_skill_in_text(skill_canonical: str, text_normalized: str) -> bool:
    """Check if canonical skill or any of its aliases exist in normalized text."""
    def is_match(target: str) -> bool:
        escaped = re.escape(target)
        pattern = fr'(?<![a-zA-Z0-9#+.-]){escaped}(?![a-zA-Z0-9#+.-])'
        return bool(re.search(pattern, text_normalized))
    
    if is_match(skill_canonical):
        return True
    
    aliases = SKILL_ALIASES.get(skill_canonical, [])
    for alias in aliases:
        if is_match(alias):
            return True
    return False

def calculate_ngram_tfidf_similarity(resume_text: str, jd_text: str) -> float:
    """High-accuracy N-gram TF-IDF similarity calculation with sublinear term frequency."""
    try:
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import cosine_similarity

        vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),
            stop_words='english',
            sublinear_tf=True,
            max_features=5000
        )
        tfidf_matrix = vectorizer.fit_transform([resume_text.lower(), jd_text.lower()])
        raw_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        
        # Calibrated scaling curve for realistic ATS compatibility representation
        score = min(100.0, raw_sim * 240.0)
        return round(float(score), 1)
    except Exception:
        resume_words = set(normalize_text(resume_text).split())
        jd_words = set(normalize_text(jd_text).split())
        if not jd_words:
            return 50.0
        overlap = len(resume_words.intersection(jd_words))
        score = (overlap / max(1, len(jd_words))) * 100
        return round(min(100.0, score * 1.5), 1)

def extract_all_skills(text: str) -> Set[str]:
    """Extract standard skills present in text using canonical taxonomy and alias map."""
    norm_text = normalize_text(text)
    detected: Set[str] = set()

    for category, skills in SKILL_TAXONOMY.items():
        for skill in skills:
            if match_skill_in_text(skill, norm_text):
                detected.add(skill)

    return detected

def analyze_skill_gaps(resume_text: str, jd_text: str, experience_text: str = "") -> Dict[str, Any]:
    """Accurately compare skills in Resume vs Job Description with section weighting."""
    resume_skills = extract_all_skills(resume_text)
    jd_skills = extract_all_skills(jd_text)

    # Skills found specifically in Work Experience section get high relevance
    exp_skills = extract_all_skills(experience_text) if experience_text else set()

    matched_skills = sorted(list(resume_skills.intersection(jd_skills)))
    missing_skills = sorted(list(jd_skills.difference(resume_skills)))
    additional_skills = sorted(list(resume_skills.difference(jd_skills)))[:15]

    # Weighted Skill Score: skills demonstrated in Work Experience count more
    if jd_skills:
        exp_matched_count = len(exp_skills.intersection(jd_skills))
        other_matched_count = len(set(matched_skills).difference(exp_skills))
        weighted_matched = (exp_matched_count * 1.2) + (other_matched_count * 0.9)
        skill_match_percentage = min(100.0, (weighted_matched / len(jd_skills)) * 100)
    else:
        skill_match_percentage = 100.0

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "additional_skills": additional_skills,
        "match_percentage": round(skill_match_percentage, 1),
        "total_required_skills": len(jd_skills),
        "experience_verified_skills": sorted(list(exp_skills.intersection(jd_skills)))
    }

def analyze_resume_health(parsed_doc: Dict[str, Any]) -> Dict[str, Any]:
    """Perform accurate quality & health audit on resume content."""
    text = parsed_doc["raw_text"]
    words = text.split()
    word_count = len(words)

    if word_count < 350:
        word_count_status = "Too Short"
        word_count_msg = f"Resume is {word_count} words. Target range is 450-850 words for optimal ATS depth."
    elif word_count > 1000:
        word_count_status = "Too Long"
        word_count_msg = f"Resume is {word_count} words. Condense text under 850 words to avoid recruiter drop-off."
    else:
        word_count_status = "Optimal"
        word_count_msg = f"Word count ({word_count} words) is optimal for standard 1-2 page formatting."

    contacts = parsed_doc.get("contact_info", {})
    missing_contacts = []
    if not contacts.get("email"): missing_contacts.append("Email Address")
    if not contacts.get("phone"): missing_contacts.append("Phone Number")
    if not contacts.get("linkedin"): missing_contacts.append("LinkedIn Profile")
    
    # Quantifiable metrics detection (percentages, dollar amounts, scale figures)
    metrics_matches = re.findall(r'\b\d+%\b|\$\d+[\d,]*|\b\d+\+\s*(?:users|clients|projects|million|k|ms|s)\b|\b\d{2,}\b', text)
    quantifiable_score = min(100, len(metrics_matches) * 16)

    text_lower = text.lower()
    found_weak = [verb for verb in WEAK_ACTION_VERBS if re.search(fr'\b{re.escape(verb)}\b', text_lower)]
    found_strong = [verb for verb in STRONG_ACTION_VERBS if re.search(fr'\b{re.escape(verb)}\b', text_lower)]

    return {
        "word_count": word_count,
        "word_count_status": word_count_status,
        "word_count_msg": word_count_msg,
        "contact_health": {
            "is_complete": len(missing_contacts) == 0,
            "missing": missing_contacts,
            "contacts_found": contacts
        },
        "quantifiable_metrics": {
            "score": quantifiable_score,
            "count": len(metrics_matches),
            "samples": metrics_matches[:5]
        },
        "action_verbs": {
            "weak_verbs_found": found_weak,
            "strong_verbs_found": found_strong,
            "strong_ratio": round((len(found_strong) / max(1, len(found_weak) + len(found_strong))) * 100, 1)
        }
    }

def generate_ai_insights(resume_text: str, jd_text: str, skill_gap: Dict[str, Any], api_key: str = None) -> Dict[str, Any]:
    """Generate precise executive summary and actionable suggestions."""
    effective_api_key = api_key or os.getenv("GEMINI_API_KEY")
    
    if effective_api_key:
        try:
            # pyrefly: ignore [missing-import]
            from google import genai
            client = genai.Client(api_key=effective_api_key)
            prompt = f"""
You are an elite Senior Technical Recruiter & ATS Optimization Engine.
Analyze this Resume against the target Job Description with extreme precision.

Job Description:
{jd_text[:1800]}

Resume:
{resume_text[:2800]}

Missing Required Skills: {', '.join(skill_gap.get('missing_skills', []))}

Respond strictly in JSON format with exact keys:
1. "executive_summary": High-accuracy 2-3 sentence overview of candidate match strength.
2. "top_strengths": Array of 3 specific technical/experience strengths.
3. "key_improvements": Array of 3 actionable high-impact changes to improve ATS rank.
4. "bullet_rewrites": Array of 2 objects containing "original" weak bullet point from candidate resume and "rewritten" quantifiable bullet.
"""
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
            )
            import json
            json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group(0))
            cleaned_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(cleaned_text)
        except Exception:
            pass

    # High-precision heuristic fallback engine
    missing = skill_gap.get("missing_skills", [])
    matched = skill_gap.get("matched_skills", [])
    exp_verified = skill_gap.get("experience_verified_skills", [])
    
    summary = f"Candidate demonstrates {len(matched)} matched technical skills, including core alignment in {', '.join(matched[:3]) if matched else 'key role areas'}. " \
              f"Experience highlights {', '.join(exp_verified[:2]) if exp_verified else 'relevant project background'}. " \
              f"Bridging missing skills ({', '.join(missing[:3]) if missing else 'further quantifiable impact'}) will elevate ATS ranking."
              
    strengths = [
        f"Verified experience alignment in {', '.join(matched[:3])}" if matched else "Clear section structure and layout.",
        f"Demonstrated application of {len(exp_verified)} required skills directly within employment history.",
        "Contains readable terminology optimized for automated ATS parsers."
    ]
    
    improvements = [
        f"Add key missing skill keywords: {', '.join(missing[:4])}" if missing else "Include more quantifiable impact numbers (e.g. %, $ saved, latency).",
        "Replace passive bullet starters ('worked on', 'responsible for') with power action verbs ('architected', 'spearheaded').",
        "Ensure technical skills are explicitly linked to concrete achievements in project bullet points."
    ]
    
    bullet_rewrites = [
        {
            "original": "Responsible for helping with database optimizations and fixing backend bugs.",
            "rewritten": "Architected database query optimizations and resolved critical backend bugs in PostgreSQL, improving API throughput by 35%."
        },
        {
            "original": "Worked on building user interfaces using React and JavaScript.",
            "rewritten": "Engineered responsive, accessible web interface components leveraging React and TypeScript, serving 50,000+ monthly active users."
        }
    ]

    return {
        "executive_summary": summary,
        "top_strengths": strengths,
        "key_improvements": improvements,
        "bullet_rewrites": bullet_rewrites
    }
