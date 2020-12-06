import { Request, Response, NextFunction } from 'express'
import { SwapiAPI, UserService } from '../../../services'
import { IGetUserAuthInfoRequest, SwapiResponse } from '../../../types'

const userService = new UserService()
const swapiAPIService = new SwapiAPI()

export async function getProfile(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
        const user = await userService.getUserProfileByEmail(req.user.email)

        const promises: any[] = []
        const urls = [
            { name: 'films', array: [...user.hero.films] },
            { name: 'species', array: [...user.hero.species] },
            { name: 'vehicles', array: [...user.hero.vehicles] },
            { name: 'starships', array: [...user.hero.starships] }
        ]
        urls.forEach(({ name, array }) => {
            array.forEach((url) => {
                promises.push((async () => {
                    return {
                        name,
                        data: await swapiAPIService.getResourceFromURL(url)
                    }
                })())
            })
        })

        const data = await Promise.all(promises)
        res.send({
            data
        })

    } catch (error) {
        next(error)
    }
}