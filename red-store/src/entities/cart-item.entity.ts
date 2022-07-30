import {Product} from "./product.entity";
import {Color} from "./color.entity";
import {Sizes} from "../pages/item/sizes/sizes";

export interface CartItem {
    product: Product,
    color: Color,
    size: Sizes,
    quantity: number
}