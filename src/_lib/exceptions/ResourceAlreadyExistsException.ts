import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceAlreadyExistsException extends HttpException {

    public constructor(message: string | object) {

        super(message, HttpStatus.CONFLICT);

    }

}
