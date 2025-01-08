from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from hashlib import sha256
from http import HTTPStatus
import logging

logging_mode = "Y"

if logging_mode == "Y":
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users_db: Dict[str, str] = {}

class SignUpRequest(BaseModel):
    id: str
    password: str

class CustomExceptionResponse(Exception):
    def __init__(self, status_code: int, content: str):
        self.status_code = status_code
        self.content = content

@app.middleware("http")
async def log_request(request: Request, call_next):
    if logging_mode == "Y":
        logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    
    if logging_mode == "Y":
        logger.info(f"Response: {response.status_code}")
    return response

@app.options("/{rest_of_path:path}")
async def preflight_handler():
    return {"message": "Preflight check passed"}

@app.exception_handler(CustomExceptionResponse)
def custom_exception_handler(request, exc: CustomExceptionResponse):
    return JSONResponse(
        content={"status_code": exc.status_code, "content": exc.content}
    )

@app.post('/api/signup')
def signup_request(data: SignUpRequest):
    id = data.id
    password = data.password

    if id in users_db:
        raise CustomExceptionResponse(
            status_code=HTTPStatus.CONFLICT.value,
            content="이미 사용 중인 ID입니다."
        )
    
    hashed_password = sha256(password.encode()).hexdigest()

    users_db[id] = hashed_password
    return {
        "status_code": HTTPStatus.CREATED.value,
        "content": "회원가입 성공"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000)
