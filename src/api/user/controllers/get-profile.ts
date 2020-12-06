import { Request, Response, NextFunction } from 'express'
import { SwapiAPI, UserService } from '../../../services'
import { IGetUserAuthInfoRequest, SwapiResponse, IUserArrayNames, IPeopleResponse, IPeople, IUserResponse, IUserProfile } from '../../../types'

const userService = new UserService()
const swapiAPIService = new SwapiAPI()


export async function getProfile(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
        const user = await userService.getUserProfileByEmail(req.user.email)

        const promises: any[] = []
        const urls: { name: IUserArrayNames | 'homeworld', array: unknown[] }[] = [
            { name: 'films', array: [...user.hero.films] },
            { name: 'species', array: [...user.hero.species] },
            { name: 'vehicles', array: [...user.hero.vehicles] },
            { name: 'starships', array: [...user.hero.starships] },
            { name: 'homeworld', array: [user.hero.homeworld] }
        ]
        user.hero.films = []
        user.hero.species = []
        user.hero.vehicles = []
        user.hero.starships = []

        urls.forEach(({ name, array }) => {
            array.forEach((url) => {
                promises.push((async () => {
                    return {
                        name,
                        data: await swapiAPIService.getResourceFromURL(url as string)
                    }
                })())
            })
        })
        const data = await Promise.all(promises)
        const profile: IUserProfile = {
            email: user.email,
            // @ts-ignore
            hero: {
                ...user.hero,
                films: [],
                species: [],
                vehicles: [],
                starships: [],
            }

        }
        data.forEach(({ name, data }: { name: IUserArrayNames | 'homeworld', data: object }) => {
            if (name === 'homeworld') {
                profile.hero.homeworld = data
            } else {
                profile.hero[name].push(data)
            }
        })
        res.send({
            user: profile
        })

    } catch (error) {
        next(error)
    }
}