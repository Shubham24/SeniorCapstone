
import { makeStyles } from '@material-ui/core'

// define drawerWidth
const drawerWidth = 240;

// Style definitions used across the app
const useStyles = makeStyles(theme => ({
    
    root: { 
        display: 'flex'
    },  

    toolbar: theme.mixins.toolbar,
    
    appBar: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        marginLeft: drawerWidth,
        
      },

    hamburger: {
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },

        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },

    title: {
        padding: theme.spacing(2)
    },

    drawer: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    
        [theme.breakpoints.up('md')]: {
            display: 'block',
            width: drawerWidth
        },
    },
    
    drawerMobile: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex'
        },
    
        [theme.breakpoints.up('md')]: {
            display: 'none',
            width: drawerWidth
        },
    },

    drawerPaper: {
        width: drawerWidth,
    },

    page: {
        width: '100%',
        padding: theme.spacing(3)
    },

    active: {
        backgroundColor: '#e0e0e0'
    },

    card: {
        width: '100%',
    },

    avatar: {
        backgroundColor: '#66BB6A',
    },

    gradeProgressBarText: {
        fontSize: 36,
    },

    topBarContent: {
        flexGrow: 1,
    },

    logoutButtonText: {
        color: '#ffffff'
    }
}));

export default useStyles;
