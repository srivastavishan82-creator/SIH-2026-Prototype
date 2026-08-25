from fastapi import APIRouter

router = APIRouter()

@router.post("/verify/{field_id}")
async def verify_field(field_id: int):
    return {"message": "verify field", "field_id": field_id}

@router.get("/pending")
async def pending_verifications():
    return {"message": "pending verifications"}
