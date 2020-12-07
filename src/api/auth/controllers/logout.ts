import { Request, Response, NextFunction } from 'express'

export async function logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token")
    res.send({})
}