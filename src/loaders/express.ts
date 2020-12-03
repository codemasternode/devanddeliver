import express from 'express'
import cors from 'cors'


export default async (app: express.Application): Promise<express.Application> => {

    app.use(cors())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    return app
}