from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: str
    full_name: Optional[str] = None
    role: str = "citizen"

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class APIKeyBase(BaseModel):
    name: str

class APIKeyCreate(APIKeyBase):
    pass

class APIKey(APIKeyBase):
    id: int
    user_id: int
    prefix: str
    last_used_at: Optional[datetime] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class APIKeyWithPlain(APIKey):
    api_key: str

class DocumentBase(BaseModel):
    filename: str
    file_type: str
    language: Optional[str] = None

class DocumentCreate(DocumentBase):
    file_path: str
    uploaded_by: int

class Document(DocumentBase):
    id: int
    status: str
    uploaded_by: int
    processed_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ExtractedFieldBase(BaseModel):
    field_name: str
    field_value: Optional[str] = None
    confidence_score: float = 0.0
    is_verified: bool = False

class ExtractedFieldCreate(ExtractedFieldBase):
    document_id: int

class ExtractedField(ExtractedFieldBase):
    id: int
    document_id: int
    verified_by: Optional[int] = None
    verified_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True

class AuditLogBase(BaseModel):
    user_id: int
    action: str
    entity_type: str
    entity_id: int
    old_value: Optional[str] = None
    new_value: Optional[str] = None

class AuditLogCreate(AuditLogBase):
    pass

class AuditLog(AuditLogBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
