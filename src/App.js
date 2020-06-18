import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { PlantContext } from './context/PlantContext';
import { Plants } from './pages/Plants';

function App() {
  const { Provider } = PlantContext;
  const [plants, setPlants] = useState([]);
  const [products, setProducts] = useState([]);

  const getPlants = () => {
    const url = process.env.REACT_APP_PLANTS_URL;
    fetch(`${url}`)
      .then(response => response.json())
      .then(data => setPlants(data))
      .catch(err => err);
  };

  const getProducts = () => {
    const url = process.env.REACT_APP_PRODUCTS_URL;
    fetch(`${url}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(err => err);
  };

  useEffect(() => {getPlants(); getProducts()}, []);

  return (
    <Provider value={{ plants, getPlants, products, getProducts }}>
      <Router>
        <Switch>
          <Route exact path='/' component={Plants} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
