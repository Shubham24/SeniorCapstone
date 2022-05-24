import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import useStyles from '../../style/Style'


/* Info Card Componenet */
/* Take in a title for the card, and value for the card */
export default function InfoCard({ title, value }: { title: string, value: string }) {

    const classes = useStyles();
    return (
        <div>
            {/* Wrap the component in a card component */}
            <Card elevation={1} className={classes.card}>
                {/* Use title as the title */}
                <CardHeader title={title} color='textSecondary' />
                <CardContent>
                    {/* Put specified value here */}
                    <Typography variant="h3" color="primary" component="p">
                        {value}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
