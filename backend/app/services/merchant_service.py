from app.db.supabase_client import supabase


def create_merchant(data: dict):

    if len(data.get("mcc_code", "")) != 4:
        raise ValueError("MCC must be 4 digits")

    if not data.get("email"):
        raise ValueError("Email is required")


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
        raise Exception(response.error.message)

    if not response.data:
        raise Exception("Failed to insert merchant")

    return response.data[0]


def get_merchants():
    response = supabase.table("merchants").select("*").execute()

    if getattr(response, "error", None):
        raise Exception(response.error.message)

    return response.data