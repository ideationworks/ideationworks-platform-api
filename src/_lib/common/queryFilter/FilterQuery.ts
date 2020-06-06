import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsString, IsObject, IsOptional, IsIn } from "class-validator";
import { Transform } from "class-transformer";
import { PaginationQuery } from "../pagination/PaginationQuery";
import { FindManyOptions, Like, FindConditions } from "typeorm";
import { SortFilter, getSortFilterFromString } from "./SortFilter";
import { User } from "src/users/User";
import { QueryFilterSearch } from "./QueryFilterSearch";

export class FilterQuery<T> extends PaginationQuery {

    @ApiProperty()
    @IsObject({ message: "Is not a valid JSON Object" })
    @IsOptional()
    @Transform(value => transformJson(value))
    q: QueryFilterSearch<T>;

    @ApiProperty()
    @IsString({ each: true })
    @IsOptional()
    @Transform((value: string) => value && value.split(','))
    fields: (keyof T)[];

    @ApiProperty()
    @IsOptional()
    @Transform((value) => value && getSortFilterFromString(value))
    sort: SortFilter<T>;

    getFindManyOptions(options?: QueryFilterOptions<T>): FindManyOptions<T> {

        const query: FindManyOptions<T> = {

            skip: this.offset,
            take: this.size,

        };

        const { fields, sort, q } = this;

        if (sort) query.order = sort;

        console.log(this);

        if (options.fields && fields) {

            //
            // Filter fields name manually since we don't have access to the metadata of thee repository
            // and we want to avoid code coupling, if no option field is provided all fiels will be returned allways
            //
            const foundFields = fields.filter((value, index) => {

                return options.fields.indexOf(value) !== -1;

            });

            if (foundFields.length > 0) query.select = foundFields;

        }

        /**
         * 
         * Logic to add all the where constrains to the query
         * 
         */

        const where: FindConditions<T> = {}

        if (options.queryFields && q) {

            Object.keys(q).forEach((key) => {

                if (options.queryFields.indexOf(key as keyof T) > -1) {

                    if (typeof q[key] === 'string') where[key] = q[key];

                    if (q[key].$like) where[key] = Like(q[key].$like);

                }

            });

        }

        //
        // Add deleted parameter to filter to only return records that are not deleted
        //

        if (options.softDelete) where['deleted'] = false;

        if (Object.keys(where).length > 0) query.where = where;

        return query;

    }

}

/**
 * 
 * Function use it to tranform a json, if is not possible to parse it returns the same string
 * to let the validator handle the error
 * 
 * @param value json string
 */
function transformJson(value: string) {
    try {
        const json = JSON.parse(value);
        return json;
    } catch (e) {
        return value;
    }
}
