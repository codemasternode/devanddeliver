import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from '../api/auth'
import userRoutes from '../api/user'
import { CommonError } from '../types'
import { errorHandler } from '../api/shared'


export default async (app: express.Application): Promise<express.Application> => {

    app.use(cors())
    app.use(cookieParser())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.use("/api/auth", authRoutes())
    app.use("/api/user", userRoutes())

    app.use((err: CommonError, req: Request, res: Response, next: NextFunction) => {
        errorHandler(err, res)
    })

    return app
}