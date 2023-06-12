export class HttpError extends Error {
    public statusCode: number;

    public message: string;

    constructor(statusCode:number, message:string){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export class NotFoundException extends HttpError{
    constructor(message = "User Not Found") {
        super(404, message)
    }
}