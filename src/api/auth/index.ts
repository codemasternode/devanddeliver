export * from './controllers'
export * from './middlewares'
import express from 'express'
import { signUp, signIn, logout } from './controllers'

const router = express.Router()

export default () => {

    router.post("/sign-up", signUp)
    router.post("/sign-in", signIn)
    router.post("/logout", logout)

    return router
}