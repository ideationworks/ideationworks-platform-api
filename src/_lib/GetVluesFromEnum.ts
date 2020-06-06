/**
 * 
 * Funtion use to get all the string values from keys and remove values if needed
 * 
 * @param enumType Enum
 * @param options options to return values
 * 
 */
export function getValuesFromEnum<T>(enumType: T, options?: { remove?: (keyof T)[] }) {

    return Object.keys(enumType).reduce<Array<string>>(

        (prev: string[], current: string, index) => {

            if (options && options.remove && options.remove.indexOf(current as keyof T) > -1) return prev;

            prev.push(enumType[current]);
            
            return prev;

        }, []);

}