import { Category } from "./category.entity";

export interface Model {
  id: number;
  name: string;
  slug: string;
  description: string;
  released: boolean;
  category: Category;
}
