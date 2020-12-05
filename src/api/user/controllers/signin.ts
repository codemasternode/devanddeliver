import { Request, Response, NextFunction } from 'express'
import { UserService } from '../../../services'
import config from '../../../config'

const userService = new UserService()

export async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        const token = await userService.SignIn(req.body)
        const expiresAt = await new Date(Date.now() + config.node.jwtExpire)
        return res.cookie("token", token, {
            expires: expiresAt,
            secure: false,
            httpOnly: true
        }).send({ expiresAt })
    } catch (error) {
        next(error)
    }
}