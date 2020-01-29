import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceForbiddenException extends HttpException {

    public constructor(message?: string) {

        super(message, HttpStatus.FORBIDDEN);

    }

}
