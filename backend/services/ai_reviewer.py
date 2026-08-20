import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from models.schemas import ResumeAnalysisResponse

load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
groq_model = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant") # use a structured output compatible model

llm = ChatGroq(
    model=groq_model,
    groq_api_key=api_key,
    temperature=0.0,
)

# Use Langchain's with_structured_output for guaranteed JSON schema matching
structured_llm = llm.with_structured_output(ResumeAnalysisResponse)

resume_prompt = ChatPromptTemplate.from_template("""
You are a professional technical recruiter and resume reviewer. 
Analyze the following resume and evaluate it based on standard Applicant Tracking System (ATS) criteria.

Provide your evaluation matching the requested JSON structure exactly. 
Include realistic ATS score and skill match percentages.

Resume:  
{text}
""")

def review_resume(text: str) -> ResumeAnalysisResponse:
    prompt_value = resume_prompt.invoke({"text": text})
    return structured_llm.invoke(prompt_value)
