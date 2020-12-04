import { Document } from 'mongoose'

interface IUser extends Document {
    email: string;
    password: string;
    heroName: string
}

export { IUser }