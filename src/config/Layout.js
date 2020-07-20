import React, { useState } from 'react';
import clsx from 'clsx';
import { layoutStyle } from '../styles/layout';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Backdrop from '@material-ui/core/Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'

export const Layout = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const classes = layoutStyle();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" 
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawerOpen,})}
            >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" size="medium"  className={clsx(classes.menuButton, drawerOpen && classes.hide)} onClick={toggleDrawer}>
                        <MenuIcon className={classes.menuButton} style={{ fontSize: '40px' }} />
                    </IconButton>
                    <Typography variant="h5">
                        Urban Jungle
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" variant="persistent" className={clsx(classes.drawer, {
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen,
                })} open={drawerOpen}
                classes={{paper: clsx({[classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen,
                }),}}
                style={{ zIndex: '10000'}}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={toggleDrawer} className={classes.chevron}>
                        <ChevronLeftIcon style={{ fontSize: '35', color: '#000000' }} />
                    </IconButton>
                </div>
                <Divider />
                <List style={{ width: '250' }}>
                    <ListItem button className={classes.listButtons}>
                        <FontAwesomeIcon icon={faSeedling} className={classes.itemIcon}/>
                        <Typography variant="h5">Plants</Typography>
                    </ListItem>
                    <ListItem button className={classes.listButtons}>
                        <FontAwesomeIcon icon={faShoppingBasket} className={classes.itemIcon}/>
                        <Typography variant="h5">Products</Typography>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <Backdrop className={classes.backdrop} open={drawerOpen} style={{ zIndex: '9999' }} />
            <main className={classes.content}>
                {children}
            </main>
        </div>
    )
};