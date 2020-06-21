import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";

/**
 * Parse Bool Pipe
 * Convert String to boolean, if undefined return false
 */
@Injectable()
export class ParseBoolPipe implements PipeTransform {

    transform(value: string, metadata: ArgumentMetadata): boolean {

        if (value === undefined) return false;

        if (value === '0' || value.toLowerCase() === 'false') return false

        if (value === '1' || value.toLowerCase() === 'true') return true

        throw new BadRequestException('No boolean value was provided')

    }

}