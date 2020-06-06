import { ApiProperty } from "@nestjs/swagger";
import { Type, Expose, Exclude, plainToClassFromExist } from "class-transformer";
import { PaginationQuery } from "./PaginationQuery";
import { Pagination } from "./Pagination";

/**
 * 
 * Class use to return a well formated response for pagination
 * 
 */
export abstract class PaginationResponse<T, U> {

    @Exclude()
    private recordType: Function;

    @ApiProperty({type:[Object]})
    @Expose()
    @Type((opt) => {

        // Since typescript dinamic classes does not provide metadata needed to class transform
        // we need to provide the type
        return (opt.newObject as PaginationResponse<T, U>).recordType;

    })
    records: U[]

    @ApiProperty()
    @Expose()
    @Type(() => Pagination)
    pagination: Pagination;

    /**
     * 
     * @param recordType Response Class
     * @param items  Get Count object from repository
     * @param page Pagination parameters
     * 
     */
    constructor(recordType: Function, items: [Array<T>, number], page: PaginationQuery) {

        this.recordType = recordType;

        const [records, itemsCount] = items;
        const pagination = new Pagination(records.length, itemsCount, page.offset, page.size);

        plainToClassFromExist(this, { records, pagination }, { excludeExtraneousValues: true });

    }

}


