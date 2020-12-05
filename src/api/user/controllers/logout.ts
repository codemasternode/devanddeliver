import { Request, Response, NextFunction } from 'express'
import { UserService } from '../../../services'
import config from '../../../config'

const userService = new UserService()

export async function logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token")
    res.send({})
}