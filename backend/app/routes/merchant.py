from fastapi import APIRouter, HTTPException, status
from typing import List
import logging

from app.models.merchant import MerchantCreate, Merchant
from app.services.merchant_service import create_merchant, get_merchants

router = APIRouter(prefix="/merchants", tags=["Merchants"])

logger = logging.getLogger(__name__)


@router.post("/", response_model=Merchant, status_code=status.HTTP_201_CREATED)
def create(payload: MerchantCreate):
    try:
        merchant  = create_merchant(payload)
        return merchant

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        logger.error(f"Error creating merchant: {str(e)}")

        raise HTTPException(
            status_code=500,
            detail="Something went wrong while creating merchant"
        )


@router.get("/", response_model=List[Merchant])
def list_merchants():
    try:
        return get_merchants()

    except Exception as e:
        logger.error(f"Error fetching merchants: {str(e)}")

        raise HTTPException(
            status_code=500,
            detail="Failed to fetch merchants"
        )