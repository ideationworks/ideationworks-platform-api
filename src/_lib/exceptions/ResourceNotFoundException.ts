import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {

    public constructor(message: string) {

        super(message, HttpStatus.NOT_FOUND);

    }

}
