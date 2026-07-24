# AI Workspace — ATS Resume Analyzer & AI Productivity Dashboard 🚀

An all-in-one full-stack AI platform containing:
1. **AI-Powered Resume Analyzer & ATS Optimizer** (Python / FastAPI / scikit-learn / Gemini 2.5 Flash)
2. **AI Pulse — Next-Gen AI Productivity Dashboard** (React / Vite / Tailwind CSS v4 / Recharts / Web Audio API)

---

## 🌐 Live Online Deployments

- 📱 **Live Static Application (GitHub Pages)**: [https://palingubaerwin029-ai.github.io/python_project/](https://palingubaerwin029-ai.github.io/python_project/)
- ⚙️ **Full-Stack Blueprint Configuration**: [render.yaml](file:///c:/project/python_project/render.yaml) for 1-click cloud deployment on Render / Railway.

---

## ⚡ Project Overview

### 1. AI Resume Analyzer & ATS Engine (`main.py`)
- **Composite ATS Match Scoring**: $45\%$ TF-IDF similarity + $40\%$ weighted skill taxonomy match + $15\%$ health score.
- **Skill Gap Detection**: Detects languages, frameworks, cloud tools, databases, AI/ML skills, and methodologies with alias matching (e.g. `K8s` $\rightarrow$ `Kubernetes`, `C++`, `C#`, `CI/CD`).
- **Resume Health Audit**: Validates word count range, contact information completeness, quantifiable metrics density, and strong action verb ratio.
- **Gemini AI Recommendations**: Executive match summary, top strengths, actionable improvements, and AI bullet point re-engineering using `gemini-2.5-flash`.

### 2. AI Pulse Productivity Dashboard (`ai_dashboard/`)
- **Overview Analytics**: Real-time KPI metrics (AI Time Saved, Deep Work Score, Task Velocity, Fatigue Index) with interactive Recharts area/donut charts.
- **AI Task Optimizer**: Smart goal decomposition into structured subtasks with difficulty ratings and celebratory confetti animations.
- **Focus Soundscape Engine**: Pomodoro timer with SVG progress ring and browser Web Audio API synthesizers (*Cyberpunk Lofi*, *Midnight Rain*, *Binaural Gamma 40Hz*, *Deep Space Synth*).
- **AI Coach Feed**: Real-time cognitive velocity detection, fatigue prevention alerts, and code optimization recommendations.

---

## 📁 Repository Structure

```text
python_project/
├── .github/workflows/deploy.yml   # GitHub Actions CI/CD for GitHub Pages
├── ai_dashboard/                   # React + Vite + Tailwind CSS v4 Dashboard
│   ├── src/
│   │   ├── components/            # Overview, TaskOptimizer, FocusFlowState, Insights
│   │   ├── App.jsx
│   │   └── index.css              # Glassmorphism & design tokens
│   └── vite.config.js
├── analyzer.py                     # TF-IDF, Skill Gap, Health & Gemini AI Engine
├── parsers.py                      # Multi-format PDF, DOCX, TXT document parser
├── main.py                         # FastAPI REST API & static file server
├── test_analyzer.py                # Unit test suite
├── requirements.txt                # Python backend dependencies
└── render.yaml                     # Full-stack Cloud Deployment Blueprint
```

---

## 🛠️ Quick Start Guide

### Backend & Local API Setup

1. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run Python Server**:
   ```bash
   python main.py
   ```
   * **API Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   * **FastAPI Server**: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

3. **Run Unit Tests**:
   ```bash
   python test_analyzer.py
   ```

---

### React Dashboard Setup

1. **Navigate & Install**:
   ```bash
   cd ai_dashboard
   npm install
   ```

2. **Run Frontend Dev Server**:
   ```bash
   npm run dev
   ```
   * **Local Dev URL**: [http://localhost:5173/](http://localhost:5173/)

3. **Build Production Assets**:
   ```bash
   npm run build
   ```

---

## 🔑 Environment Configuration

Copy `.env.example` to `.env` in the root folder:

```bash
# Set your Gemini API Key to enable AI insights
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 📜 License

This project is licensed under the MIT License.
