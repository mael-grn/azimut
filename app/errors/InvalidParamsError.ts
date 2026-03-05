export class InvalidParamsError extends Error {
    constructor(message: string = "Invalid parameters") {
        super(message);
        this.name = "InvalidParamsError";
    }
}