import { CommonError } from ".";

class InternalError extends CommonError {

    name = "InternalError"

    constructor(body: object) {
        super(500, body)
    }
}

export { InternalError }