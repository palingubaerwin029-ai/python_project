import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# pyrefly: ignore [missing-import]
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
# pyrefly: ignore [missing-import]
from fastapi.staticfiles import StaticFiles
# pyrefly: ignore [missing-import]
from fastapi.responses import HTMLResponse, JSONResponse
from typing import Optional

# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware

from parsers import parse_resume_document
from analyzer import (
    calculate_ngram_tfidf_similarity,
    analyze_skill_gaps,
    analyze_resume_health,
    generate_ai_insights
)

app = FastAPI(
    title="AI-Powered Resume Analyzer & ATS Optimizer",
    description="Analyze resumes against job descriptions with ATS scoring, skill gap detection, health metrics, and AI recommendations.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data for quick testing
SAMPLE_RESUME = """
Alex Morgan
Email: alex.morgan@email.com | Phone: (555) 234-5678
LinkedIn: linkedin.com/in/alexmorgan | GitHub: github.com/alexmorgan

SUMMARY
Results-driven Full Stack Software Engineer with 4+ years of experience designing and implementing scalable web applications, microservices, and RESTful APIs.

SKILLS
- Languages: Python, JavaScript, TypeScript, SQL, HTML/CSS
- Frameworks: FastAPI, Django, React.js, Node.js, Express
- Cloud & Tools: AWS (S3, EC2), Docker, Git, PostgreSQL, Redis, Linux
- Methodologies: Agile, CI/CD, Test-Driven Development

EXPERIENCE
Software Engineer | TechScale Solutions (2022 - Present)
- Architected and deployed microservices using FastAPI and Docker, improving system API performance by 40%.
- Engineered responsive frontend web applications with React and Tailwind CSS for 100,000+ monthly active users.
- Optimized database queries in PostgreSQL and implemented Redis caching, reducing page load times by 2.5 seconds.
- Responsible for helping with bug fixes and code reviews.

Junior Developer | InnovateX Labs (2020 - 2022)
- Built internal analytics dashboards with Python, Pandas, and Flask.
- Assisted in migrating legacy database systems to AWS Cloud.
- Wrote unit and integration tests achieving 85% code coverage.

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2016 - 2020)
"""

SAMPLE_JD = """
Senior Full Stack Engineer (Python & React)

We are seeking an experienced Senior Full Stack Engineer to join our core engineering team.

Key Responsibilities:
- Design, build, and maintain high-performance web applications and REST APIs using Python (FastAPI/Django) and React/TypeScript.
- Deploy microservices to cloud environments using AWS, Docker, and Kubernetes (k8s).
- Implement robust CI/CD pipelines and automated testing.
- Collaborate with product managers and cross-functional teams in an Agile environment.

Requirements & Qualifications:
- 3+ years experience with Python, JavaScript/TypeScript, React.js, and FastAPI or Django.
- Hands-on experience with Cloud infrastructure (AWS/GCP), Docker, and Kubernetes.
- Experience with Relational Databases (PostgreSQL) and Caching (Redis).
- Strong understanding of GraphQL, RESTful APIs, and microservice architecture.
- Leadership, problem solving, and excellent communication skills.
"""

@app.post("/api/analyze")
async def analyze_resume(
    file: Optional[UploadFile] = File(None),
    resume_text: Optional[str] = Form(None),
    job_description: str = Form(...),
    api_key: Optional[str] = Form(None)
):
    try:
        # Extract text from uploaded file or use submitted text
        if file and file.filename:
            content = await file.read()
            parsed_doc = parse_resume_document(file.filename, content)
        elif resume_text and resume_text.strip():
            parsed_doc = parse_resume_document("pasted_resume.txt", resume_text.encode('utf-8'))
        else:
            raise HTTPException(status_code=400, detail="Please upload a resume file or paste resume text.")

        if not parsed_doc["raw_text"]:
            raise HTTPException(status_code=400, detail="Could not extract text from the provided resume.")

        jd_clean = job_description.strip()
        if not jd_clean:
            raise HTTPException(status_code=400, detail="Job Description cannot be empty.")

        # Perform analysis calculations
        experience_text = parsed_doc.get("sections", {}).get("experience", "")
        ats_score = calculate_ngram_tfidf_similarity(parsed_doc["raw_text"], jd_clean)
        skill_gap = analyze_skill_gaps(parsed_doc["raw_text"], jd_clean, experience_text)
        health_metrics = analyze_resume_health(parsed_doc)
        ai_insights = generate_ai_insights(parsed_doc["raw_text"], jd_clean, skill_gap, api_key)

        # Composite overall ATS score (combining TF-IDF similarity, skill match, and health checks)
        skill_score = skill_gap["match_percentage"]
        health_score = (
            (100 if health_metrics["word_count_status"] == "Optimal" else 60) * 0.3 +
            (100 if health_metrics["contact_health"]["is_complete"] else 70) * 0.3 +
            health_metrics["quantifiable_metrics"]["score"] * 0.4
        )
        
        overall_ats_score = round((ats_score * 0.45) + (skill_score * 0.40) + (health_score * 0.15), 1)
        overall_ats_score = min(100.0, max(10.0, overall_ats_score))

        return JSONResponse(content={
            "status": "success",
            "ats_score": overall_ats_score,
            "similarity_breakdown": {
                "tf_idf_similarity": ats_score,
                "skill_match_percentage": skill_score,
                "health_score": round(health_score, 1)
            },
            "document_info": {
                "filename": parsed_doc["filename"],
                "word_count": parsed_doc["word_count"],
                "character_count": parsed_doc["character_count"],
                "contact_info": parsed_doc["contact_info"]
            },
            "skill_analysis": skill_gap,
            "health_metrics": health_metrics,
            "ai_insights": ai_insights
        })

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during analysis: {str(e)}")

@app.get("/api/sample")
async def get_sample_data():
    """Return sample resume and job description for 1-click preview testing."""
    return {
        "resume": SAMPLE_RESUME.strip(),
        "job_description": SAMPLE_JD.strip()
    }

# Serve static frontend files
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/")
async def root():
    index_file = os.path.join(static_dir, "index.html")
    if os.path.exists(index_file):
        with open(index_file, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    return HTMLResponse(content="<h1>AI Resume Analyzer Backend API is running!</h1>")

if __name__ == "__main__":
    # pyrefly: ignore [missing-import]
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
