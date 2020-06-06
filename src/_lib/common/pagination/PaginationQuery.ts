import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { FilterQuery } from "../queryFilter/FilterQuery";
import { FindManyOptions } from "typeorm";
/**
 * Query params use for pagination
 */
export class PaginationQuery<T> extends FilterQuery<T> {

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
    
    /**
     * 
     * Use to get findManyOptions use in typeorm queries
     * @param options parameters use to determinate permisions for the query
     */
    getFindManyOptions(options?: QueryFilterOptions<T>): FindManyOptions<T> {

        const query: FindManyOptions<T> = {

            skip: this.offset,
            take: this.size,
            ...this.getFindOneOptions(options)

        };

        return query;
            
    }

}