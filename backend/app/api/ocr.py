from fastapi import APIRouter

router = APIRouter()

@router.post("/ocr")
async def run_ocr():
    return {"message": "ocr endpoint"}

@router.post("/extract-fields")
async def extract_fields():
    return {"message": "extract fields"}
