import config from '../config'
import mongoose, { Mongoose } from 'mongoose'

const { mongo: { db, port } } = config

export default async (): Promise<Mongoose> => {
    if (!db || !port) {
        throw new Error(`Missing mongodb enviroment variables`)
    }
    try {
        const connection = await mongoose.connect(`mongodb://mongo:${port}/${db}`, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Connected to MongoDB database ${db} running on port ${port}`)
        return connection
    } catch (err) {
        throw new Error(err)
    }


}