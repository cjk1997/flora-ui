import { createContext } from 'react';

export const PlantContext = createContext({
    plants: [],
    getPlants: () => {},
    products: [],
    getProducts: () => {},
});