import dummyData from "./DummyDB";

// get data from dummy database
const data = dummyData;

/**
 * @returns All Users
 */
const getAllUsers = () => {
    return data.users;
}

/**
 * @returns All Courses
 */
const getAllCourses = () => {
    return data.courses;
}

/**
 * @returns All Assignments
 */
const getAllAssignments = () => {
    return data.assignments;
}

const getAllCrashes = () => {
    return data.crashes;
}

const getAllActiveCourses = () => {
    const courses = data.courses.filter(course => course.status === "active");
    return courses;
}

const getAllCompletedCourses = () => {
    const courses = data.courses.filter(course => course.status === "done");
    return courses;
}

/**
 * Get a user based on their ID
 * @param userId : The User ID that will be used to fetch the user
 * @returns : User
 */
const getUser = (userId: number) => {
    return data.users[userId - 1];
}

/**
 * Get a course based on its ID
 * @param courseId : The Course ID that will be used to fetch the course
 * @returns : Course
 */
const getCourse = (courseId: number) => {
    return data.courses[courseId - 1];
}

/**
 * Get an assignment based on its ID
 * @param assignmentId : The Assignment ID that will be used to fetch the assignment
 * @returns : Assignment
 */
const getAssignment = (assignmentId: number) => {
    return data.assignments[assignmentId - 1];
}


const getCrash = (crashId: number) => {
    return data.crashes[crashId - 1];
}

const getAllFatalCrashes = () => {
    return data.crashes.filter(crash => crash.fatal === true);
}

/**
 * Get all courses that a user is taking or has taken in the past
 * @param userId : The user's id
 * @returns : All courses that a user is taking or has taken in the past
 */
const getStudentsCourses = (userId: number) => {
    return data.courses.filter(course => course.students.includes(userId));
}

/**
 * Get all courses thata user is currently taking
 * @param userId : The user's id
 * @returns : All courses that a user is currently taking
 */
const getStudentsActiveCourses = (userId: number) => {
    return data.courses.filter(course => course.students.includes(userId) && course.status === "active");
}

/**
 * Get a course's instructor
 * @param courseId : The course id
 * @returns : The Instructor Object that is teaching the course 
 */
const getCourseIntructor = (courseId: number) => {
    return data.users.find(user => user.id === data.courses[courseId - 1].instructor)
}

/**
 * Get all submissions from a user
 * @param userId : The User's id
 * @returns : All submissions that a user has made
 */
const getStudentSubmissions = (userId: number) => {
    return data.submissions.filter(submission => submission.student_id === userId);
}

/**
 * Get submission from a user from a particular assignment
 * @param userId : The user's ID
 * @param assignmentId : The assignment's ID
 * @returns : Submission pertaining to the given user and assignment
 */
const getStudentSubmission = (userId: number, assignmentId: number) => {
    const submission = data.submissions.find(submission => submission.student_id === userId && submission.assignment_id === assignmentId);
    return submission;
}

/**
 * Get a student's grade on a particular course
 * @param userId : User's ID
 * @param courseId : Course's ID
 * @returns : calculate grade, will return 100 if no grades have been given
 */
const getStudentGrade = (userId: number, courseId: number) => {
    const courseAssignments = data.assignments.map(assignment => {
        if (assignment.course_id === courseId) { return assignment.id }
        else {
            return undefined;
        }
    }).filter(assignment => assignment !== undefined);
    const studentSubmissions = data.submissions.filter(submission => submission.student_id === userId && courseAssignments.includes(submission.assignment_id));
    let totalPointsPossible = 0;
    studentSubmissions.forEach(submission => totalPointsPossible += data.assignments[submission.assignment_id - 1].pointsPossible);
    let totalPointsEarned = 0;
    studentSubmissions.forEach(submission => totalPointsEarned += submission.grade);
    let grade = Math.round((totalPointsEarned / totalPointsPossible) * 100);
    return isNaN(grade) ? 100 : grade;
}

/**
 * Get all of the assignments that have not been made by the student
 * @param userId : The User's ID
 * @returns all of the assignments that have not been made by the student
 */
const getStudentUnSubmittedAssignments = (userId: number) => {
    const courses = getStudentsActiveCourses(userId);
    const courses_ids = courses.map(course => course.id);
    const assignments = data.assignments.map(assignment => {
        if (courses_ids.includes(assignment.course_id)) { return assignment.id }
        else {
            return undefined;
        }
    }).filter(assignment => assignment !== undefined);
    const submissions = getStudentSubmissions(userId);
    const submissions_assignment_ids = submissions.map(submission => submission.assignment_id);
    const unsubmitted = assignments.filter(assignment => !submissions_assignment_ids.includes(assignment as number));

    return unsubmitted;
}

/**
 * Get all of the assignments that have not been submitted but are past the due date (and have not been graded as 0pts)
 * @param userId : The User's ID
 * @returns all of the assignments that have not been submitted but are past the due date (and have not been graded as 0pts)
 */
const getStudentPastDueAssignments = (userId: number) => {
    const assignments = getStudentUnSubmittedAssignments(userId);
    const pastDue: number[] = [];
    assignments.forEach(assignment => { if (data.assignments[(assignment as number) - 1].dueDate < new Date()) { pastDue.push(assignment as number) } });
    return pastDue;
}

/**
 * Get all assignments that have not been submitted but a due date is upcoming
 * @param userId : User's ID
 * @returns all assignments that have not been submitted but a due date is upcoming
 */
const getStudentUpcomingAssignments = (userId: number) => {
    const assignments = getStudentUnSubmittedAssignments(userId);
    const pastDue = getStudentPastDueAssignments(userId);
    const upcoming = assignments.filter(assignment => !pastDue.includes(assignment as number));
    return upcoming;
}

/**
 * Get grade on a particular submission
 * @param submissionId : Submission's ID
 * @returns % grade
 */
const getAssignmentGrade = (submissionId: number) => {
    const pointsEarned = data.submissions[submissionId - 1].grade;
    const pointsPossible = data.assignments[data.submissions[submissionId - 1].assignment_id - 1].pointsPossible;
    return Math.round((pointsEarned / pointsPossible) * 100);
}

/**
 * Get the average grade on a particular assignment
 * @param assignmentId : Assignment's ID
 * @returns average grade
 */
const getAssignmentAverageGrade = (assignmentId: number) => {
    const submissions = data.submissions.filter(submission => submission.assignment_id === assignmentId);
    const grades = submissions.map(submission => submission.grade);
    let total = 0;
    grades.forEach(grade => total += grade);
    return Math.round((total / grades.length));
}

/**
 * Get the highest grade given on a particular assignment
 * @param assignmentId : Assignment's ID
 * @returns max grade
 */
const getAssignmentMaxGrade = (assignmentId: number) => {
    const submissions = data.submissions.filter(submission => submission.assignment_id === assignmentId);
    const grades = submissions.map(submission => submission.grade);
    return Math.max(...grades);
}

/**
 * Get the lowest grade given on a particular assignment
 * @param assignmentId : Assignment's ID
 * @returns min grade
 */
const getAssignmentMinGrade = (assignmentId: number) => {
    const submissions = data.submissions.filter(submission => submission.assignment_id === assignmentId);
    const grades = submissions.map(submission => submission.grade);
    return Math.min(...grades);
}

/**
 * Get all of the assignments pertaining to a student and the course they are taking
 * @param userId : The User's ID
 * @param courseId : The Course's ID
 * @returns an object containing the assignment's: 
 * {
 *      id: number,
 *      name: string,
 *      pointsPossible: number,
 *      pointsEarned: number,
 *      grade: number,
 *      dateSubmitted: Date,
 *      dueDateL Date
 * }
 */
const getStudentCourseAssignments = (userId: number, courseId: number) => {
    let assignments = data.assignments.filter(assignment => assignment.course_id === courseId);
    const assignment_ids = assignments.map(assignment => assignment.id);
    const submissions = data.submissions.filter(submission => submission.student_id === userId && assignment_ids.includes(submission.assignment_id));
    const assignment_submission = assignments.map(assignment => {
        return {
            id: assignment.id,
            name: assignment.name,
            pointsPossible: assignment.pointsPossible,
            pointsEarned: (null as unknown as number),
            grade: (null as unknown as number),
            dateSubmitted: (null as unknown as Date),
            dueDate: assignment.dueDate,
        };
    });

    assignment_submission.forEach(assignment => {
        const submission = submissions.find(submission => submission.assignment_id === assignment.id);
        if (submission) {
            assignment.pointsEarned = submission.grade;
            assignment.dateSubmitted = submission.submitDate;
            assignment.grade = getAssignmentGrade(submission.id);
        }
    });

    return assignment_submission;
}

/**
 * Function that returns all of the submissions made by a student pertaining to a certain course
 * @param userId : The User's ID
 * @param courseId : The Course's ID
 * @returns all of the submissions made by a student pertaining to a certain course
 */
const getStudentCourseSubmissions = (userId: number, courseId: number) => {
    const assignments = data.assignments.filter(assignment => assignment.course_id === courseId);
    const assignment_ids = assignments.map(assignment => assignment.id);
    const submissions = data.submissions.filter(submission => submission.student_id === userId && assignment_ids.includes(submission.assignment_id));
    return submissions;
}

/**
 * Function that returns all of the late submissions made by a student pertaining to a certain course
 * @param userId : The User's ID
 * @param courseId : The Courses's ID
 * @returns all of the late submissions made by a student pertaining to a certain course
 */
const getStudentCourseLateSubmissions = (userId: number, courseId: number) => {
    const submissions = getStudentCourseSubmissions(userId, courseId).filter(submission => submission.submitDate > data.assignments[submission.assignment_id - 1].dueDate);
    return submissions;
}

/**
 * Returns a trend of the average grade of a student pertaining to a course
 * @param userId : The User's ID
 * @param courseId : The Course's ID
 * @returns [] of 
 * {
 *  date: Date,
 *  grade: number
 * }
 */
const getStudentCourseGradeTrend = (userId: number, courseId: number) => {
    const gradeTrend: { date: Date; grade: number; }[] = [];
    let pointsPossible = 0;
    let pointsEarned = 0;
    const submissions = getStudentCourseSubmissions(userId, courseId).sort(
        function (a, b) {
            return a.submitDate.getTime() - b.submitDate.getTime();
        }
    );
    submissions.forEach(submission => {
        pointsPossible += data.assignments[submission.assignment_id - 1].pointsPossible;
        pointsEarned += submission.grade;
        gradeTrend.push({
            "date": submission.submitDate,
            "grade": Math.round((pointsEarned / pointsPossible) * 100),
        });
    });

    if (submissions.length === 0) {
        gradeTrend.push({
            "date": data.courses[courseId - 1].startDate,
            "grade": 100,
        });

        gradeTrend.push({
            "date": new Date(),
            "grade": 100,
        });
    }

    return gradeTrend;
}

/**
 * Returns all of the courses that a instructor is currently teaching
 * @param userId : The Instructor's ID
 * @returns  all of the courses that a instructor is currently teaching
 */
const getInstructorActiveCourses = (userId: number) => {
    const courses = data.courses.filter(course => course.instructor === userId && course.status === "active");
    return courses;
}

/**
 * Returns all of the courses the instructor is teaching or has taught in the past
 * @param userId : The Instructor's ID
 * @returns all of the courses the instructor is teaching or has taught in the past
 */
const getInstructorCourses = (userId: number) => {
    const courses = data.courses.filter(course => course.instructor === userId);
    return courses;
}

/**
 * Returns the average grade of a course
 * @param courseId : The Course's ID
 * @returns the average grade of a course
 */
const getAverageCourseGrade = (courseId: number) => {
    const students = data.courses[courseId - 1].students;
    const numberOfStudents = students.length;
    let total = 0;

    students.forEach(student => {
        total += getStudentGrade(student, courseId);
    });

    return Math.round((total / numberOfStudents));
}

/**
 * Function that returns all of the assignments pertaining to a given course
 * @param courseId : The Course's ID
 * @returns all of the assignments pertaining to a given course
 */
const getCourseAssignments = (courseId: number) => {
    const assignments = data.assignments.filter(assignment => assignment.course_id === courseId);
    return assignments;
}

/**
 * Returns the course grade distribution of a particular course
 * @param courseId : The Course's ID
 * @returns [] of 
 * {
 *  {name: "A", value: number},
 *  {name: "B", value: number},
 *  {name: "C", value: number},
 *  {name: "D", value: number},
 *  {name: "E", value: number},
 * }
 */
const getCourseGradeDistribution = (courseId: number) => {
    const grades = {
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0,
        "E": 0,
    }

    const course = data.courses[courseId - 1];
    const students = course.students;
    students.forEach(student => {
        const grade = getStudentGrade(student, courseId);
        if (grade >= 90) {
            grades["A"]++;
        } else if (grade >= 80) {
            grades["B"]++;
        }
        else if (grade >= 70) {
            grades["C"]++;
        }
        else if (grade >= 60) {
            grades["D"]++;
        }
        else {
            grades["E"]++;
        }
    });

    const gradeDistribution = [
        { name: "A", value: grades["A"] },
        { name: "B", value: grades["B"] },
        { name: "C", value: grades["C"] },
        { name: "D", value: grades["D"] },
        { name: "E", value: grades["E"] },
    ];

    return gradeDistribution;
}

/**
 * A trend of the average grade of a course
 * @param courseId : The Course's ID
 * @returns [] of 
 * {
 *  date: Date,
 *  grade: number
 * } sorted by date, with the earliest date coming first
 */
const getCourseAverageGradeTrend = (courseId: number) => {
    const assignments = getCourseAssignments(courseId);
    const assignment_ids = assignments.map(assignment => assignment.id);
    const submissions = data.submissions.filter(submission => assignment_ids.includes(submission.assignment_id));

    let pointsEarned = 0;
    let pointsPossible = 0;

    let totalPointsEarned = 0;
    let totalPointsPossible = 0;

    const pointTrend: { date: Date; totalPointsEarned: number; totalPointsPossible: number; }[] = [];
    const averageGradeTrend: { date: Date; grade: number; }[] = [];

    submissions.forEach(submission => {
        pointsEarned = submission.grade;
        pointsPossible = data.assignments[submission.assignment_id - 1].pointsPossible;

        if (pointTrend.filter(point => point.date.toDateString() === submission.submitDate.toDateString()).length === 0) {
            pointTrend.push({
                date: submission.submitDate,
                totalPointsEarned: pointsEarned,
                totalPointsPossible: pointsPossible,
            });
        } else {
            const p = pointTrend.filter(point => point.date.toDateString() === submission.submitDate.toDateString())[0];
            p.totalPointsEarned += pointsEarned;
            p.totalPointsPossible += pointsPossible;

        }

        pointsEarned = 0;
        pointsPossible = 0;
    });

    pointTrend.sort((a, b) => a.date.getTime() - b.date.getTime());

    pointTrend.forEach(point => {
        totalPointsEarned += point.totalPointsEarned;
        totalPointsPossible += point.totalPointsPossible;
        averageGradeTrend.push({
            "date": point.date,
            "grade": Math.round((totalPointsEarned / totalPointsPossible) * 100),
        });
    });

    if (averageGradeTrend.length === 0) {
        averageGradeTrend.push({
            "date": data.courses[courseId - 1].startDate,
            "grade": 100,
        });

        averageGradeTrend.push({
            "date": new Date(),
            "grade": 100,
        });
    }

    return averageGradeTrend.sort(function (a, b) {
        return a.date.getTime() - b.date.getTime();
    });
}

/**
 * Function that returns the average grade on a particular assignment
 * @param assignmentId : The assignment's ID
 * @returns the average grade on a particular assignment
 */
const getAverageAssignmentGrade = (assignmentId: number) => {
    const submissions = data.submissions.filter(submission => submission.assignment_id === assignmentId);
    let pointsEarned = 0;
    let pointsPossible = data.assignments[assignmentId - 1].pointsPossible * submissions.length;
    submissions.forEach(submission => {
        pointsEarned += submission.grade;
    });

    const grade = Math.round((pointsEarned / pointsPossible) * 100);
    return isNaN(grade) ? null : grade;
}

/**
 * Function that returns the number of submissions on a particular assignment
 * @param assignmentId : The Assignment's ID
 * @returns the number of submissions on a particular assignment
 */
const getNumberOfAssignmentSubmissions = (assignmentId: number) => {
    const submissions = data.submissions.filter(submission => submission.assignment_id === assignmentId);
    return submissions.length;
}

/**
 * Returns all of the assignments of a course
 * @param courseId : The Course's ID
 * @returns [] of 
 * {
 *  id: number,
 *  name: string,
 *  averageGrade: number,
 *  pointsPossible: number,
 *  numberOfSubmissions: number,
 *  dueDate: Date
 * }
 */
const getCourseAssignmentData = (courseId: number) => {
    const assignments = getCourseAssignments(courseId);
    const data: any = [];

    assignments.forEach(assignment => {
        data.push({
            id: assignment.id,
            name: assignment.name,
            averageGrade: getAverageAssignmentGrade(assignment.id),
            pointsPossible: assignment.pointsPossible,
            numberOfSubmissions: getNumberOfAssignmentSubmissions(assignment.id),
            dueDate: assignment.dueDate,
        });
    });

    return data;
}

/**
 * Function that returns all of the students in a course
 * @param courseId : The Course's ID
 * @returns [] of 
 * {
 *  id: number,
 *  firstName: string,
 *  lastName: string,
 *  email: string,
 *  grade: number
 * }
 */
const getCourseStudentData = (courseId: number) => {
    const students = data.courses[courseId - 1].students;
    const studentData: any = [];

    students.forEach(student => {
        studentData.push({
            id: student,
            firstName: data.users[student - 1].firstName,
            lastName: data.users[student - 1].lastName,
            email: data.users[student - 1].email,
            grade: getStudentGrade(student, courseId),
        });
    });

    return studentData;
}

/**
 * Function that returns the grade distribution of an assignment
 * @param assignmentId : The assignment's ID
 * @returns [] of
 * {
 *  name: string (A | B | C | D | E),
 *  value: number
 * }
 */
const getAssignmentGradeDistribution = (assignmentId: number) => {
    const submissions = data.submissions.filter(submission => submission.assignment_id === assignmentId);
    const grades = {
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0,
        "E": 0,
    }

    submissions.forEach(submission => {

        const grade = Math.round(submission.grade / data.assignments[assignmentId - 1].pointsPossible * 100);

        if (grade >= 90) {
            grades["A"]++;
        } else if (grade >= 80) {
            grades["B"]++;
        }
        else if (grade >= 70) {
            grades["C"]++;
        }
        else if (grade >= 60) {
            grades["D"]++;
        }
        else {
            grades["E"]++;
        }
    });

    const gradeDistribution = [
        { "name": "A", "value": grades["A"] },
        { "name": "B", "value": grades["B"] },
        { "name": "C", "value": grades["C"] },
        { "name": "D", "value": grades["D"] },
        { "name": "E", "value": grades["E"] },
    ];

    return gradeDistribution;
}

/**
 * Function that returns all submissions made to an assignment
 * @param assignmentId : The assignment's ID
 * @returns all submissions made to an assignment
 */
const getAssignmentSubmissions = (assignmentId: number) => {
    const submissions = data.submissions.filter(submission => submission.assignment_id === assignmentId);
    return submissions;
}

/**
 * Function that returns data on all submissions pertaining to an assignment
 * @param assignmentId : The assignment's ID
 * @returns [] of 
 * {
 *  id: number,
 *  studentName: string,
 *  grade: number,
 *  pointsEarned: number,
 *  submitDate: Date
 * }
 */
const getAssignmentSubmissionData = (assignmentId: number) => {
    const submissions = getAssignmentSubmissions(assignmentId);
    const submissionData: any = [];
    submissions.forEach(submission => {
        submissionData.push({
            id: submission.id,
            studentName: data.users[submission.student_id - 1].firstName + " " + data.users[submission.student_id - 1].lastName,
            grade: Math.round(submission.grade / data.assignments[assignmentId - 1].pointsPossible * 100),
            pointsEarned: submission.grade,
            submitDate: submission.submitDate,
        });
    });

    return submissionData;
}

/**
 * Returns number of crashes by platform
 * @returns [] of 
 * {
 *  name: string (iOS | Android | Web),
 *  value: number
 * }
 */
const getCrashesByPlatformData = () => {
    const crashes = data.crashes;
    const crashesByPlatform: any = [
        { name: "iOS", value: 0 },
        { name: "Android", value: 0 },
        { name: "Web", value: 0 },
    ];

    crashes.forEach(crash => {
        if (crash.platform === "iOS") {
            crashesByPlatform.find((crash: { name: string; }) => crash.name === "iOS").value++;
        } else if (crash.platform === "Android") {
            crashesByPlatform.find((crash: { name: string; }) => crash.name === "Android").value++;
        } else {
            crashesByPlatform.find((crash: { name: string; }) => crash.name === "Web").value++;
        }
    });

    return crashesByPlatform;
}

/**
 * Returns number of courses and what status the course is in
 * @returns [] of 
 * {
 *  name: string (active | done | not started | in active)
 *  value: number
 * }
 */
const getCoursesStatusData = () => {
    const courses = data.courses;
    const coursesStatus: any = [
        { name: "active", value: 0 },
        { name: "done", value: 0 },
        { name: "not started", value: 0 },
        { name: "in active", value: 0 },
    ];

    courses.forEach(course => {
        if (course.status === "active") {
            coursesStatus.find((course: { name: string; }) => course.name === "active").value++;
        } else if (course.status === "done") {
            coursesStatus.find((course: { name: string; }) => course.name === "done").value++;
        } else if (course.status === "not started") {
            coursesStatus.find((course: { name: string; }) => course.name === "not started").value++;
        } else {
            coursesStatus.find((course: { name: string; }) => course.name === "in active").value++;
        }
    });

    return coursesStatus;
}

/**
 * Returns all course data
 * @returns [] of 
 * {
 *  id: number,
 *  instructor_id: number,
 *  course_name: string,
 *  instructor_name: string,
 *  numberOfStudents: number,
 *  status: string,
 *  startDate: Date,
 *  endDate: Date
 * }
 */
const getCoursesData = () => {
    const courses = data.courses;
    const coursesData: any = [];

    courses.forEach(course => {
        coursesData.push({
            id: course.id,
            instructor_id: course.instructor,
            course_name: course.name,
            instructor_name: data.users[course.instructor - 1].firstName + " " + data.users[course.instructor - 1].lastName,
            numberOfStudents: course.students.length,
            status: course.status,
            startDate: course.startDate,
            endDate: course.endDate
        });
    });

    return coursesData;
}

/**
 * Returns all users that have the admin role
 * @returns all users that have the admin role
 */
const getAllAdmins = () => {
    return data.users.filter(user => user.role === "admin");
}

/**
 * Returns all users that have the instructor role
 * @returns all users that have the instructor role
 */
const getAllInstructors = () => {
    return data.users.filter(user => user.role === "instructor");
}

/**
 * Returns all users that have the student role
 * @returns all users that have the student role
 */
const getAllStudents = () => {
    return data.users.filter(user => user.role === "student");
}

/**
 * Retruns the number of users based on role
 * @returns [] of 
 * {
 *  name: string (admin | instructor | student),
 *  value: number
 * }
 */
const getUserRoleData = () => {
    const userRoleData = [
        { name: "admin", value: getAllAdmins().length },
        { name: "instructor", value: getAllInstructors().length },
        { name: "student", value: getAllStudents().length },
    ]

    return userRoleData;
}

/**
 * Returns all user data
 * @returns [] of
 * {
 *  id: number, 
 *  name: string,
 *  role: string,
 *  lastActive: Date,
 *  dateRegistered: Date
 * }
 */
const getUserData = () => {
    const users = data.users;
    const userData: any = [];

    users.forEach(user => {
        userData.push({
            id: user.id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            role: user.role,
            lastActive: user.lastActive,
            dateRegistered: user.dateRegistered
        });
    });

    return userData;
}

/**
 * Returns a trend of crash data
 * @returns [] of
 * {
 *  date: Date,
 *  crashes: number
 *  fatal: number
 * }
 */
const getCrashTrend = () => {
    const crashes = data.crashes.slice().sort((a, b) => { return a.date.getTime() - b.date.getTime() });
    const crashTrend: any = [];
    crashes.forEach(crash => {
        let found = crashTrend.find((c: { date: Date; }) => c.date.getTime() === crash.date.getTime());
        if (found !== undefined) {
            found.crashes = found.crashes + 1;
            if (crash.fatal) {
                found.fatal = found.fatal + 1;
            }
        } else {
            crashTrend.push({
                "date": crash.date,
                "crashes": 1,
                "fatal": crash.fatal ? 1 : 0,
            });
        }
    });

    return crashTrend.slice().sort(function (a: { date: Date, crashes: number, fatal: number }, b: { date: Date, crashes: number, fatal: number }) {
        return a.date.getTime() - b.date.getTime();
    });
}

/**
 * Returns all crash data
 * @returns [] of 
 * {
 *  id: number,
 *  name: string,
 *  fatal: boolean,
 *  platform: string,
 *  date: Date
 * }
 */
const getCrashData = () => {
    const crashes = data.crashes;
    const crashData: any = [];

    crashes.forEach(crash => {
        crashData.push({
            id: crash.id,
            name: crash.name,
            fatal: crash.fatal,
            platform: crash.platform,
            date: crash.date
        });
    });

    return crashData.slice().sort((a: { date: { getTime: () => number; }; }, b: { date: { getTime: () => number; }; }) => { return a.date.getTime() - b.date.getTime() });
}

/**
 * Returns all location data
 * @returns [] of 
 * {
 *  id: number,
 *  city: string,
 *  state: string,
 *  numUsers: number
 * }
 */
const getLocationData = () => {
    const locations: any[] = [];
    let id = 1;
    data.users.forEach(user => {
        const found = locations.find(location => location.city === user.city && location.state === user.state);
        if (found === undefined) {
            locations.push({
                id: id,
                city: user.city,
                state: user.state,
                numUsers: 1
            });

            id++;
        } else {
            found.numUsers = found.numUsers + 1;
        }
    });

    return locations;
}

/**
 * Returns a trend of users numbers growing
 * @returns [] of 
 * {
 *  date: Date,
 *  numUsers: number
 * }
 */
const getUserTrend = () => {
    const users = data.users.slice().sort(
        function (a, b) {
            return a.dateRegistered.getTime() - b.dateRegistered.getTime();
        }
    );

    const userTrend: any = [];
    let numUsers = 1;
    users.forEach(user => {
        const date = user.dateRegistered;
        const found = userTrend.find((user: any) => user.date === date);
        if (found === undefined) {
            userTrend.push({
                "date": date,
                "numUsers": numUsers++
            });
        } else {
            found.numUsers += numUsers++;
        }
    });

    return userTrend;
}

/**
 * Returns a trend of the number of courses that are active/ongoing at a given time
 * @returns [] of
 * {
 *  date: Date,
 *  numCourses: number
 * }
 */
const getCourseTrend = () => {
    const courses = data.courses.slice().sort(
        function (a, b) {
            return a.startDate.getTime() - b.startDate.getTime();
        }
    );

    let numCourses: {date: Date, numCourses: number}[] = [];

    courses.forEach(course => {
        const date = course.startDate;
        const found = numCourses.find((course: any) => course.date.getTime() === date.getTime());
        if (found === undefined) {
            numCourses.push({
                "date": date,
                "numCourses": 1
            });
        } else {
            found.numCourses += 1;
        }
    });

    const coursesEndDate = data.courses.slice().sort(
        function (a, b) {
            return a.endDate.getTime() - b.endDate.getTime();
        }
    );

    coursesEndDate.forEach(course => {
        const date = course.endDate;
        const found = numCourses.find((course: any) => course.date.getTime() === date.getTime());
        if (found === undefined) {
            numCourses.push({
                "date": date,
                "numCourses": -1
            });
        } else {
            found.numCourses -= 1;
        }
    });

    numCourses.sort(
        function (a: any, b: any) {
            return a.date.getTime() - b.date.getTime();
        }
    );

    const courseTrend: any = [];

    let numCoursesTotal = 0;

    numCourses.forEach((course: any) => {

        numCoursesTotal += course.numCourses;

        courseTrend.push({
            "date": course.date,
            "numCourses": numCoursesTotal
        });
    });

    return courseTrend.filter((course: any) => course.date.getTime() <= new Date().getTime());
}

/**
 * Returns a trend of user activity over time
 * @returns [] of
 * {
 *  date: Date,
 *  numUsers: number
 * }
 */
const getUserActivityTrend = () => {
    const activity = data.activity.slice().sort(
        function (a, b) {
            return a.date.getTime() - b.date.getTime();
        }
    );

    const userActivityTrend: any = [];

    activity.forEach(user => {
        const date = user.date;
        const found = userActivityTrend.find((user: any) => user.date.getTime() === date.getTime());
        if (found === undefined) {
            userActivityTrend.push({
                "date": date,
                "numUsers": 1
            });
        } else {
            found.numUsers += 1;
        }
    });

    return userActivityTrend;
}

// all available queries
const dummyQueries = {
    getAllUsers,
    getAllCourses,
    getAllActiveCourses,
    getAllCompletedCourses,
    getAllAssignments,
    getAllCrashes,
    getAllFatalCrashes,
    getCrash,
    getUser,
    getCourse,
    getAssignment,
    getStudentsCourses,
    getStudentGrade,
    getStudentSubmission,
    getStudentSubmissions,
    getStudentsActiveCourses,
    getCourseIntructor,
    getStudentUnSubmittedAssignments,
    getStudentPastDueAssignments,
    getStudentUpcomingAssignments,
    getAssignmentGrade,
    getStudentCourseAssignments,
    getAssignmentAverageGrade,
    getAssignmentMaxGrade,
    getAssignmentMinGrade,
    getStudentCourseSubmissions,
    getStudentCourseLateSubmissions,
    getStudentCourseGradeTrend,
    getInstructorCourses,
    getInstructorActiveCourses,
    getAverageCourseGrade,
    getAverageAssignmentGrade,
    getCourseAssignments,
    getCourseGradeDistribution,
    getCourseAverageGradeTrend,
    getCourseAssignmentData,
    getCourseStudentData,
    getAssignmentGradeDistribution,
    getAssignmentSubmissions,
    getAssignmentSubmissionData,
    getCrashesByPlatformData,
    getCoursesStatusData,
    getCoursesData,
    getAllAdmins,
    getAllInstructors,
    getAllStudents,
    getUserRoleData,
    getUserData,
    getCrashTrend,
    getCrashData,
    getLocationData,
    getUserTrend,
    getCourseTrend,
    getUserActivityTrend
};

export default dummyQueries;