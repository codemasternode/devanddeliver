import { Schema, model, Document } from 'mongoose'
import { IUser } from '../types'
import { genSalt, hash, compare } from 'bcryptjs'
import config from '../config'

function validateEmail(email: string): boolean {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}


const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        validate: [validateEmail, "Please fill a valid email address"],
        unique: true
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

userSchema.pre<IUser>("save", async function (next) {

    if (!this.isModified("password")) {
        return next(null)
    }

    try {
        const salt = await genSalt(config.node.genSalt)
        const hashedPassword = await hash(this.password, salt)
        this.password = hashedPassword
    } catch (err) {
        return next(err)
    }

    next(null)
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean | never> {
    try {
        console.log(candidatePassword, this)
        const isPasswordValid = compare(candidatePassword, this.password)
        return isPasswordValid
    } catch (err) {
        throw err
    }
};

interface IUserModel extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean | never>
}

const UserModel = model<IUserModel>("user", userSchema)

export default UserModel