import React from 'react'
import { CircularProgress, CircularProgressProps, Typography, Box } from '@material-ui/core'
import useStyles from '../../style/Style'


/**
 *  Component that displays a circular progress bar with a label in the middle of the circular progress bar
 * @param props Props for the component
 * @param value number to display in the center of the component
 */
export default function CircularProgressWithLabel(props: CircularProgressProps & { value: number },) {

    // get styling info
    const classes = useStyles();


    // return front end content
    return (

        <Box position="relative" display="inline-flex">
            <CircularProgress {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography className={classes.gradeProgressBarText} component="h1">
                    {`${props.value}%`}
                </Typography>
            </Box>
        </Box>
    )
}
