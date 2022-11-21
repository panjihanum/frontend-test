import { PlanetAttributes } from "../../../types/planet.type";

export interface BoxAttributes {
  data: PlanetAttributes;
  addDataShopping?: (x: PlanetAttributes) => void;
}
