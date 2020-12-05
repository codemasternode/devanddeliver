import { sign, Algorithm } from 'jsonwebtoken'
import config from '../config'

export class JWTAuthentication {
    static async createJWT(payload: object): Promise<string> {
        return await sign(payload, config.node.privateJWTKey, {
            algorithm: config.node.jwtAlgorithm as Algorithm,
            expiresIn: config.node.jwtExpire / 1000
        })
    }
}   