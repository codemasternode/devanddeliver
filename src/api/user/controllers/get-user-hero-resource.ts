import { Request, Response, NextFunction } from 'express'
import { SwapiAPI, UserService } from '../../../services'
import { IGetUserAuthInfoRequest, IUserArrayNames } from '../../../types'

const swapiAPIService = new SwapiAPI()
const userService = new UserService(swapiAPIService)

export function getUserHeroResource(resource: IUserArrayNames) {
    return async function (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {
            const userHeroResource = await userService.getUserHeroResource(req.user.email, resource)
            res.send({
                [resource]: userHeroResource
            })
        } catch (error) {
            next(error)
        }
    }
} 