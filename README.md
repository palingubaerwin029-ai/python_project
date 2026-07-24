# AI-Powered Resume Analyzer & ATS Optimizer 🚀

An intelligent, full-stack ATS (Applicant Tracking System) Optimization & Resume Analysis platform built with **FastAPI**, **scikit-learn**, and **Google Gemini AI**.

It evaluates resumes against job descriptions to provide composite match scoring, skill gap detection, health audits, and AI-driven bullet point re-engineering.

---

## ✨ Features

- **📊 Composite ATS Scoring Engine**: Combines N-gram TF-IDF cosine similarity ($45\%$), section-weighted skill taxonomy matching ($40\%$), and resume health metrics ($15\%$).
- **🎯 Skill Gap Detection**:
  - Automatically extracts languages, frameworks, cloud tools, databases, AI/ML skills, and methodologies.
  - Recognizes synonym aliases (e.g., `JS` $\rightarrow$ `JavaScript`, `K8s` $\rightarrow$ `Kubernetes`, `CPP` $\rightarrow$ `C++`).
  - Prioritizes skills verified directly within work experience sections ($1.2\times$ weighting).
- **🏥 Resume Health Audit**:
  - **Word Count Depth Check**: Flags resumes that are too short ($<350$ words) or too long ($>1000$ words).
  - **Contact Details Completeness**: Validates presence of email, phone, LinkedIn, and GitHub profile links.
  - **Quantifiable Metrics Density**: Detects measurable data points (%, $, user scale, latency stats).
  - **Action Verb Intensity**: Computes strong vs. weak verb ratios (`architected`, `engineered`, `spearheaded` vs. `helped`, `worked on`).
- **🤖 Gemini AI Insights & Bullet Re-Engineering**:
  - Generates executive match summaries, candidate strengths, and high-impact improvement recommendations.
  - Transforms weak passive resume bullet points into quantifiable, high-impact achievements.
  - Includes a fallback heuristic analyzer when no API key is provided.
- **📄 Multi-Format Parser**: Supports `.pdf`, `.docx`, `.doc`, and plain text inputs.
- **🎨 Dynamic Web Dashboard**: Modern responsive UI with drag-and-drop file upload, interactive score rings, metric progress bars, tabbed results dashboard, and 1-click sample data preview.

---

## 🛠️ Technology Stack

- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic, CORS Middleware
- **NLP & Data Science**: `scikit-learn` (TfidfVectorizer), `google-genai` (Gemini 2.5 Flash), `pypdf`, `python-docx`
- **Frontend**: Vanilla HTML5, CSS3 (Modern Glassmorphism & Vibrant Dark Theme), Vanilla JavaScript, FontAwesome Icons

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure Python 3.9+ is installed on your system.

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/palingubaerwin029-ai/python_project.git
cd python_project
pip install -r requirements.txt
```

### 3. Running the Backend Server

Start the FastAPI application:

```bash
python main.py
```

The application will be accessible at:
- **Web Interface**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive API Documentation**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🧪 Running Unit Tests

Execute the test suite to verify core parsing, skill extraction, health metrics, and scoring calculations:

```bash
python test_analyzer.py
```

---

## 📡 API Reference

### `POST /api/analyze`
Analyze a resume against a target job description.

**Form Data Parameters:**
- `file` *(Optional, UploadFile)*: Resume file (`.pdf`, `.docx`, `.doc`, `.txt`).
- `resume_text` *(Optional, string)*: Raw text paste of resume.
- `job_description` *(Required, string)*: Target job description text.
- `api_key` *(Optional, string)*: Optional Gemini API Key.

**Sample Response:**
```json
{
  "status": "success",
  "ats_score": 85.4,
  "similarity_breakdown": {
    "tf_idf_similarity": 78.2,
    "skill_match_percentage": 91.0,
    "health_score": 92.0
  },
  "skill_analysis": {
    "matched_skills": ["python", "fastapi", "docker", "postgresql", "react"],
    "missing_skills": ["kubernetes"],
    "experience_verified_skills": ["python", "fastapi", "docker"]
  },
  "health_metrics": {
    "word_count_status": "Optimal",
    "contact_health": { "is_complete": true, "missing": [] },
    "quantifiable_metrics": { "score": 80, "count": 5 },
    "action_verbs": { "strong_ratio": 83.3 }
  }
}
```

### `GET /api/sample`
Returns sample resume and job description text for quick 1-click preview testing.

---

## 🔑 Environment Variables (Optional)

To enable Gemini AI features system-wide without passing an API key in requests, set:

```bash
export GEMINI_API_KEY="your-gemini-api-key-here"
```

---

## 📝 License

This project is licensed under the MIT License.
