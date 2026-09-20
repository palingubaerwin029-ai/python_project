# AI Workspace — ATS Resume Analyzer & AI Productivity Dashboard 🚀

**Live Application:** [Static Site (GitHub Pages)](https://palingubaerwin029-ai.github.io/python_project/) | **Deployment Blueprint:** `render.yaml`
**Tech Stack:** Python, FastAPI, scikit-learn, Gemini 2.5 Flash, React, Vite, Tailwind CSS, Recharts

## ⚡ Project Highlights (Resume Format)

- **Developed a full-stack AI platform** integrating an ATS Resume Analyzer and a Next-Gen AI Productivity Dashboard, deployed via GitHub Pages and Render.
- **Engineered a Composite ATS Match Engine** using Python and `scikit-learn`, computing scores via TF-IDF similarity (45%), weighted skill taxonomy (40%), and resume health (15%).
- **Integrated Gemini 2.5 Flash LLM** to analyze skill gaps across cloud/ML tech stacks, provide executive summaries, and dynamically re-engineer resume bullet points.
- **Built an interactive React/Vite dashboard** featuring real-time KPI analytics (Recharts), smart goal decomposition, and a Focus Soundscape Engine using the Web Audio API.

---

## 🛠️ Quick Start

### Backend (Python/FastAPI)
```bash
pip install -r requirements.txt
python main.py
```
*API Docs available at `http://127.0.0.1:8000/docs`*

### Frontend (React/Vite)
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
