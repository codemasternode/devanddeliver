import express from 'express'
import { verifyToken } from '../shared/middlewares';
import { signUp, signIn, logout, getProfile, getUserHeroResource, getResourceById } from './controllers'

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

    //@ts-ignore
    router.get("/films/:id", verifyToken, getResourceById("films"))
    //@ts-ignore
    router.get("/species/:id", verifyToken, getResourceById("species"))
    //@ts-ignore
    router.get("/vehicles/:id", verifyToken, getResourceById("vehicles"))
    //@ts-ignore
    router.get("/starships/:id", verifyToken, getResourceById("starships"))

    return router
}
