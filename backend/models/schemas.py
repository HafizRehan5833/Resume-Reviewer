from pydantic import BaseModel
from typing import List

class ResumeAnalysisResponse(BaseModel):
    ats_score: int
    experience_level: str
    strengths: List[str]
    weaknesses: List[str]
    missing_keywords: List[str]
    suggestions: List[str]
    skill_match: int
