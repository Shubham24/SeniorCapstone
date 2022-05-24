import React from 'react'
import { AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, IconButton, Button } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router';
import Pages from '../../pages/data/Pages';
import AdminPages from '../../pages/data/AdminPages';
import StudentPages from '../../pages/data/StudentPages';
import InstructorPages from '../../pages/data/InstructorPages';
import useStyles from '../../style/Style';


interface LocationInterface {
    name: string
}

export default function Topbar({ role }: { role: string }) {

    // get the right pages/content based on the user role
    const pages = role === 'admin' ? AdminPages :
        role === 'student' ? StudentPages :
            role === 'instructor' ? InstructorPages :
                Pages;

    // React hook to toggle drawer open/close state on mobile screen
    const [mobileOpen, setMobileOpen] = React.useState(false);


    // function that toggles state
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // use custom mui styles
    const classes = useStyles();


    // get location and history from react router
    const history = useHistory();
    const location = useLocation<LocationInterface>();

    const handleLogout = () => {
        history.push('/')
    }

    // stores the page name will be used to display the title for the topbar
    let pageName;

    // drawer content
    let drawerContent = (
        <div>
            <Typography variant="h5" className={classes.title}>Playfair</Typography>
            <List>
                {pages.map((page) => {

                    if (page.path === location.pathname) {
                        pageName = page.name
                    }

                    return (
                        <ListItem button key={page.name} onClick={() => { history.push(page.path); handleDrawerToggle(); }}>
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText primary={page.name}></ListItemText>
                        </ListItem>
                    )
                })}
            </List>
        </div>);

    if (pageName === undefined && location.state !== undefined) {

        pageName = location.state.name;

    }

    // App bar and (mobile side drawer)
    return (
        <div>

            {/* App Bar*/}
            <AppBar position="fixed" elevation={0} color='primary' className={classes.appBar}>
                <Toolbar>
                    <IconButton color='inherit' className={classes.hamburger} onClick={handleDrawerToggle}>
                        <Menu />
                    </IconButton>
                        <Typography variant="h6" component="div" className={classes.topBarContent}>
                            {pageName}
                        </Typography>
                        <Button onClick={handleLogout}>
                            <Typography className={classes.logoutButtonText} variant="body1" component="span">Logout</Typography>
                        </Button>
                </Toolbar>
            </AppBar>

            {/* Drawer for mobile view */}
            <Drawer
                variant='temporary' className={classes.drawerMobile} classes={{ paper: classes.drawerPaper }}
                open={mobileOpen} onClose={handleDrawerToggle}>

                {drawerContent}
            </Drawer>
        </div>
    )
}
