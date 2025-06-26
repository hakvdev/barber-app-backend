import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
    constructor(message: string = "Conflicto") {
        super(message, 409);
    }
}