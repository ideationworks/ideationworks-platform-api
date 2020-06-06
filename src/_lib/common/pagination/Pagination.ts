import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
/**
 * Pagination wrapper
 */
export class Pagination {

    @ApiProperty({ description : 'Current page'})
    @Expose()
    page: number;

    @ApiProperty( {description: 'Number of records per page'})
    @Expose()
    perPage: number;

    @ApiProperty({ description: 'All the records available' })
    @Expose()
    totalRecords: number;

    @ApiProperty({ description: 'All the records in the page' })
    @Expose()
    pageRecords: number;

    @ApiProperty({ description: 'Total number of pages available'})
    @Expose()
    totalPages: number;

    /**
     * 
     * @param items number of items in the page
     * @param totalRecords number of records available in the database
     * @param offset number of records offset
     * @param size number of records picked
     */
    constructor(items: number, totalRecords: number, offset: number, size: number) {

        this.page = Math.floor((offset / size) + 1);
        this.perPage = size;
        this.totalRecords = totalRecords;
        this.pageRecords = items;
        this.totalPages = Math.floor(totalRecords / size + 1);
        
    }

}