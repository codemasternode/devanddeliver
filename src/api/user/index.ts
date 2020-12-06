import express from 'express'
import { verifyToken } from '../shared/middlewares';
import { signUp, signIn, logout, getProfile } from './controllers'

const router = express.Router();

export default () => {

    router.post("/sign-up", signUp)
    router.post("/sign-in", signIn)
    router.post("/logout", logout)

    //@ts-ignore
    router.get("/profile", verifyToken, getProfile)

    return router
}
