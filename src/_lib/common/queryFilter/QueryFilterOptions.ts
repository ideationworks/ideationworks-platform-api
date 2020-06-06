/**
 * 
 * Query Filter options used as paramters for the query transformations
 *
 * */
interface QueryFilterOptions<T> {

    fields?: (keyof T)[];
    queryFields?: (keyof T)[];
    softDelete?: boolean;
    relations?: string[];
    sortBy?:(keyof T)[];

}