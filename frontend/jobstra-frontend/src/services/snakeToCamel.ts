const snakeToCamel = (str: string): string => {
    return str.replace(/_./g, (char: string) => char[1].toUpperCase())
}

export const transformSnakeToCamelObj = <T extends object>(obj: object): T => {
    const newObj = {} as T;
    for(const [key, value] of Object.entries(obj)) {
        const transformedKey: string = snakeToCamel(key);
        Object.assign(newObj, {[transformedKey]: value});
    }
    return newObj;
}








