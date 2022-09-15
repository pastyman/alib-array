export = alibarray;
/**
   * a set of array helper functions
* @param {array} arr - array for operation to be executed on
   */
declare function alibarray(arr: any[]): {
    move: (fromIndex: int, toIndex: int) => void;
    swap: (indexA: int, indexB: any) => void;
    insert: (item: any, index: int) => void;
    contains: (compareItem: any, compareMode?: string) => boolean;
    position: (compareItem: any, compareMode?: string) => int;
    match: (compareItem: any, compareMode?: string) => int;
    exclude: (compareItem: any, compareMode?: string) => int;
    find: (compareItem: any, compareMode?: string) => int;
    update: (compareItem: any, updateItem: any, compareMode?: string) => int;
    replace: (compareItem: any, replaceItem: any, compareMode?: string) => int;
    count: (compareItem: any, compareMode?: string) => int;
    last: () => any;
    first: () => any;
    unique: (propName: string) => any[];
};
