import React from 'react'
import { Drawer, Typography, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom';
import Pages from '../../pages/data/Pages';
import AdminPages from '../../pages/data/AdminPages';
import StudentPages from '../../pages/data/StudentPages';
import InstructorPages from '../../pages/data/InstructorPages';
import useStyles from '../../style/Style';

// Sidebar component
export default function Sidebar({ role }: { role: string }) {

    // pages
    let pages: any;

    // Get the correct pages/content based on user role
    role === 'admin' ? pages = AdminPages :
        role === 'student' ? pages = StudentPages :
            role === 'instructor' ? pages = InstructorPages :
                pages = Pages;

    // custom drawer styles
    const classes = useStyles();

    // get current path
    const history = useHistory();
    const location = useLocation();

    // drawer content
    let drawerContent = (
        <div>
            <Typography variant="h5" className={classes.title}>Playfair</Typography>

            {/* List each page item from pages */}
            <List>
                {
                    pages.map((page: any) => (

                        /* In the side bar, color the page differently, active class, if we are on that page*/
                        <ListItem
                            button
                            key={page.name}
                            onClick={() => history.push(page.path)}
                            className={location.pathname === page.path ? classes.active : ''}
                        >
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText primary={page.name}></ListItemText>
                        </ListItem>
                    ))}
            </List>
        </div>);

    // return drawer component
    return (
        <div>
            <Drawer variant='permanent' className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                {drawerContent}
            </Drawer>
        </div>
    )
}
