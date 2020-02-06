export class BaseException {

    public status: number | string;
    public message: string;
    public timestamp: string;
    public path: string;

    public constructor(status: number | string, message?: string) {

        this.status = status;
        this.message = message;

    }

}
