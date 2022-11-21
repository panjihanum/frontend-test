import axios from "axios";
import { PlanetAttributes, PlanetResponse } from "../types/planet.type";

let swapiUrl: string = "https://swapi.dev/api";

const getAll = async () => {
  try {
    const response = await axios
      .get<PlanetResponse>(`${swapiUrl}/planets`)
      .then((response) => {
        return response.data;
      });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
};

const getAllByUrl = async (url: string) => {
  try {
    const response = await axios
      .get<PlanetResponse>(`${url}`)
      .then((response) => {
        return response.data;
      });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
};

const getSingleByUrl = async (url: string) => {
  try {
    const response = await axios
      .get<PlanetAttributes>(`${url}`)
      .then((response) => {
        return response.data;
      });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
};

const planetService = {
  getAll,
  getAllByUrl,
  getSingleByUrl,
};
export default planetService;
