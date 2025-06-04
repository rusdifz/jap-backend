export declare function CommonHeaders(): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const AuthorizationHeader: (required?: boolean) => {
    name: string;
    required: boolean;
};
