from pydantic import BaseModel, EmailStr, field_validator


class MerchantCreate(BaseModel):
    business_name: str
    business_type: str
    mcc_code: str
    full_name: str
    email: EmailStr
    phone: str

    @field_validator("mcc_code")
    def validate_mcc(cls, value):
        if not value.isdigit() or len(value) != 4:
            raise ValueError("MCC must be a 4-digit number")
        return value


class Merchant(MerchantCreate):
    id: str