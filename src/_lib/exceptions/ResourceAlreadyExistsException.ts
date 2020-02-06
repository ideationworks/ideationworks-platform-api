import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceAlreadyExistsException extends HttpException {

    public constructor(message: string) {

        super(message, HttpStatus.CONFLICT);

    }

}
