const users: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    city: string;
    state: string;
    lastActive: Date;
    dateRegistered: Date;
}[] = require('./users.json');

const courses: {
    id: number;
    name: string;
    description: string;
    instructor: number;
    students: number[];
    status: string;
    endDate: Date;
    startDate: Date;
}[] = require('./courses.json');

const assignments: {
    id: number;
    name: string;
    course_id: number;
    dueDate: Date;
    pointsPossible: number;
}[] = require('./assignments.json');

const submissions: {
    id: number;
    assignment_id: number;
    student_id: number;
    grade: number;
    submitDate: Date;
}[] = require('./submissions.json');

const crashes: {
    id: number;
    name: string;
    fatal: boolean;
    platform: string;
    date: Date;
}[] = require('./crashes.json');

const activity: {
    id: number;
    user_id: number;
    date: Date;
}[] = require('./activity.json');

const dummyData2 = {
    users,
    courses,
    assignments,
    submissions,
    crashes,
    activity
}

export default dummyData2;