from datetime import datetime

from fastapi import Depends, Header, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import APIKey, verify_api_key

async def get_api_key(
    x_api_key: str = Header(..., alias="X-API-Key"),
    db: Session = Depends(get_db),
) -> APIKey:
    prefix = x_api_key[:8]
    key = db.query(APIKey).filter(APIKey.prefix == prefix, APIKey.is_active == True).first()
    if not key or not verify_api_key(x_api_key, key.key_hash):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid API key")
    key.last_used_at = datetime.utcnow()
    db.add(key)
    db.commit()
    db.refresh(key)
    return key
