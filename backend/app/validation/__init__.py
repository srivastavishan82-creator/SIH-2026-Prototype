"""Rule-based validation for extracted land record fields."""

from typing import Any

def validate_field(field_name: str, value: Any) -> dict:
    result = {"is_valid": True, "errors": []}
    if value is None:
        result["is_valid"] = False
        result["errors"].append("Value is missing")
        return result
    if field_name in {"plot_area"}:
        try:
            float(str(value).replace(",", ""))
        except ValueError:
            result["is_valid"] = False
            result["errors"].append("Area must be numeric")
    return result

def compute_confidence(field_name: str, ocr_conf: float) -> float:
    return min(1.0, max(0.0, ocr_conf))
