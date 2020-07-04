import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 350;

export const layoutStyle = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: `auto`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    appbar: {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        fontSize: 'large',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: '0',
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        height: '100%',
    },
    drawerOpen: {
        width: drawerWidth,
        height: '100%',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    listButtons: {
        color: '#000000',
        '&:hover': {
            color: '#4caf50',
        },
    },
    itemIcon: {
        paddingRight: '30px',
        fontSize: '25px',
    },
    content: {
        flexGrow: 1,
        width: '100vw',
        height: 'auto',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
    },
}));