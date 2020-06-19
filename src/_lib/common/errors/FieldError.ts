export interface FieldError {

    value: string;
    property: string;
    constraints: {
        [key: string]: string;
    };

}
