import { Request, Response, NextFunction } from 'express'
import { UserService } from '../../../services'

const userService = new UserService()

export async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const newUser = await userService.SignUp(req.body)
        res.send({ ...newUser })
    } catch (error) {
        next(error)
    }
}