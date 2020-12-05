import { Request, Response, NextFunction } from 'express'
import { verify, Algorithm } from 'jsonwebtoken'
import config from '../../../config'
import { IGetAuthTokenInfo, IGetUserAuthInfoRequest } from '../../../types'

export async function verifyToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token
    try {
        if (!token) {
            return res.status(401).send({
                msg: "Authentication required"
            })
        }
        const decrypt = await verify(token, config.node.privateJWTKey, {
            algorithms: [config.node.jwtAlgorithm as Algorithm]
        })
        req.user = {
            email: (decrypt as IGetAuthTokenInfo).email,
            heroName: (decrypt as IGetAuthTokenInfo).heroName
        };
        next();
    } catch (err) {
        res.status(401).send({
            msg: "Your token expired"
        });
    }
};