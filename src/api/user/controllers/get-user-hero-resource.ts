import { Request, Response, NextFunction } from 'express'
import { SwapiAPI, UserService } from '../../../services'
import { IGetUserAuthInfoRequest, SwapiResponse, IUserArrayNames, IPeopleResponse, IPeople, IUserResponse, IUserProfile } from '../../../types'

const userService = new UserService()
const swapiAPIService = new SwapiAPI()

export function getUserHeroResource(resource: IUserArrayNames) {
    return async function (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUserProfileByEmail(req.user.email)

            const promises: any[] = []
            user.hero[resource].forEach((url) => {
                promises.push((async () => {
                    return await swapiAPIService.getResourceFromURL(url as string)
                })())
            })
            const data = await Promise.all(promises)
            res.send({
                [resource]: data
            })

        } catch (error) {
            next(error)
        }
    }
} 