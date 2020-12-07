import { Error } from 'mongoose'
import { UserModel } from '../models'
import { InternalError, IUser, IUserResponse, MongoDBValidationError, AuthenticationError, NotFoundError, IUserProfile, IUserArrayNames, ForbiddenError } from '../types'
import { IUserRequest } from '../types/user/iuser-request'
import { SwapiAPI } from './index'
import { JWTAuthentication } from '.'
import { Cache } from './index'

export class UserService {

    cache: Cache;
    swapiApiService: SwapiAPI;

    constructor(swapiApiService: SwapiAPI) {
        this.cache = new Cache(86400)
        this.swapiApiService = swapiApiService
    }
    async SignUp(user: IUserRequest): Promise<IUserResponse | never> {
        try {
            const countPeople = await SwapiAPI.getNumberOfPeople()
            const randomHero = await SwapiAPI.getPeopleById(Math.floor(Math.random() * countPeople + 1))
            const savedUser = await UserModel.create({ ...user, hero: randomHero })

            const response: IUserResponse = {
                ...savedUser.toJSON()
            }
            delete response.password

            return response
        } catch (err) {
            if (err instanceof Error.ValidationError) {
                const errors = Object.keys(err.errors).map((field) => {
                    return {
                        [field]: err.errors[field].message
                    }
                })
                throw new MongoDBValidationError(errors)
            } else if (err.name === 'MongoError' && err.code === 11000) {
                throw new MongoDBValidationError({
                    message: "Email has to be unique"
                })
            }
            throw new InternalError({
                message: err.toString()
            })
        }
    }
    async SignIn(user: IUserRequest): Promise<string | never> {
        try {
            const document = await UserModel.findOne({
                email: user.email
            })
            if (!document) {
                throw new AuthenticationError({
                    message: "Email or password are invalid"
                })
            }

            const isPasswordMatch = await document?.comparePassword(user.password)
            if (!isPasswordMatch) {
                throw new AuthenticationError({
                    message: "Email or password are invalid"
                })
            }
            return await JWTAuthentication.createJWT({ email: user.email, hero: document.hero })
        } catch (err) {
            if (err.name === 'AuthenticationError') {
                throw err
            }
            throw new InternalError({
                message: err.toString()
            })
        }
    }

    async getUserProfileByEmail(email: string): Promise<IUser | never> {
        try {
            const user = await this.cache.get(email, async () => {
                const user = await UserModel.findOne({
                    email
                })

                return user
            })

            if (!user) {
                throw new NotFoundError({
                    message: `User with ${email} doesn't exist`
                })
            }

            return user as IUser
        } catch (err) {
            if (err.name === "NotFoundError") {
                throw err
            }
            throw new InternalError({
                message: err.toString()
            })
        }
    }

    async getProfile(email: string) {
        try {
            const user = await this.getUserProfileByEmail(email)

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
                            data: await this.swapiApiService.getResourceFromURL(url as string)
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
            return profile
        } catch (err) {
            throw err
        }
    }

    async getResourceById(email: string, resource: IUserArrayNames, id: string) {
        try {
            const user = await this.getUserProfileByEmail(email)

            const promises: any[] = []
            for (let i = 0; i < user.hero[resource].length; i++) {
                const url = user.hero[resource][i]
                if (url.includes(id)) {
                    const fetchedResource = this.swapiApiService.getResourceFromURL(url as string)
                    return fetchedResource
                }
            }
            throw new ForbiddenError({
                message: "Your hero doesn't have access to this resource"
            })
        } catch (err) {
            throw err
        }
    }

    async getUserHeroResource(email: string, resource: IUserArrayNames) {
        const user = await this.getUserProfileByEmail(email)

        const promises: any[] = []
        user.hero[resource].forEach((url) => {
            promises.push((async () => {
                return await this.swapiApiService.getResourceFromURL(url as string)
            })())
        })
        const data = await Promise.all(promises)
        return data
    }


}