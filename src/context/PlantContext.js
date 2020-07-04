import { createContext } from 'react';

export const PlantContext = createContext({
    plants: [],
    getPlants: () => {},
    // plant: [],
    // getPlant: () => {},
    products: [],
    getProducts: () => {},
});