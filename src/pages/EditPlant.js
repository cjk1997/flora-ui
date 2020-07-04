import React, { useContext, useState, useEffect } from 'react';
import { PlantContext } from '../context/PlantContext';
import { Layout } from '../config/Layout';
import { editPlantStyle } from '../styles/editPlant';
import TextField from '@material-ui/core/TextField';
import { render } from '@testing-library/react';
import { Redirect } from 'react-router-dom';

export const EditPlant = () => {
    const classes = editPlantStyle();
    const [plant, setPlant] = useState({});

    const getPlant = () => {
        // if (localStorage.getItem('plant')) {
            const storedPlant = JSON.parse(localStorage.getItem('plant')).plant;
            console.log("storedPlant", storedPlant)
            setPlant(storedPlant);
        // };
    };

    useEffect(() => {if (localStorage.getItem('plant')) getPlant()}, []);

    // useEffect(() => {getPlant()}, [plant])











    return (
        <>
            <Layout>
                <div className={classes.plantInfo}>
                    <div className={classes.plantImage}>
                        {console.log('plant in localStorage', JSON.parse(localStorage.getItem('plant')).plant)}
                        {console.log("plant", plant)}
                        {/* <img src={`${plant.images[0]}`} className={classes.plantPic} /> */}
                        <img src={`${(JSON.parse(localStorage.getItem('plant')).plant).images[0]}`} />
                    </div>
                </div>
            </Layout>
            {!localStorage.getItem('plant') ? <Redirect to='/' /> : ''}
        </>
    );
};