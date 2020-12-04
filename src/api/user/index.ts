import express from 'express'
import { singUp } from './controllers'

const router = express.Router();

export default () => {

    router.post("/singup", singUp)

    return router
}
