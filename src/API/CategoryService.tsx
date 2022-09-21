import axios from "axios";
import { Category } from "../entities/category.entity";

export class CategoryService {
  static async getAll() {
    return await axios.get<Category[]>(
      process.env.REACT_APP_API_URI + "/category"
    );
  }

  static async getByGCategory(globCat: string) {
    return await axios.get<Category[]>(
      process.env.REACT_APP_API_URI + "/category/" + globCat
    );
  }
}
