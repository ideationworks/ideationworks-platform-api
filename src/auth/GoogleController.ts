import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { GoogleService } from './GoogleService';
import { AuthGuard } from '@nestjs/passport';
 
@Controller('auth')
export class GoogleController {
  constructor(private readonly appService: GoogleService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    return this.appService.googleLogin(req.user)
  }
}