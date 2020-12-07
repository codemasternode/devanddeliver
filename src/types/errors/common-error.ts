class CommonError extends Error {

    statusCode: number;
    body: object;

    constructor(statusCode: number, body: object) {
        super()
        this.statusCode = statusCode
        this.body = body
    }
}

export { CommonError }