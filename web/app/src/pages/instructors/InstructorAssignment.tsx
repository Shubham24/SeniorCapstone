import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import Layout from '../../components/layout/Layout';
import { Link, Breadcrumbs, Container, Grid, Card, CardContent, CardHeader } from '@material-ui/core'
import { GridColDef } from '@mui/x-data-grid';
import dummyQueries from '../../data/dummy/DummyQueries';
import InfoCard from '../../components/infocard/InfoCard';
import BarChartCard from '../../components/barchartcard/BarChartCard';
import DataGridCard from '../../components/datagridcard/DataGridCard';
import CircularProgressWithLabel from '../../components/circularprogresswithlabel/CircularProgressWithLabel';

export default function InstructorAssignment() {
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
    const averageAssignmentGrade = dummyQueries.getAverageAssignmentGrade(assignment_id);
    const maxAssignmentGrade = dummyQueries.getAssignmentMaxGrade(assignment_id);
    const minAssignmentGrade = dummyQueries.getAssignmentMinGrade(assignment_id);
    const assignmentGradeDistribution = dummyQueries.getAssignmentGradeDistribution(assignment_id);
    const numberOfSubmissions = dummyQueries.getAssignmentSubmissions(assignment_id).length;
    const submissionData = dummyQueries.getAssignmentSubmissionData(assignment_id);

    // state to get progress (for circular progress bar with label component)
    const [progress, setProgress] = React.useState(0);

    // animate loading the progress bar
    useEffect(() => {
        setTimeout(() => {
            setProgress(averageAssignmentGrade as number);
        }, 10);
    });

    // axis definitons for bar char
    const bar_axis = {
        xaxis: {
            dataKey: 'name'
        }
    }

    const bar = {
        dataKey: 'value',
        fill: "#8884d8"
    }

    // columns defintions for data grid
    const submissionColDef: GridColDef[] = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'studentName', headerName: 'Name', minWidth: 150,flex: 1 },
        { field: 'grade', headerName: 'Grade', type: 'number', minWidth: 150, flex: 1 },
        { field: 'pointsEarned', headerName: 'Points Earned', type: 'number', minWidth: 150, flex: 1 },
        { field: 'submitDate', headerName: 'Submit Date', type: 'date', minWidth: 150, flex: 1 },
    ];

    // content to display when there are submissions v.s. no submission
    const withSubmissions = () => {
        if (numberOfSubmissions > 0) {
            return (
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title="Average Grade" color='secondary' />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <CircularProgressWithLabel size={250} variant="determinate" value={progress} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6}>
                                                    <InfoCard title='Max' value={maxAssignmentGrade.toString()}></InfoCard> :
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <InfoCard title='Min' value={minAssignmentGrade.toString()}></InfoCard> :
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InfoCard title='Points Possible' value={assignment.pointsPossible.toString()}></InfoCard>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <BarChartCard title='Grade Distribution' data={assignmentGradeDistribution} axis={bar_axis} bar={bar}></BarChartCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InfoCard title='Date Due' value={assignment.dueDate.toDateString()}></InfoCard>
                                </Grid>
                                <Grid item xs={12}>
                                    <InfoCard title='Number of Submissions' value={numberOfSubmissions.toString()}></InfoCard>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <DataGridCard title='Submissions' rows={submissionData} columns={submissionColDef}></DataGridCard>
                        </Grid>
                    </Grid>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InfoCard title='Number of Submissions' value={numberOfSubmissions.toString()}></InfoCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoCard title='Date Due' value={assignment.dueDate.toDateString()}></InfoCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoCard title='Number of Submissions' value={numberOfSubmissions.toString()}></InfoCard>
                        </Grid>
                    </Grid>
                </Container>
            );
        }
    }


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


    // front end content
    return (
        <div>
            <Layout role={user.role}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                {withSubmissions()}
            </Layout>
        </div>
    )
}
