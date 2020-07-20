import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PlantContext } from '../context/PlantContext';
import { Layout } from '../config/Layout';
import { plantsStyle } from '../styles/plants';
import '../styles/plants.css';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import CloudIcon from '@material-ui/icons/Cloud';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { faThermometerThreeQuarters } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';

export const Plants = () => {
    const { plants, getPlants } = useContext(PlantContext);
    const { products, getProducts } = useContext(PlantContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editRedirect, setEditRedirect] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [deleteID, setDeleteID] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteFailure, setDeleteFailure] = useState(false);
    const [expanded, setExpanded] = useState(-1);
    const classes = plantsStyle();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleExpandClick = (index) => {
        setExpanded(expanded === index ? -1 : index)
    };

    const handleEdit = (plant) => {
        setBackdropOpen(true);
        localStorage.removeItem('plant');
        localStorage.setItem('plant', JSON.stringify({ plant }));
        setEditRedirect(true);
    };

    const handleDeleteModalClose = () => {
        setDialogOpen(false);
    };

    const handleDeleteModalOpen = (id) => {
        handleMenuClose();
        setDialogOpen(true);
        setDeleteID(id);
    };

    const handleDeleteSuccess = () => {
        setDeleteSuccess(true);
    };

    const handleDeleteFailure = () => {
        setDeleteFailure(true);
    };

    const handleDeleteSuccessClose = () => {
        setDeleteSuccess(false);
        setBackdropOpen(false);
        window.location.reload(false);
    };

    const handleDeleteFailureClose = () => {
        setDeleteFailure(false);
        setBackdropOpen(false);
    };

    const handleFavorite = (id, favorite) => {
        setBackdropOpen(true);

        const url = process.env.REACT_APP_PLANTS_URL;
        fetch(`${url}/${id}/${!Boolean(favorite)}`, {
            method : 'PATCH',
            headers : { 'Content-Type' : 'application/json' } })
            .then(response => response.json())
            .then(setBackdropOpen(false))
            .then(window.location.reload(false))
            .catch(err => err);
    };

    const handleDelete = () => {
        setDialogOpen(false);
        setBackdropOpen(true);
        setAnchorEl(null);

        const url = process.env.REACT_APP_PLANTS_URL;
        fetch(`${url}/${deleteID}`, {
            method: 'DELETE' })
            .then(response => {
                if (response.status === 200) {
                    handleDeleteSuccess();
                } else {
                    handleDeleteFailure();
                }})
            .then(setDeleteID(''))
            .catch(err => err);
    }

    const plantCardMap = plants.map((plant, index) => {
        const suggestedMap = plant.suggested.map((suggestedProduct) => {
            if (products.length > 0) {
                let suggestedItem = products.filter(function(product) {
                    return product._id == suggestedProduct;
                });

                return (
                    <div className={classes.product}>
                        <img src={`${suggestedItem[0].images[0]}`} style={{ height: '150px' }} />
                        <div className={classes.productName}>
                            <Typography variant="h6">
                                {suggestedItem[0].name}
                            </Typography>
                        </div>
                    </div>
                );
            };
        });

        return (
            <>
                <Card className={classes.card}>
                    <CardHeader 
                        avatar={
                            <Avatar className={classes.avatar} style={{ width: '70px', height: '70px', marginRight: '20px', backgroundColor: "#4caf50" }}>
                                <FontAwesomeIcon className={classes.seedling} icon={faSeedling} size="2x" />
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={handleMenuOpen} style={{ marginTop: '14px' }}>
                                <MoreVertIcon style={{ fontSize: '35px', color: '#000000' }} />
                            </IconButton> 
                        }
                        title={plant.name}
                        titleTypographyProps={{ variant: "h5" }}
                        subheader={plant.taxonomy}
                        subheaderTypographyProps={{ variant: "h6" }}
                        style={{ justifyContent: 'center' }}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        keepMounted
                        onClose={() => handleMenuClose()}
                    >
                        <MenuItem onClick={() => handleEdit(plant)} style={{ fontSize: '22px' }}>Edit</MenuItem>
                        <MenuItem onClick={() => handleDeleteModalOpen(plant._id)} style={{ fontSize: '22px' }}>Delete</MenuItem>
                    </Menu>
                    <CardMedia
                        className={classes.image}
                        image={`${plant.images[0]}`}
                        style={{ height: '800px' }}
                    />
                    <CardContent>
                        <Typography style={{ fontSize: '20px' }} color="textPrimary" component="p">
                            {plant.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={() => handleFavorite(plant._id, plant.favorite)}>
                            <FavoriteIcon style={{ color: plant.favorite === true ? '#f44336' : '#000000', '&:hover': {color: '#f44336'}, fontSize: '35px' }} />
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={() => handleExpandClick(index)}
                            aria-expanded={expanded === index}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon style={{ fontSize: '40px', color: '#000000' }} />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography className={classes.plantCardTitle} variant="h6">The 411:</Typography>
                            <div className={classes.light}>
                                <div className={classes.lightTitle}>
                                    <WbSunnyIcon className={classes.sun} />
                                    <Typography variant="h6">
                                        Light Requirements
                                    </Typography>
                                </div>
                                <Typography style={{ fontSize: '18px' }}>
                                    {plant.light}
                                </Typography>
                            </div>
                            <div className={classes.water}>
                                <div className={classes.waterTitle}>
                                    <FontAwesomeIcon className={classes.drop} icon={faTint} />
                                    <Typography variant="h6">
                                        Keeping it Hydrated
                                    </Typography>
                                </div>
                                <Typography style={{ fontSize: '18px' }}>
                                    {plant.water}
                                </Typography>
                            </div>
                            <div className={classes.humidity}>
                                <div className={classes.humidityTitle}>
                                    <CloudIcon className={classes.waterIcon} />
                                    <Typography variant="h6">
                                        Optimal Humidity
                                    </Typography>
                                </div>
                                <Typography style={{ fontSize: '18px' }}>
                                    {plant.humidity}
                                </Typography>
                            </div>
                            <div className={classes.temperature}>
                                <div className={classes.temperatureTitle}>
                                    <FontAwesomeIcon className={classes.thermometer} icon={faThermometerThreeQuarters} />
                                    <Typography variant="h6">
                                        Preferred Climate
                                    </Typography>
                                </div>
                                <Typography style={{ fontSize: '18px' }}>
                                    {plant.temperature}
                                </Typography>
                            </div>
                            <div className={classes.food}>
                                <div className={classes.foodTitle}>
                                    <RestaurantIcon className={classes.utensils} />
                                    <Typography variant="h6">
                                        Feeding your {plant.name}
                                    </Typography>
                                </div>
                                <Typography style={{ fontSize: '18px' }}>
                                    {plant.food}
                                </Typography>
                            </div>
                            <div className={classes.additional}>
                                <div className={classes.additionalTitle}>
                                    <AddCircleIcon className={classes.addCircle} />
                                    <Typography variant="h6">
                                        Other Things to Note
                                    </Typography>
                                </div>
                                <Typography style={{ fontSize: '18px' }}>
                                    {plant.additional}
                                </Typography>
                            </div>
                            <div className={classes.suggestedProducts}>
                                <Typography variant="h5">These Might Help:</Typography>
                                <div className={classes.products}>
                                    {suggestedMap}
                                </div>
                            </div>
                        </CardContent>
                    </Collapse>
                </Card>
            </>
        );
    });

    return (
        <>
            <Layout>
                <div className={classes.plantsBody}>
                    <div className={classes.plantCards}>
                        {plantCardMap}
                    </div>
                </div>
                <Dialog className={classes.deleteDialog} open={dialogOpen} onClose={() => handleDeleteModalClose()}>
                    <DialogTitle>
                        Are you sure you want to delete this plant?
                    </DialogTitle>
                    <div className={classes.modalButtons}>
                        <Button className={classes.deleteButton} variant='contained' color='secondary' style={{ fontSize: '15px' }} onClick={() => handleDelete()}>
                            <DeleteForeverIcon />
                            Delete
                        </Button>
                        <Button className={classes.cancelButton} variant='outlined' color='secondary' style={{ fontSize: '15px' }} onClick={() => handleDeleteModalClose()}>
                            Cancel
                        </Button>
                    </div>
                </Dialog>
                <Backdrop className={classes.backdrop} open={backdropOpen} style={{ zIndex: '9999' }}>
                    <CircularProgress style={{ color: '#ffffff'}} size={60} thickness={4} />
                </Backdrop>
                <Snackbar open={deleteSuccess} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleDeleteSuccessClose} style={{ zIndex: '10000' }}>
                    <Alert onClose={handleDeleteSuccessClose} severity="success">
                        Successfully Deleted
                    </Alert>
                </Snackbar>
                <Snackbar open={deleteFailure} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleDeleteFailureClose} style={{ zIndex: '10000' }}>
                    <Alert onClose={handleDeleteFailureClose} severity="error" anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        Delete Failed
                    </Alert>
                </Snackbar>
                {editRedirect ? <Redirect to='/plant' /> : ''}
            </Layout>
        </>
    );
};