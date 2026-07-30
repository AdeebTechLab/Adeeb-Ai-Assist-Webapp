from pydantic import BaseModel


class CompanyQuestion(BaseModel):
    question: str


class CompanyAnswer(BaseModel):
    answer: str