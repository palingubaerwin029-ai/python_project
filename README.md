# 🚀 AI Projects Portfolio

**Live Application:** [Static Site (GitHub Pages)](https://palingubaerwin029-ai.github.io/python_project/) | **Deployment Blueprint:** `render.yaml`

---

## 1️⃣ AI-Powered ATS Resume Analyzer
**Tech Stack:** Python, FastAPI, scikit-learn, Gemini 2.5 Flash

### ⚡ Project Highlights (Resume Format)
- **Engineered a Composite ATS Match Engine** using Python and `scikit-learn`, computing scores via TF-IDF similarity (45%), weighted skill taxonomy (40%), and resume health (15%).
- **Integrated Gemini 2.5 Flash LLM** to analyze skill gaps across cloud/ML tech stacks, provide executive summaries, and dynamically re-engineer resume bullet points.
- **Deployed a robust REST API** via Render, enabling fast and scalable document processing and AI insights generation.

### 🛠️ Quick Start (Backend)
```bash
pip install -r requirements.txt
python main.py
```
*API Docs available at `http://127.0.0.1:8000/docs`*

---

## 2️⃣ AI Pulse Productivity Dashboard
**Tech Stack:** React, Vite, Tailwind CSS, Recharts, Web Audio API

### ⚡ Project Highlights (Resume Format)
- **Built an interactive React/Vite dashboard** featuring real-time KPI analytics (Recharts) for tracking deep work, task velocity, and AI time saved.
- **Developed a smart goal decomposition engine** (AI Task Optimizer) to break down complex objectives into manageable subtasks.
- **Engineered a Focus Soundscape Engine** leveraging the Web Audio API to provide customizable ambient audio for enhanced productivity.

### 🛠️ Quick Start (Frontend)
```bash
cd ai_dashboard
npm install
npm run dev
```
*Dashboard available at `http://localhost:5173/`*

---

## 🔑 Environment Configuration

Create a `.env` file in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```
