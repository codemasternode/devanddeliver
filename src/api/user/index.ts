import express from 'express'
import { verifyToken } from '../shared/middlewares';
import { signUp, signIn, logout, getProfile, getUserHeroResource } from './controllers'

const router = express.Router();

export default () => {

    router.post("/sign-up", signUp)
    router.post("/sign-in", signIn)
    router.post("/logout", logout)

    //@ts-ignore
    router.get("/profile", verifyToken, getProfile)
    //@ts-ignore
    router.get("/films", verifyToken, getUserHeroResource("films"))
    //@ts-ignore
    router.get("/species", verifyToken, getUserHeroResource("species"))
    //@ts-ignore
    router.get("/vehicles", verifyToken, getUserHeroResource("vehicles"))
    //@ts-ignore
    router.get("/starships", verifyToken, getUserHeroResource("starships"))


    return router
}
