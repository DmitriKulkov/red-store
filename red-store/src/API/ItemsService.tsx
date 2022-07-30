import React from 'react';
import axios, {AxiosResponse} from "axios";
import {Product} from "../entities/product.entity";
import {FilterState} from "../store/reducers/filterReducers";


export default class ItemsService{

    static async getAllItems(limit: number, page: number, filters: FilterState):Promise<AxiosResponse<Product[], any>>{
        const response = await axios.get<Product[]>(process.env.REACT_APP_API_URI + '/products/', {
            params:{
                _limit: limit,
                _page: page,
                _name: filters.name,
                _sortPrice: filters.sortPrice,
                _priceFloor: filters.priceDiapason.a,
                _priceTop: filters.priceDiapason.b,
                _collection: filters.collection,
                // _gender:
                _cColors: filters.cColors,
                _category: filters.category
            }
        })
        return response
    }

    static async getItemsByCollection(collection: string, limit: number, page: number):Promise<AxiosResponse<Product[], any>>{
        const response = await axios.get<Product[]>(process.env.REACT_APP_API_URI + '/products/collection/' + collection, {
            params:{
                _limit: limit,
                _page: page
            }
        })
        return response
    }

    static  async getBySlug(slug: string):Promise<AxiosResponse<Product, any>>{
        const response = await axios.get<Product>(process.env.REACT_APP_API_URI + '/products/slug/' + slug)
        return response
    }

}