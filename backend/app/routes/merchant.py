from fastapi import APIRouter, HTTPException
from app.models.merchant import MerchantCreate, Merchant
from app.services.merchant_service import create_merchant, get_merchants

router = APIRouter(prefix="/merchants", tags=["Merchants"])



@router.post("/")
def create(payload: MerchantCreate) -> Merchant:
    try:
        merchant = create_merchant(payload.model_dump())
        return merchant

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/")
def list_merchants():
    try:
        return get_merchants()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))