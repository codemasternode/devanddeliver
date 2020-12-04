import { Error } from 'mongoose'
import { UserModel } from '../models'
import { InternalError, IUser, IUserResponse, MongoDBValidationError } from '../types'
import { IUserRequest } from '../types/user/iuser-request'
import { SwapiAPI } from './index'

export class UserService {
    async SignUp(user: IUserRequest): Promise<IUserResponse | never> {
        try {
            const countPeople = await SwapiAPI.getNumberOfPeople()
            const randomHero = await SwapiAPI.getPeopleById(Math.floor(Math.random() * countPeople + 1))
            const savedUser = await UserModel.create({ ...user, heroName: randomHero.name })

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
            }
            throw new InternalError({
                message: err.toString()
            })
        }
    }
}