from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.merchant import router as merchant_router

app = FastAPI(title="Merchant Onboarding API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(merchant_router)


@app.get("/")
def root():
    return {"message": "API is running"}