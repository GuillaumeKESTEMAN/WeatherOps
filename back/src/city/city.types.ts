export type TCity = { id: string; label: string; lat: string; lon: string };

export type TAdresse = {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    label: string;
    score: number;
    id: string;
    banId: string;
    type: string;
    name: string;
    postcode: string;
    citycode: string;
    x: number;
    y: number;
    population: number;
    city: string;
    context: string;
    importance: number;
    municipality: string;
    _type: string;
  };
};

export type TAdressesResponse = {
  type: string;
  features: TAdresse[];
};
