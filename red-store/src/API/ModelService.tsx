import axios, {AxiosResponse} from "axios";
import {Model} from "../entities/model.entity";

export default class ModelService{
    static  async getBySlug(slug: string):Promise<AxiosResponse<Model, any>>{
        const response = await axios.get<Model>(process.env.REACT_APP_API_URI + '/model/slug/' + slug)
        return response
    }
}