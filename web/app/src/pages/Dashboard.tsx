import React from 'react'
import AdminDashboard from './admin/AdminDashboard'
import InstructorDashboard from './instructors/InstructorDashboard'
import StudentDashboard from './students/StudentDashboard'


/* Dashboard Page */
export default function Dashboard({role}: {role: string,}) {
    // Return Necessary Component based on User role
    return (
        <div>
            
            {
            role === 'admin' ? <AdminDashboard /> : 
            role === 'instructor' ? <InstructorDashboard /> :
            role === 'student' ? <StudentDashboard /> :
            <div> sdjfklsjflk </div>
            }

        </div>
    )
}
