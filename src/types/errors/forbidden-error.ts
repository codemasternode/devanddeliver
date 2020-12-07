import { CommonError } from ".";

class ForbiddenError extends CommonError {

    name = "ForbiddenError"

    constructor(body: object) {
        super(403, body)
    }
}

export { ForbiddenError }