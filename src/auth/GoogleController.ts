import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleService } from './GoogleService';
import { AuthGuard } from '@nestjs/passport';
 
@Controller('auth')
export class GoogleController {
  constructor(private readonly appService: GoogleService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req)
  }
}