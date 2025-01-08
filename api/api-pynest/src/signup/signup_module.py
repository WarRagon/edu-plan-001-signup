from nest.core import Module
from .signup_controller import SignupController
from .signup_service import SignupService


@Module(
    controllers=[SignupController],
    providers=[SignupService],
    imports=[]
)   
class SignupModule:
    pass

    