import { BaseError } from "./BaseError";


export class BadRequestError extends BaseError {
    constructor(message: string = "Solicitud inválida") {
        super(message, 400);
    }
}