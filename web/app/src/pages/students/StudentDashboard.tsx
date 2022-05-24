import React from 'react'
import { Paper, List, ListItem, Grid, Typography, ListItemAvatar, Avatar, ListItemText, Divider, Card, CardContent, CardHeader, ListSubheader } from '@material-ui/core'
import useStyles from '../../style/Style';
import { withRouter, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dummyQueries from '../../data/dummy/DummyQueries';


/* Dashboard Page pertaining to a Student user*/
function StudentDashboard() {

    /** 
     * Function that handles taking the user to the correct course page when clicked on course link/button
     * @param data : data that will be used to push the path and send state information to the next component over
     */
    const handleClickCourse = (data: any) => () => {
        history.push(`courses/${data.id}`, { id: data.id, name: data.name, grade: data.grade, instructor: data.instructor });
    };

    /*
     * Function that handles taking the user to the correct assignment page when clicked on course link/button
     * @param data : data that will be used to push the path and send state information to the next component over
     */
    const handleClickAssignment = (data: any) => () => {
        history.push(`assignments/${data.id}`, { id: data.id, name: data.name });
    };

    // get useHistory() from 'react-router-dom'
    const history = useHistory();

    // get styling info from useStyles();
    const classes = useStyles();

    // get user info from Redux Store
    const user = useSelector((state: any) => state.userReducer);

    // get course information
    const activeCourses = dummyQueries.getStudentsActiveCourses(user.id);
    const pastDue = dummyQueries.getStudentPastDueAssignments(user.id);
    const todoList = dummyQueries.getStudentUpcomingAssignments(user.id);

    /**
     * @returns List of all courses that a User is currently enrolled in
     */
    const createCoursesList = () => {
        return activeCourses.map(course => {
            const instructor = dummyQueries.getUser(course.instructor);
            return (
                <div>
                    <ListItem button onClick={handleClickCourse(course)}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                {dummyQueries.getStudentGrade(user.id, course.id)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={course.name} secondary={instructor.firstName + ' ' + instructor.lastName} />
                    </ListItem>
                    <Divider />
                </div>
            );
        });
    }

    /**
     * @returns A list of assignments that the user still needs to submit and the due date has not passed
     */
    const createToDoList = () => {
        return todoList.map(todo => {
            const assignment = dummyQueries.getAssignment((todo as number));
            const course = dummyQueries.getCourse(assignment.course_id);
            return (
                <div>
                    <ListItem button onClick={handleClickAssignment(assignment)}>
                        <ListItemText primary={assignment.name} secondary={course.name} />
                        <ListSubheader>
                            Due: {assignment.dueDate.toDateString()}
                        </ListSubheader>
                    </ListItem>
                    <Divider />
                </div>
            );
        });
    }

    /**
     * Helper method that helps create list content for createPastDueContent()
     * @returns ListItems for each past due assignment
     */
    const createPastDueList = () => {
        return pastDue.map(a => {
            const assignment = dummyQueries.getAssignment(a);
            const course = dummyQueries.getCourse(assignment.course_id);
            return (
                <div>
                    <ListItem button onClick={handleClickAssignment(assignment)}>
                        <ListItemText primary={assignment.name} secondary={course.name} />
                        <ListSubheader>
                            Due: {assignment.dueDate.toDateString()}
                        </ListSubheader>
                    </ListItem>
                    <Divider />
                </div>
            );
        });
    }


    /**
     * @returns A list of assignments that the user still needs to submit, but the due date has passed, if the user has any such assignments
     */
    const createPastDueContent = () => {
        if (pastDue.length > 0) {
            return (
                <div>
                    <Card>
                        <CardHeader title="Past Due Assignments" />
                        <CardContent>
                            <List>
                                {createPastDueList()}
                            </List>
                        </CardContent>
                    </Card>

                </div>
            );
        }
    }

    // front end content
    return (
        <div>
            <Typography variant="h4">Hello {user.firstName}</Typography>


            <Grid container spacing={3}>

                <Grid item xs={12}> </Grid>
                <Grid item xs={12}> </Grid>
                <Grid item xs={12} md={8}>
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
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader title="To do" />
                        <CardContent>
                            <Paper elevation={0} style={{ maxHeight: 500, overflow: 'auto' }}>
                                <List>
                                    {createToDoList()}
                                </List>
                            </Paper>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    {createPastDueContent()}
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(StudentDashboard)

