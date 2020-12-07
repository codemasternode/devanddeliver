import { Request, Response, NextFunction } from 'express'
import { SwapiAPI, UserService } from '../../../services'
import { IGetUserAuthInfoRequest, IUserArrayNames, IUserProfile } from '../../../types'

const swapiAPIService = new SwapiAPI()
const userService = new UserService(swapiAPIService)

export async function getProfile(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
        const profile = await userService.getProfile(req.user.email)

        res.send({
            user: profile
        })

    } catch (error) {
        next(error)
    }
}