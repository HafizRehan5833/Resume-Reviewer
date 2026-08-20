# AI Resume Reviewer

AI Resume Reviewer is a full-stack application that analyzes PDF and DOCX resumes and returns actionable feedback. It calculates an ATS score and skill-match score, identifies strengths, weaknesses, missing keywords, and suggestions, and estimates the candidate's experience level.

## Project Structure

```text
resume-reviewer/
├── backend/                 # FastAPI API and resume analysis services
│   ├── main.py              # API application and endpoints
│   ├── models/schemas.py    # Analysis response schema
│   └── services/            # Resume parsing and AI review logic
└── frontend/                # Next.js user interface
    ├── app/page.tsx         # Upload and results workflow
    └── components/resume/   # Upload, dashboard, and feedback components
```

## How It Works

1. Select or drag a PDF or DOCX resume into the frontend.
2. The frontend sends the file as multipart form data to `POST /analyze-resume`.
3. The FastAPI backend extracts text with PyMuPDF or `python-docx`.
4. The extracted text is reviewed by a Groq-hosted language model through LangChain.
5. The API returns structured analysis data, which the frontend displays as scores and feedback.

## Requirements

- Python 3.13 or newer
- Node.js with npm
- A Groq API key

## Backend Setup

From the repository root:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

**Windows PowerShell**

```powershell
.\.venv\Scripts\Activate.ps1
```

**macOS/Linux**

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `backend/.env` with:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant
```

`GROQ_MODEL` is optional. If it is omitted, the backend uses `llama-3.1-8b-instant`.

Start the API locally:

```bash
uvicorn main:app --reload --port 8000
```

The local API is available at `http://localhost:8000`. FastAPI's interactive documentation is available at `http://localhost:8000/docs`.

## Frontend Setup

In a second terminal, from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

The deployed frontend is available at [https://resumereviewerfrontend-five.vercel.app/](https://resumereviewerfrontend-five.vercel.app/).

The current frontend sends analysis requests to the deployed backend at:

```text
https://resumereviewerbackend.vercel.app/analyze-resume
```

When developing against the local backend, update the endpoint in `frontend/app/page.tsx` to `http://localhost:8000/analyze-resume`.

## API Reference

### `GET /`

Returns a basic welcome message.

### `POST /analyze-resume`

Accepts a resume as a multipart form upload:

| Field | Type | Required | Supported formats |
| --- | --- | --- | --- |
| `file` | File | Yes | `.pdf`, `.docx` |

Successful responses contain:

```json
{
  "ats_score": 78,
  "experience_level": "Mid-level",
  "strengths": ["Clear technical experience"],
  "weaknesses": ["Some bullet points lack measurable outcomes"],
  "missing_keywords": ["Docker"],
  "suggestions": ["Add metrics to project descriptions"],
  "skill_match": 72
}
```

Invalid file types or files with no extractable text return a `400` response. Unexpected processing or model errors return a `500` response.

## Useful Commands

### Backend

```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm run dev       # Start development server
npm run lint      # Run ESLint
npm run build     # Create a production build
npm start         # Serve the production build
```

## Deployment

Both applications include Vercel configuration:

- Live frontend: [https://resumereviewerfrontend-five.vercel.app/](https://resumereviewerfrontend-five.vercel.app/)
- Deploy `frontend/` as a Next.js project.
- Deploy `backend/` as a Python project using `backend/vercel.json`.
- Configure `GROQ_API_KEY` in the backend deployment environment.
- Add the deployed frontend origin to the CORS allowlist in `backend/main.py` if it is not already present.

## Notes

- Resume text is sent to the configured Groq model for analysis.
- The backend requires `GROQ_API_KEY` at runtime.
- The frontend currently uses a fixed backend URL in `frontend/app/page.tsx`; use the local URL above when running both services locally.
