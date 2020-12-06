import { CommonError } from ".";

class NotFoundError extends CommonError {

    name = "NotFoundError"

    constructor(body: object) {
        super(404, body)
    }
}

export { NotFoundError }