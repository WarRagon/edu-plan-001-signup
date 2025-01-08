from .signup_model import Signup
from nest.core import Injectable
from hashlib import sha256
from typing import Dict
from http import HTTPStatus

class CustomExceptionResponse(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message
        super().__init__(message)

users_db: Dict[str, str] = {}

@Injectable
class SignupService:

    def __init__(self):
        self.database = []
        
    def get_signup(self):
        return self.database
    
    def add_signup(self, signup: Signup):
        id = signup.id
        password = signup.password
        if id in users_db:
            raise CustomExceptionResponse(
                status_code=HTTPStatus.CONFLICT.value,
                message="이미 사용 중인 ID입니다."
            )
            
        hashed_password = sha256(password.encode()).hexdigest()

        users_db[id] = hashed_password

        return "회원가입 성공"
