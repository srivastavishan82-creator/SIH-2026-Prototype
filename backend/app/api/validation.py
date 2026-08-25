from fastapi import APIRouter

router = APIRouter()

@router.post("/validate")
async def validate_fields():
    return {"message": "validate fields"}

@router.post("/confidence")
async def compute_confidence():
    return {"message": "compute confidence"}
