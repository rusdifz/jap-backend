export declare function statusOK(code: number, data: any): {
    meta: {
        code: number;
        msg: string;
    };
    data: any;
};
export declare function statusError(code: number, msg: string, err: any): {
    meta: {
        code: number;
        msg: string;
    };
    error: any;
};
