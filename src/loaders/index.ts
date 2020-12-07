import express from 'express'
import expressLoader from './express'
import mongoLoader from './mongo'

export default async (): Promise<express.Application> => {

    const app = express()
    await expressLoader(app)

    await mongoLoader()

    return app
}