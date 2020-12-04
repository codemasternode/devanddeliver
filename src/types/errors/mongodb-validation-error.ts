import { CommonError } from "./common-error";

class MongoDBValidationError extends CommonError {
    constructor(body: object) {
        super(400, body)
    }
}

export { MongoDBValidationError }