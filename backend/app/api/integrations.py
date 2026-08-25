from fastapi import APIRouter

router = APIRouter()

@router.post("/lrms")
async def sync_lrms():
    return {"message": "lrms sync"}

@router.get("/gis/parcel/{survey_no}")
async def get_gis_parcel(survey_no: str):
    return {"message": "gis parcel", "survey_no": survey_no}
