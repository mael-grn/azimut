export class UserNotFoundError extends Error {
    constructor(message: string = "User not found or password is incorrect") {
        super(message);
        this.name = "UserNotFoundError";
    }
}