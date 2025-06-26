import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    constructor(message: string = "Recurso no encontrado") {
        super(message, 404)
    }
}