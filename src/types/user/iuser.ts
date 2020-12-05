import { Document } from 'mongoose'

interface IUser extends Document {
    email: string;
    password: string;
    heroName: string
}

interface IUserDocument extends IUser {
    comparePassword(password: string): boolean;
}

export { IUser }