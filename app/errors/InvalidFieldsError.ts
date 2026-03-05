export class InvalidFieldsError extends Error {
    constructor(message: string = "Certain fields are invalid or missing") {
        super(message);
        this.name = "InvalidFieldsError";
    }
}