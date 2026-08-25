"""PaddleOCR wrapper for land record digitization."""

import os
import tempfile
from typing import Optional
from paddleocr import PaddleOCR

ocr_engine: Optional[PaddleOCR] = None

def get_ocr_engine(lang: str = "en") -> PaddleOCR:
    global ocr_engine
    if ocr_engine is None:
        ocr_engine = PaddleOCR(use_angle_cls=True, lang=lang, show_log=False)
    return ocr_engine

def ocr_image(image_path: str, lang: str = "en") -> dict:
    engine = get_ocr_engine(lang)
    result = engine.ocr(image_path, cls=True)
    texts = []
    if result and result[0]:
        for line in result[0]:
            texts.append({
                "text": line[1][0],
                "confidence": line[1][1],
                "bbox": line[0],
            })
    return {"texts": texts, "raw": result}
