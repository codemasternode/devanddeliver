import { CommonError } from "./common-error";

class InternalError extends CommonError {
    constructor(body: object) {
        super(500, body)
    }
}

export { InternalError }