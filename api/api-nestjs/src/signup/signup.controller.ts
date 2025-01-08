import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../response/success-response';

@Controller('api/signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  @ApiOperation({ summary: '회원가입 요청' })
  signup(@Body() createSignupDto: CreateSignupDto): SuccessResponse {
    return this.signupService.signup(createSignupDto);
  }

  @Get()
  findAll() {
    return this.signupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignupDto: UpdateSignupDto) {
    return this.signupService.update(+id, updateSignupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signupService.remove(+id);
  }
}
