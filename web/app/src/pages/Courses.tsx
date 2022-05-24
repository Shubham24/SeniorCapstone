import React from 'react'
import AdminCourses from './admin/AdminCourses'
import StudentCourses from './students/StudentCourses'
import InstructorCourses from './instructors/InstructorCourses'



/* Courses Page */
export default function Courses({role}: {role: string,}) {
    // Return Necessary Component based on User role
    return (
        <div>
            
            {
            role === 'admin' ? <AdminCourses /> : 
            role === 'instructor' ? <InstructorCourses /> :
            role === 'student' ? <StudentCourses /> :
            <div>Courses</div>
            }
        </div>
    )
}
