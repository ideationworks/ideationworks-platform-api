export type SortFilter<T = any> = {

    [Key in keyof T]?: 'ASC' | 'DESC' | 1 | -1

}

/**
 * 
 * @param {string} sortString string with the format "-keyname" or "keyname"
 * @returns {SortFilter<T>} returns and object key : "DESC" | "ASC"
 * 
 */
export function getSortFilterFromString<T>(sortString: string): SortFilter<T> {

    const regex = /^(\-)?([\w]+)/;
    const [, sort, name] = sortString.match(regex);

    const filter: SortFilter<T> = {};

    if (name) {

        filter[name] = (sort === '-') ? 'DESC' : 'ASC';

    }

    return filter;

}

