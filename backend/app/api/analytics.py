from fastapi import APIRouter

router = APIRouter()

@router.get("/stats")
async def get_analytics():
    return {"message": "analytics endpoint"}

@router.get("/district-progress")
async def district_progress():
    return {"message": "district progress"}
