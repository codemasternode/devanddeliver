import { Document } from 'mongoose'
import { IPeople } from '../people'

interface IUser extends Document {
    email: string;
    password: string;
    hero: IPeople
}

interface IUserDocument extends IUser {
    comparePassword(password: string): boolean;
}

export { IUser, IUserDocument }