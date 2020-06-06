import { FindManyOptions } from "typeorm";

/**
 * Inteface use to mantain a naming standar.
 * Services that are planned to be use for CRUD operations should follow this contract
 * 
 * NOTE: If there is a need to split this in single interfaces feel free to do it and update the services
 */
export interface CrudServiceBase<T> {

    create(data: Partial<T>): Promise<T>;
    getById(id: string): Promise<T>;
    updateById(id: string, data: Partial<T>): Promise<T>;
    findAndCount(query: FindManyOptions<T>): Promise<[Array<T>, number]>;
    deleteById(id: string) :Promise<void>

}