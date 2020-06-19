import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GoogleService } from './GoogleService';
import { AuthGuard } from '@nestjs/passport';
 
@Controller('auth')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {

    return this.googleService.googleLogin(req.user);

  }
}