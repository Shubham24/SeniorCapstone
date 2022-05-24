import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import Layout from '../../components/layout/Layout';
import { Link, Breadcrumbs, Container, Grid, Card, CardContent, CardHeader } from '@material-ui/core'
import dummyQueries from '../../data/dummy/DummyQueries';
import InfoCard from '../../components/infocard/InfoCard';
import CircularProgressWithLabel from '../../components/circularprogresswithlabel/CircularProgressWithLabel';

export default function StudentAssignment() {

    // get location and history from 'react-router-dom'
    const location = useLocation();
    const history = useHistory();

    // get user data from Redux Store
    const user = useSelector((state: any) => state.userReducer);

    // get assignment_id from the location path
    const assignment_id = parseInt(location.pathname.substring(location.pathname.lastIndexOf('/') + 1));

    // get assignment, course, submission info
    const assignment = dummyQueries.getAssignment(assignment_id);
    const course = dummyQueries.getCourse(assignment.course_id);
    const submission = dummyQueries.getStudentSubmission(user.id, assignment.id);

    // figure out if a submission was late or not
    const late = submission !== undefined ? submission.submitDate > assignment.dueDate : null;

    // progress state for circular progress bar with label
    const [progress, setProgress] = React.useState(0);

    // animate circular progress bar
    useEffect(() => {
        setTimeout(() => {
            if (submission !== undefined) {
                setProgress(dummyQueries.getAssignmentGrade(submission.id) as number);
            }
        }, 10);
    });


    /*
     * Function that handles taking the user to the correct course page when clicked on course link/button
     * @param data : data that will be used to push the path and send state information to the next component over
     */
    const handleClickCourse = (data: any) => () => {
        history.push(`/courses/${data.id}`, { id: data.id, name: data.name, grade: data.grade, instructor: data.instructor });
    };

    // create content for breadcrumbs 
    const breadcrumbs = [
        <Link underline="hover" key="1" onClick={handleClickCourse(course)}>{course.name}</Link>,
        <Link underline="hover" key="1" >{assignment.name}</Link>
    ];


    /*
     * Display the proper content depending on whether or not a submission for this assignment has been made
     * @returns the proper content depending on whether or not a submission for this assignment has been made
     */
    const content = () => {
        if (submission !== undefined) {
            return contentWithSubmission();
        } else {
            return contentWithoutSubmission();
        }

    }

    /*
     * @returns Content if a submission has been made by the student
     */
    const contentWithSubmission = () => {
        return (
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {
                            submission !== undefined ?
                                <Card>
                                    <CardHeader title="Grade" color='secondary' />
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <CircularProgressWithLabel size={250} variant="determinate" value={progress} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={6} lg={8}>
                                                        {
                                                            submission !== undefined ?
                                                                <InfoCard title='Average' value={dummyQueries.getAssignmentAverageGrade(assignment_id).toString()}></InfoCard> :
                                                                <div />
                                                        }
                                                    </Grid>
                                                    <Grid item xs={12} md={6} lg={4}>
                                                        {
                                                            submission !== undefined ?
                                                                <InfoCard title='Earned' value={submission.grade.toString()}></InfoCard> :
                                                                <div />
                                                        }
                                                    </Grid>
                                                    <Grid item xs={12} md={6} lg={4}>
                                                        {
                                                            submission !== undefined ?
                                                                <InfoCard title='Max' value={dummyQueries.getAssignmentMaxGrade(assignment_id).toString()}></InfoCard> :
                                                                <div />
                                                        }
                                                    </Grid>
                                                    <Grid item xs={12} md={6} lg={4}>
                                                        {
                                                            submission !== undefined ?
                                                                <InfoCard title='Min' value={dummyQueries.getAssignmentMinGrade(assignment_id).toString()}></InfoCard> :
                                                                <div />
                                                        }
                                                    </Grid>
                                                    <Grid item xs={12} md={12} lg={4}>
                                                        {
                                                            submission !== undefined ?
                                                                <InfoCard title='Total' value={assignment.pointsPossible.toString()}></InfoCard> :
                                                                <div />
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card> :
                                <div />
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        {
                            // if the submitted assignment is late, then include '(Late)' in the card title, otherwise don't
                            submission !== undefined ?
                                <InfoCard title={late ? 'Date Submitted (Late)' : 'Date Submitted'} value={submission.submitDate.toDateString()}></InfoCard> :
                                <div />
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        {
                            submission !== undefined ?
                                <InfoCard title='Date Due' value={assignment.dueDate.toDateString()}></InfoCard> :
                                <div />
                        }
                    </Grid>
                </Grid>
            </Container>
        );
    }

    /* 
     * @returns Content if a submission has not been made
     */
    const contentWithoutSubmission = () => {
        return (
            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} >
                        <InfoCard title='Date Due' value={assignment.dueDate.toDateString()}></InfoCard>
                    </Grid>

                    <Grid item xs={12}  >
                        <InfoCard title='Points Possible' value={assignment.pointsPossible.toString()} />
                    </Grid>
                </Grid>
            </Container>
        );
    }

    // front end content
    return (
        <div>
            <Layout role={user.role}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                {content()}
            </Layout>
        </div>
    )
}
