import { plainToClassFromExist, classToPlain } from "class-transformer";
import { ClassTransformOptions } from "@nestjs/common/interfaces/external/class-transform-options.interface";

export abstract class BaseResponse {

    constructor(data: any, options: ClassTransformOptions = { excludeExtraneousValues: true }) {

        plainToClassFromExist(this, classToPlain(data), options)

    }
}