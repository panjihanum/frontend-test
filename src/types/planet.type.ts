export interface PlanetAttributes {
  name: string;
  rotation_period: string;
  orbital_period: number;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string;
  created: Date;
  edited: Date;
  url: string;
  addAt?: Date;
}

export interface PlanetResponse {
  count: number;
  next?: string;
  previous?: string;
  results: PlanetAttributes[];
}

export type PlanetsType = PlanetResponse | {};
