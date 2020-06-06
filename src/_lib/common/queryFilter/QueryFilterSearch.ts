export interface QueryWhereOptions {

    $like: String,

}

export type QueryFilterSearch<T> = {

    [Key in keyof T]?: string | QueryWhereOptions

}