import {Model} from "./model.entity";
import {Color} from "./color.entity";

export interface Product{
    id: number,
    price: string,
    startsAt: string|null,
    endsAt: string|null,
    discount: {
        discount_id: number,
        percent: number,
        starts_at: string,
        ends_at: string
    }|null,
    model: Model,
    color: Color,
    files: {
        id: number,
        name: string,
        encoded_img: string
    }[]
}