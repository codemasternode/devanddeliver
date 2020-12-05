import { IUser } from '.'
import { Document } from 'mongoose'

export interface IUserModel extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean | never>
}