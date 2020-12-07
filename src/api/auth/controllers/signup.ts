import { Request, Response, NextFunction } from 'express'
import { SwapiAPI, UserService } from '../../../services'

const swapiAPIService = new SwapiAPI()
const userService = new UserService(swapiAPIService)

export async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const newUser = await userService.SignUp(req.body)
        res.send({ ...newUser })
    } catch (error) {
        next(error)
    }
}