import express from 'express'
import { signUp, signIn } from './controllers'

const router = express.Router();

export default () => {

    router.post("/sign-up", signUp)
    router.post("/sign-in", signIn)

    return router
}
