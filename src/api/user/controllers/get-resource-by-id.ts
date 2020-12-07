import { Request, Response, NextFunction } from 'express'
import { SwapiAPI, UserService } from '../../../services'
import { IGetUserAuthInfoRequest, IUserArrayNames, ForbiddenError } from '../../../types'

const swapiAPIService = new SwapiAPI()
const userService = new UserService(swapiAPIService)

export function getResourceById(resource: IUserArrayNames) {
    return async function (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {
            const fetchedResource = await userService.getResourceById(req.user.email, resource, req.params.id)
            res.send({
                [resource]: fetchedResource
            })
        } catch (error) {
            next(error)
        }
    }
} 