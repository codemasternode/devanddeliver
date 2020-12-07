import { CommonError } from ".";

class AuthenticationError extends CommonError {

    name = "AuthenticationError"

    constructor(body: object) {
        super(401, body)
    }
}

export { AuthenticationError }