from nest.core import Controller, Post
from .signup_service import SignupService, CustomExceptionResponse
from .signup_model import Signup
from http import HTTPStatus

    
@Controller("/api", tag="signup")
class SignupController:
    def __init__(self, signup_service: SignupService):
        self.signup_service = signup_service
        
    @Post("/signup")    
    def signup_request(self, signup: Signup):
        try:
            result = self.signup_service.add_signup(signup)
            return {
                "status_code": HTTPStatus.CREATED.value,
                "content": result
            }
        except CustomExceptionResponse as e:
            return {
                "status_code": e.status_code,
                "content": e.message
            }