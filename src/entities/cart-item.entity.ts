import { Product } from "./product.entity";
import { Color } from "./color.entity";
import { Sizes } from "../components/utils/sizes/sizes";

export interface CartItem {
  id: number;
  product: Product;
  color: Color;
  size: Sizes;
  quantity: number;
}
