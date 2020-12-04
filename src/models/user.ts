import { Schema, model } from 'mongoose'
import { IUser } from '../types'

function validateEmail(email: string): boolean {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}


const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        validate: [validateEmail, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: true
    },
    heroName: {
        type: String,
        required: true
    }
})

const UserModel = model<IUser>("user", userSchema)

export default UserModel