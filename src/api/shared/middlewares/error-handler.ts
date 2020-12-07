import { Response } from 'express'
import { CommonError } from '../../../types'

export const errorHandler = (err: CommonError, res: Response): void => {
    const { statusCode, body } = err
    res.status(statusCode).send(body)
}

