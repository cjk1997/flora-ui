import React, { useState } from 'react';
import clsx from 'clsx';
import { layoutStyle } from '../styles/layout';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGift } from '@fortawesome/free-solid-svg-icons'

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
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={toggleDrawer} className={classes.chevron}>
                        {/* {theme.direction === 'rtl' ? <ChevronRightIcon style={{ fontSize: '35', color: 'black' }} /> : <ChevronLeftIcon style={{ fontSize: '35', color: 'black' }} />} */}
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
                <List style={{ width: '250' }}>
                    <ListItem button className={classes.listButtons}>
                        <FontAwesomeIcon icon={faUser} className={classes.itemIcon}/>
                        <Typography variant="h5">Profile</Typography>
                    </ListItem>
                    <ListItem button className={classes.listButtons}>
                        <FontAwesomeIcon icon={faGift} className={classes.itemIcon}/>
                        <Typography variant="h5">Your Jungle</Typography>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                {children}
            </main>
        </div>
    )
};