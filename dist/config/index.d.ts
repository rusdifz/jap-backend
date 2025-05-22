export declare const configIndex: {
    isGlobal: boolean;
    load: ((() => import("./db/db.interface").DbConfigInterface) | (() => {
        redis: {
            name: string;
            host: string;
            port: string;
            password: string;
        }[];
    }))[];
};
