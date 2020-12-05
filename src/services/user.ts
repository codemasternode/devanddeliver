import { Error } from 'mongoose'
import { UserModel } from '../models'
import { InternalError, IUser, IUserResponse, MongoDBValidationError } from '../types'
import { IUserRequest } from '../types/user/iuser-request'
import { SwapiAPI } from './index'
import { AuthenticationError } from '../types/errors/authentication-error'
import { JWTAuthentication } from '.'


export class UserService {
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
}