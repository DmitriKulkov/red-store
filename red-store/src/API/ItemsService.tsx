import React from 'react';
import axios from "axios";
import {Product} from "../entities/product.entity";
import {FilterState} from "../filters/reducers/filterReducers";


export default class ItemsService{

    static async getAllItems(limit: number, page: number, filters: FilterState){
        const response = await axios.get<Product[]>(process.env.REACT_APP_API_URI + '/products/', {
            params:{
                _limit: limit,
                _page: page,
                _name: '',
                _sortPrice: filters.sortPrice,
                _priceFloor: filters.priceDiapason.a,
                _priceTop: filters.priceDiapason.b,
                _collection: filters.collection,
                // _gender:
                _cColors: filters.cColors,
            }
        })
        return response
    }

    static async getItemsByCollection(collection: String, limit: number, page: number){
        const response = await axios.get<Product[]>(process.env.REACT_APP_API_URI + '/products/collection/' + collection, {
            params:{
                _limit: limit,
                _page: page
            }
        })
        return response
    }

}