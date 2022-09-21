import React from "react";
import axios from "axios";
import { Color } from "../entities/color.entity";

export default class ColorsService {
  static async getAll() {
    return await axios.get<Color[]>(process.env.REACT_APP_API_URI + "/colors/");
  }
}
