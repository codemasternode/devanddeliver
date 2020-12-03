import express from 'express'
import expressLoader from './express'
import mongoLoader from './mongo'
import config from '../config'

const { node: { PORT } } = config

export default async (): Promise<express.Application> => {

    const app = express()
    await expressLoader(app)

    await mongoLoader()

    return app
}