import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Topbar from '../topbar/Topbar'
import useStyles from '../../style/Style';


// layout component
export default function Layout({ children, role }: { children: any, role: string }) {

    // get custom styles
    const classes = useStyles();

    return (
        <div className={classes.root}>

            {/* Desktop/Tablet Sidebar */}
            <Sidebar role={role} />

            {/* Topbar */}
            <Topbar role={role} />

            {/* main content */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}


