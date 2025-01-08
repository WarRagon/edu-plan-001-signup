# src/app_module.py
from nest.core import Module, PyNestFactory
from .app_controller import AppController
from .app_service import AppService
from .signup.signup_module import SignupModule
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
import logging

# 로깅 설정
logging_mode = "Y"
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# FastAPI 미들웨어 정의
async def log_requests_middleware(request: Request, call_next):
    if logging_mode == "Y":
        logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    if logging_mode == "Y":
        logger.info(f"Response: {response.status_code}")
    return response


@Module(
    imports=[SignupModule],
    controllers=[AppController],
    providers=[AppService],
)

class AppModule():
    pass

app = PyNestFactory.create(
    AppModule,
    description="This is my PyNest app",
    title="My App",
    version="1.0.0",
    debug=True,
)

http_server: FastAPI = app.get_server()

http_server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@http_server.middleware("http")
async def log_request(request: Request, call_next):
    if logging_mode == "Y":
        logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    
    if logging_mode == "Y":
        logger.info(f"Response: {response.status_code}")
    return response

@http_server.options("/{rest_of_path:path}")
async def preflight_handler():
    return {"message": "Preflight check passed"}