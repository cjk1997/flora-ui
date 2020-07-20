import React, { useContext, useState, useEffect } from 'react';
import { PlantContext } from '../context/PlantContext';
import { Layout } from '../config/Layout';
import { editPlantStyle } from '../styles/editPlant';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export const EditPlant = () => {
    const classes = editPlantStyle();
    const plant = JSON.parse(localStorage.getItem('plant')).plant;
    const {products, getProducts} = useContext(PlantContext);
    const [name, setName] = useState(plant.name);
    const [taxonomy, setTaxonomy] = useState(plant.taxonomy);
    const [description, setDescription] = useState(plant.description);
    const [light, setLight] = useState(plant.light);
    const [water, setWater] = useState(plant.water);
    const [humidity, setHumidity] = useState(plant.humidity);
    const [temperature, setTemperature] = useState(plant.temperature);
    const [food, setFood] = useState(plant.food);
    const [additional, setAdditional] = useState(plant.additional);
    const [favorite, setFavorite] = useState(plant.favorite);
    const [images, setImages] = useState(plant.images);
    const [suggested, setSuggested] = useState(plant.suggested);
    const [checkError, setCheckError] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCheck = (id) => {
        const suggestedCopy = Object.assign([], suggested);
        if (suggestedCopy.indexOf(id) === -1) {
            suggestedCopy.push(id);
        } else {
            suggestedCopy.splice((suggestedCopy.indexOf(id)), 1);
        };
        if (suggestedCopy.length > 3) {
            setCheckError(true);
        } else if (suggestedCopy.length <= 3) {
            setCheckError(false);
        };
        console.log("suggestedCopy after handleCheck", suggestedCopy)
        setSuggested(suggestedCopy);
    };

    const productMap = products.map((product) => {
        let checked = false;

        for (let i = 0; i < suggested.length; i++) {
            if (product._id === suggested[i]) {
                checked = true;
            };
        };

        return (
            <div className={classes.product}>
                <img src={`${product.images[0]}`} style={{ height: '400px' }} />
                <div className={classes.productName}>
                    <FormControlLabel
                        control={<Checkbox checked={checked} onChange={() => handleCheck(product._id)} name={product._id} />}
                        label={product.name}
                    />
                </div>
            </div>
        );
    });

    const handleCancel = () => {
        localStorage.removeItem('plant');
        window.location.reload(false);
    };

    const handleSubmit = (id) => {
        setOpen(true);
        const url = process.env.REACT_APP_PLANTS_URL;
        fetch((`${url}/${id}`), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ name, taxonomy, description, light, water, humidity, temperature, food, additional, favorite, images, suggested }) })
            .then(response => {
                response.json();
                localStorage.removeItem('plant');
                window.location.reload(false);
                setOpen(false);
            })
            .catch(err => err);
    };

    return (
        <>
            <Layout>
                <div className={classes.plantInfo}>
                    <div className={classes.editTitle}>
                        <Typography variant="h2" style={{ fontWeight: '400' }}>Edit Plant</Typography>
                    </div>
                    <div className={classes.editInfo}>
                        <div className={classes.plantImage}>
                            <img src={`${plant.images[0]}`} className={classes.plantPic} />
                            <div className={classes.plantTitle}>
                                <Typography variant="h3" style={{ fontWeight: '300' }}>{name}</Typography>
                            </div>
                        </div>
                        <div className={classes.plantForm}>
                            <TextField
                                id="outlined-full-width"
                                label="Name"
                                value={name}
                                onChange={({ target }) => setName(target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Classification"
                                style={{ marginTop: '20px' }}
                                value={taxonomy}
                                onChange={({ target }) => setTaxonomy(target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Description"
                                style={{ marginTop: '20px' }}
                                value={description}
                                onChange={({ target }) => setDescription(target.value)}
                                fullWidth
                                multiline
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Light Requirements"
                                style={{ marginTop: '20px' }}
                                value={light}
                                onChange={({ target }) => setLight(target.value)}
                                fullWidth
                                multiline
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Water Requirements"
                                style={{ marginTop: '20px' }}
                                value={water}
                                onChange={({ target }) => setWater(target.value)}
                                fullWidth
                                multiline
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Optimal Humidity"
                                style={{ marginTop: '20px' }}
                                value={humidity}
                                onChange={({ target }) => setHumidity(target.value)}
                                fullWidth
                                multiline
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Preferred Climate"
                                style={{ marginTop: '20px' }}
                                value={temperature}
                                onChange={({ target }) => setTemperature(target.value)}
                                fullWidth
                                multiline
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Fertilizing Instructions"
                                style={{ marginTop: '20px' }}
                                value={food}
                                onChange={({ target }) => setFood(target.value)}
                                fullWidth
                                multiline
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Additional Notes"
                                style={{ marginTop: '20px' }}
                                value={additional}
                                onChange={({ target }) => setAdditional(target.value)}
                                fullWidth
                                multiline
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className={classes.products}>
                        <div className={classes.productSelectTitle}>
                            <Typography variant="h4">Select Suggested Items:</Typography>
                        </div>
                        <FormControl required error={checkError} component="fieldset" className={classes.formControl}>
                            <FormLabel className={classes.checkHelperText} component="legend">Pick Three</FormLabel>
                            <FormGroup className={classes.productRows}>
                                {productMap}
                            </FormGroup>
                        </FormControl>
                    </div>
                    <div className={classes.submit}>
                        <div className={classes.submitButton}>
                            <Button variant="contained" color="primary" style={{ fontSize: '20px' }} nClick={() => {handleSubmit(plant._id)}}>
                                Save Changes
                            </Button>
                        </div>
                        <div className={classes.cencelButton}>
                            <Button variant="outlined" color="primary" style={{ fontSize: '20px' }} onClick={() => {handleCancel()}}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress style={{ color: '#ffffff'}} size={60} thickness={4} />
            </Backdrop>
            {!localStorage.getItem('plant') ? <Redirect to='/' /> : ''}
        </>
    );
};