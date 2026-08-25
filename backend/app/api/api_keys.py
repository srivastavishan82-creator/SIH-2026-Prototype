from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import APIKeyCreate, APIKeyWithPlain
from app.models import APIKey as APIKeyModel, hash_api_key
from app.auth import get_current_user
import secrets

router = APIRouter()

def generate_api_key() -> tuple[str, str]:
    raw = "lrds_" + secrets.token_urlsafe(32)
    return raw, raw[:8]

@router.post("/", response_model=APIKeyWithPlain, status_code=status.HTTP_201_CREATED)
def create_api_key(
    payload: APIKeyCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    raw, prefix = generate_api_key()
    key = APIKeyModel(
        user_id=current_user.id,
        name=payload.name,
        key_hash=hash_api_key(raw),
        prefix=prefix,
    )
    db.add(key)
    db.commit()
    db.refresh(key)
    return APIKeyWithPlain(id=key.id, user_id=key.user_id, name=key.name, prefix=key.prefix, api_key=raw, last_used_at=key.last_used_at, is_active=key.is_active, created_at=key.created_at)

@router.get("/")
def list_api_keys(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    keys = db.query(APIKeyModel).filter(APIKeyModel.user_id == current_user.id).all()
    return [{"id": k.id, "name": k.name, "prefix": k.prefix, "last_used_at": k.last_used_at, "is_active": k.is_active, "created_at": k.created_at} for k in keys]

@router.delete("/{key_id}")
def revoke_api_key(
    key_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    key = db.query(APIKeyModel).filter(APIKeyModel.id == key_id, APIKeyModel.user_id == current_user.id).first()
    if not key:
        raise HTTPException(status_code=404, detail="API key not found")
    key.is_active = False
    db.add(key)
    db.commit()
    return {"status": "revoked"}
