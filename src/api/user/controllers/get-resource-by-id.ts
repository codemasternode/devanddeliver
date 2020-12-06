import { Request, Response, NextFunction } from 'express'
import { SwapiAPI, UserService } from '../../../services'
import { IGetUserAuthInfoRequest, SwapiResponse, IUserArrayNames, IPeopleResponse, IPeople, IUserResponse, IUserProfile, ForbiddenError } from '../../../types'

const userService = new UserService()
const swapiAPIService = new SwapiAPI()

export function getResourceById(resource: IUserArrayNames) {
    return async function (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {

            const user = await userService.getUserProfileByEmail(req.user.email)

            const promises: any[] = []
            for (let i = 0; i < user.hero[resource].length; i++) {
                const url = user.hero[resource][i]
                if (url.includes(req.params.id)) {
                    const fetchedResource = await swapiAPIService.getResourceFromURL(url as string)
                    return res.send({
                        [resource]: fetchedResource
                    })
                }
            }
            throw new ForbiddenError({
                message: "Your hero doesn't have access to this resource"
            })
        } catch (error) {
            next(error)
        }
    }
} 