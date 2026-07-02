# 🚀 AI Recruiter POC

🌍 **Live Demo:** [https://Nagaraj1399.github.io/AI-Recruiter-POC/](https://Nagaraj1399.github.io/AI-Recruiter-POC/)

A lightning-fast, intelligent candidate ranking dashboard built with React and Vite. This Proof of Concept goes beyond simple keyword filtering to provide deep semantic matching, career pedigree scoring, and behavioral signal integration.

## ✨ Key Features

- **🧠 Deep Job Understanding:** Dynamically parses Job Descriptions to extract seniority level, experience thresholds, and core technical requirements.
- **⚖️ Dynamic Ranking Engine:** Adjust the weights for Semantic Relevance, Career Pedigree, and Behavioral Signals in real-time to instantly re-rank the candidate pool.
- **🔍 Side-by-Side Comparison:** Select two candidates from the shortlist to view a head-to-head breakdown of their scores, skill gaps, and AI verdicts.
- **📊 Diagnostic Insights:** Deep dive into each candidate with visual skill clouds (Direct Match, Adjacent Fit, Skill Gap), career timelines, and AI-generated, customized interview questions based on their specific skill gaps.
- **💎 Premium UI/UX:** Built with a modern, dark-mode glassmorphism aesthetic featuring smooth transitions and micro-animations.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (Glassmorphism design system)
- **Icons:** Lucide React

## 🚀 Getting Started (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nagaraj1399/AI-Recruiter-POC.git
   cd AI-Recruiter-POC
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 📂 Project Structure

- `src/App.jsx`: Main dashboard layout and state management.
- `src/index.css`: Design system and component styling.
- `src/utils/rankingEngine.js`: Core logic for semantic matching and candidate scoring.
- `src/data/`: Mock datasets for job descriptions and candidate profiles.

## 🤝 Contributing
This is a Proof of Concept. Feel free to fork the repository and experiment with integrating actual LLM backends or expanding the semantic matching rules!
