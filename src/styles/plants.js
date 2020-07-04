import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export const plantsStyle = makeStyles((theme) => ({
    plantsBody: {
        width: '1250px',
        marginTop: '100px',
        display: 'flex',
    },
    plantCards: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'space-between',
    },
    card: {
        width: '50%',
        height: 'auto',
    },
    avatar: {
        width: '60px',
        height: '60px',
        color: '#ffffff',
    },
    seedling: {
        color: '#ffffff',
    },
    expand: {
        transform: 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(0deg)',
    },
    plantCardTitle: {
        paddingBottom: '15px',
    },
    light: {
        paddingBottom: '10px',
    },
    lightTitle: {
        display: 'flex',
        alignItems: 'center',
        color: '#ffc107',
    },
    sun: { 
        paddingRight: '15px',
    },
    water: {
        paddingBottom: '10px',
    },
    waterTitle: {
        display: 'flex',
        alignItems: 'center',
        color: '#2196f3',
    },
    drop: {
        paddingRight: '15px',
    },
    humidity: {
        paddingBottom: '10px',
    },
    humidityTitle: {
        display: 'flex',
        alignItems: 'center',
        color: '#00bcd4',
    },
    waterIcon: {
        paddingRight: '15px',
    },
    temperature: {
        paddingBottom: '10px',
    },
    temperatureTitle: {
        display: 'flex', 
        alignItems: 'center',
        color: '#f44336',
    },
    thermometer: {
        paddingRight: '15px',
    },
    food: {
        paddingBottom: '10px',
    },
    foodTitle: {
        display: 'flex',
        alignItems: 'center',
        color: '#ff9100',
    },
    utensils: {
        paddingRight: '15px',
    },
    additional: {
        paddingBottom: '10px',
    },
    additionalTitle: {
        display: 'flex',
        alignItems: 'center',
        color: '#4caf50',
    },
    addCircle: {
        paddingRight: '15px',
    },
    suggestedProducts: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '25px',
    },
    products: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '75px',
        paddingBottom: '75px',
        paddingLeft: '25px',
        paddingRight: '25px',
    },
    product: { 
        width: '25%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    productName: {
        paddingTop: '50px',
        textAlign: 'center',
    },
    modalButtons: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: '22px',
    },
    
}));