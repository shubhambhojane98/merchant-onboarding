from pydantic import BaseModel, EmailStr, field_validator
from typing import Literal
import re


class MerchantCreate(BaseModel):
    business_name: str
    business_type: Literal["sole_trader", "llc", "corporation"]
    mcc_code: str
    full_name: str
    email: EmailStr
    phone: str

    @field_validator("business_name")
    def validate_business_name(cls, value):
        value = value.strip()
        if len(value) < 2:
            raise ValueError("Business name must be at least 2 characters")
        return value

    @field_validator("full_name")
    def validate_full_name(cls, value):
        value = value.strip()
        if len(value) < 2:
            raise ValueError("Full name must be at least 2 characters")
        return value

    @field_validator("mcc_code")
    def validate_mcc(cls, value):
        value = value.strip()
        if not value.isdigit() or len(value) != 4:
            raise ValueError("MCC must be a 4-digit number")
        return value

    @field_validator("phone")
    def validate_phone(cls, value):
        pattern = r"^\+\d{8,15}$"
        if not re.match(pattern, value):
            raise ValueError("Phone must be in international format (e.g. +919876543210)")
        return value

    @field_validator("email")
    def normalize_email(cls, value):
        return value.strip().lower()


class Merchant(MerchantCreate):
    id: str