import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import unittest
from parsers import parse_resume_document, extract_contact_info, extract_sections
from analyzer import (
    calculate_ngram_tfidf_similarity,
    analyze_skill_gaps,
    analyze_resume_health,
    generate_ai_insights
)

TEST_RESUME = """
Jane Doe
Email: jane.doe@example.com | Phone: 555-123-4567
LinkedIn: linkedin.com/in/janedoe | GitHub: github.com/janedoe

EXPERIENCE
Senior Software Engineer | CloudTech (2021 - Present)
- Engineered scalable microservices using Python, FastAPI, Docker, and PostgreSQL.
- Optimized API query performance by 45%, serving over 200,000 requests per day.
- Spearheaded CI/CD automation pipelines using GitHub Actions and Kubernetes.

SKILLS
Python, JavaScript, TypeScript, React, FastAPI, Docker, Kubernetes, PostgreSQL, Redis, AWS, Git
"""

TEST_JD = """
Software Engineer

Requirements:
- Strong proficiency in Python, FastAPI, Docker, and PostgreSQL.
- Experience with Kubernetes, React, and AWS Cloud infrastructure.
- Ability to optimize system performance and write automated tests.
"""

class TestResumeAnalyzer(unittest.TestCase):

    def test_contact_extraction(self):
        contacts = extract_contact_info(TEST_RESUME)
        self.assertEqual(contacts["email"], "jane.doe@example.com")
        self.assertIsNotNone(contacts["phone"])
        self.assertIsNotNone(contacts["linkedin"])
        self.assertIsNotNone(contacts["github"])

    def test_section_parsing(self):
        sections = extract_sections(TEST_RESUME)
        self.assertIn("experience", sections)
        self.assertIn("skills", sections)

    def test_similarity_score(self):
        score = calculate_ngram_tfidf_similarity(TEST_RESUME, TEST_JD)
        self.assertGreater(score, 30.0)
        self.assertLessEqual(score, 100.0)

    def test_skill_gaps(self):
        gaps = analyze_skill_gaps(TEST_RESUME, TEST_JD)
        self.assertIn("python", gaps["matched_skills"])
        self.assertIn("fastapi", gaps["matched_skills"])
        self.assertIn("docker", gaps["matched_skills"])

    def test_health_metrics(self):
        doc = parse_resume_document("test.txt", TEST_RESUME.encode('utf-8'))
        health = analyze_resume_health(doc)
        self.assertTrue(health["contact_health"]["is_complete"])
        self.assertGreater(health["quantifiable_metrics"]["count"], 0)

if __name__ == "__main__":
    unittest.main()
