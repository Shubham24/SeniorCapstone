import React from 'react'
import { useHistory } from 'react-router-dom'
import useStyles from '../../style/Style'
import { useSelector } from 'react-redux';
import { Typography, Grid, Card, CardHeader, CardContent, Paper, List, ListItem, ListItemAvatar, Avatar, Divider, ListItemText } from '@material-ui/core';
import InfoCard from '../../components/infocard/InfoCard';
import dummyQueries from '../../data/dummy/DummyQueries';

/* Dashboard Page pertaining to Instructor */
export default function InstructorDashboard() {


    /** 
     * Function that handles taking the user to the correct course page when clicked on course link/button
     * @param data : data that will be used to push the path and send state information to the next component over
     */
    const handleClickCourse = (data: any) => () => {
        history.push(`courses/${data.id}`, { id: data.id, name: data.name, grade: data.grade, instructor: data.instructor });
    };


    // get useHistory() from 'react-router-dom'
    const history = useHistory();

    // get styling info from useStyles();
    const classes = useStyles();

    // get user info from Redux Store
    const user = useSelector((state: any) => state.userReducer);

    // get data to display the page
    const activeCourses = dummyQueries.getInstructorActiveCourses(user.id)

    // store the number of current students
    let numberOfCurrentStudents = 0;

    // iterate and update courses to find total number of students
    activeCourses.forEach((course: any) => {
        numberOfCurrentStudents += course.students.length;
    });

    // creates a list of courses, then number of students, and the average grade for that class, that the instructor is currently teaching
    const createCoursesList = () => {
        return activeCourses.map(course => {
            return (
                <div>
                    <ListItem button onClick={handleClickCourse(course)}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                {dummyQueries.getAverageCourseGrade(course.id)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={course.name} secondary={'Number of Students: ' + course.students.length} />
                    </ListItem>
                    <Divider />
                </div>
            );
        });
    }

    // front end content
    return (
        <div>
            <Typography variant="h4">Hello {user.firstName}</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}> </Grid>
                <Grid item xs={12}> </Grid>
                <Grid item xs={6}>
                    <InfoCard title="Courses" value={activeCourses.length.toString()} />
                </Grid>
                <Grid item xs={6}>
                    <InfoCard title="Students" value={numberOfCurrentStudents.toString()} />
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Your Courses" />
                        <CardContent>
                            <Paper elevation={0} style={{ maxHeight: 500, overflow: 'auto' }}>
                                <List>
                                    {createCoursesList()}
                                </List>
                            </Paper>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
