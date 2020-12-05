import { IPeople } from "../people";

interface IUserResponse {
    [x: string]: any;
    email: string;
    hero: IPeople
}

export { IUserResponse }