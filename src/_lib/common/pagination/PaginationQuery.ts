import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
/**
 * Query params use for pagination
 */
export class PaginationQuery {

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Transform(value => (value && parseInt(value, 10)))
    offset: number = 0;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Transform(value => (value && parseInt(value, 10)))
    size: number = 20;

}