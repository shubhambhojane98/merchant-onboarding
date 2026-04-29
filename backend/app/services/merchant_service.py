from app.db.supabase_client import supabase
from app.models.merchant import MerchantCreate, Merchant
import logging

logger = logging.getLogger(__name__)


def create_merchant(payload: MerchantCreate) -> Merchant:
    data = payload.model_dump()

    try:
        existing = (
            supabase.table("merchants")
            .select("id")
            .eq("email", data["email"])
            .execute()
        )

        if existing.data:
            raise ValueError("Merchant with this email already exists")

        response = supabase.table("merchants").insert(data).execute()

        if getattr(response, "error", None):
            logger.error(f"Supabase insert error: {response.error.message}")
            raise Exception("Database insert failed")

        if not response.data:
            raise Exception("Insert returned empty response")

        return Merchant(**response.data[0])

    except ValueError:
        # business rule error → pass upward
        raise

    except Exception as e:
        logger.error(f"Error in create_merchant: {str(e)}")
        raise


def get_merchants() -> list[Merchant]:
    try:
        response = supabase.table("merchants").select("*").execute()

        if getattr(response, "error", None):
            logger.error(f"Supabase fetch error: {response.error.message}")
            raise Exception("Database fetch failed")

        return [Merchant(**item) for item in response.data]

    except Exception as e:
        logger.error(f"Error in get_merchants: {str(e)}")
        raise