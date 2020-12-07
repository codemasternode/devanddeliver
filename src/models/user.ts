import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from '../types'
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
    hero: {
        name: String,
        height: String,
        mass: String,
        hair_color: String,
        skin_color: String,
        eye_color: String,
        birth_year: String,
        gender: String,
        homeworld: String,
        films: Array,
        species: Array,
        vehicles: Array,
        starships: Array,
        created: String,
        edited: String,
        url: String
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
        const isPasswordValid = compare(candidatePassword, this.password)
        return isPasswordValid
    } catch (err) {
        throw err
    }
};


const UserModel = model<IUserModel>("user", userSchema)

export default UserModel