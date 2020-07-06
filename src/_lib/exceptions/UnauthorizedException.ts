import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {

    public constructor(message: string) {

        super(message, HttpStatus.UNAUTHORIZED);

    }

}
