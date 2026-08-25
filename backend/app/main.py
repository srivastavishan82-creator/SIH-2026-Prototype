from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, documents, ocr, validation, verification, analytics, integrations, api_keys
from app.api_key_auth import get_api_key

app = FastAPI(
    title="Land Record Digitization API",
    description="SIH 2026 - AI-powered land record digitization and validation system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "land-record-digitization"}

@app.get("/api/v1/protected-doc")
def protected_doc_example(api_key=Depends(get_api_key)):
    return {"message": "OK", "api_key_prefix": api_key.prefix}

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(documents.router, prefix="/api/v1/documents", tags=["documents"])
app.include_router(ocr.router, prefix="/api/v1/ocr", tags=["ocr"])
app.include_router(validation.router, prefix="/api/v1/validation", tags=["validation"])
app.include_router(verification.router, prefix="/api/v1/verification", tags=["verification"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["analytics"])
app.include_router(integrations.router, prefix="/api/v1/integrations", tags=["integrations"])
app.include_router(api_keys.router, prefix="/api/v1/api-keys", tags=["api-keys"])
