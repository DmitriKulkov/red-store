import axios from "axios";
import { Collection } from "../entities/collection.entity";

export class CollectionsService {
  static async getAll() {
    return await axios.get<Collection[]>(
      process.env.REACT_APP_API_URI + "/collection"
    );
  }
}
