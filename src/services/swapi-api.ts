import Axios, { AxiosResponse } from 'axios';
import config from '../config'
import { IPeopleAll, IPeople } from '../types'
import { Cache } from './index'

const { node: { swapiApiURL } } = config


export class SwapiAPI {

    cache: Cache

    constructor() {
        this.cache = new Cache(86400)
    }

    static async getNumberOfPeople(): Promise<number | never> {
        try {
            const response: AxiosResponse<IPeopleAll> = await Axios({
                url: `${swapiApiURL}/people`
            })
            return response.data.count
        } catch (err) {
            throw err
        }
    }

    static async getPeopleById(id: number): Promise<IPeople | never> {
        try {
            const response: AxiosResponse<IPeople> = await Axios({
                url: `${swapiApiURL}/people/${id}`
            })
            return response.data
        } catch (err) {
            throw err
        }
    }

    async getResourceFromURL(url: string) {
        return this.cache.get(url, async () => {
            const response = await Axios({
                url
            })
            return response.data
        })
    }

}