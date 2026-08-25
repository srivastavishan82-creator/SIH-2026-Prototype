from fastapi import APIRouter

router = APIRouter()

@router.post("/upload")
async def upload_document():
    return {"message": "upload endpoint"}

@router.get("/")
async def list_documents():
    return {"message": "list documents"}

@router.get("/{document_id}")
async def get_document(document_id: int):
    return {"message": "get document", "document_id": document_id}

@router.post("/{document_id}/process")
async def process_document(document_id: int):
    return {"message": "process document", "document_id": document_id}
