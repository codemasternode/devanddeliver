import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { errorHandler } from '../api/shared/middlewares/error-handler'
import userRoutes from '../api/user'
import { CommonError } from '../types'

export default async (app: express.Application): Promise<express.Application> => {

    app.use(cors())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.use("/api/user", userRoutes())

    app.use((err: CommonError, req: Request, res: Response, next: NextFunction) => {
        errorHandler(err, res)
    })

    return app
}