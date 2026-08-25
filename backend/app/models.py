from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from passlib.context import CryptContext

Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_api_key(api_key: str) -> str:
    return pwd_context.hash(api_key)

def verify_api_key(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    role = Column(String(50), default="citizen")  # admin, verifier, citizen, govt_official
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class APIKey(Base):
    __tablename__ = "api_keys"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    key_hash = Column(String(255), nullable=False)
    prefix = Column(String(20), nullable=False, index=True)
    last_used_at = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(512), nullable=False)
    file_type = Column(String(50))  # image, pdf, map
    language = Column(String(50))
    status = Column(String(50), default="pending")  # pending, processing, completed, failed
    uploaded_by = Column(Integer, ForeignKey("users.id"))
    processed_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ExtractedField(Base):
    __tablename__ = "extracted_fields"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    field_name = Column(String(100), nullable=False)
    field_value = Column(Text)
    confidence_score = Column(Float, default=0.0)
    is_verified = Column(Boolean, default=False)
    verified_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    action = Column(String(100), nullable=False)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(Integer, nullable=False)
    old_value = Column(Text, nullable=True)
    new_value = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
