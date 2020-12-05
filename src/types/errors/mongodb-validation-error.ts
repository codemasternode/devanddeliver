import { CommonError } from "./common-error";

class MongoDBValidationError extends CommonError {
    name = 'MongoDBValidationError'
    constructor(body: object) {
        super(400, body)
    }
}

export { MongoDBValidationError }