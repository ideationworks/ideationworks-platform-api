import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsObject, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { PaginationQuery } from "../pagination/PaginationQuery";
import { FindManyOptions, Like, FindConditions, FindOneOptions } from "typeorm";
import { SortFilter, getSortFilterFromString } from "./SortFilter";
import { QueryFilterSearch } from "./QueryFilterSearch";

export class FilterQuery<T> {

    @ApiProperty()
    @IsObject({ message: "Is not a valid JSON Object" })
    @IsOptional()
    @Transform(value => transformJson(value))
    q?: QueryFilterSearch<T>;

    @ApiProperty()
    @IsString({ each: true })
    @IsOptional()
    @Transform((value: string) => value && value.split(','))
    fields?: (keyof T)[];

    @ApiProperty()
    @IsOptional()
    @Transform((value) => value && getSortFilterFromString(value))
    sort?: SortFilter<T>;

    @ApiProperty()
    @IsOptional()
    @Transform((value: string) => value && value.split(','))
    relations?: string[]

    /**
     * Function to add a custom query to be added to the params before get finde options is called
     * @param query Add a query to the params 
     */
    public addQuerySearch(query: QueryFilterSearch<T>) {

        this.q = (this.q) ? { ...this.q, ...query } : query;

    }

    /**
     * 
     * Use to get findOneOptions use in typeorm queries
     * @param options parameters use to determinate permisions for the query
     */
    public getFindOneOptions(options?: QueryFilterOptions<T>): FindOneOptions<T> {

        const query: FindOneOptions<T> = {};

        const { fields, sort, q, relations } = this;

        // If no options are pass it retunrs
        if (!options) return query;


        if (options.sortBy && sort) {

            const sortFound = Object.keys(sort).find((value) => options.sortBy.indexOf(value as keyof T) > -1);

            if (sortFound) query.order = { [sortFound]: sort[sortFound] } as SortFilter<T>;

        }

        if (options.fields && fields) {

            //
            // Filter fields name manually since we don't have access to the metadata of thee repository
            // and we want to avoid code coupling, if no option field is provided all fiels will be returned allways
            //
            const foundFields = fields.filter((value, index) => {

                return options.fields.indexOf(value) !== -1;

            });

            if (foundFields.length > 0) {

                query.select = [... new Set(foundFields)];

            }
        }
        /**
         * 
         * Logic to add explicity relation in the query
         */

        if (options.relations && relations) {

            //
            // Filter fields relations manually since we don't have access to the metadata of thee repository
            // and we want to avoid code coupling, if no option relation is provided no relation will be added
            //
            const foundRelations = relations.filter((value, index) => {

                return options.relations.indexOf(value) !== -1;

            });

            if (foundRelations.length > 0) {

                query.relations = [... new Set(foundRelations)]

            }

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

                    if (['string', 'number'].indexOf(typeof q[key]) > -1) where[key] = q[key];

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
