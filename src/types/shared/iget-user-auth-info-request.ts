import { Request } from "express"
import { IPeople } from "../people";

export interface IGetUserAuthInfoRequest extends Request {
    user: {
        email: string;
        hero: IPeople;
    }
}