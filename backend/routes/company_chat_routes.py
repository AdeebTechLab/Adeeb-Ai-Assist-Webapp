from fastapi import APIRouter

from backend.schemas.company_chat_schema import (
    CompanyQuestion,
    CompanyAnswer,
)

from backend.services.company_chat_service import ask_company

router = APIRouter(
    prefix="/company",
    tags=["Company Chat"],
)


@router.post(
    "/ask",
    response_model=CompanyAnswer,
)
def company_chat(data: CompanyQuestion):

    result = ask_company(data.question)

    return CompanyAnswer(
        answer=result["answer"]
    )