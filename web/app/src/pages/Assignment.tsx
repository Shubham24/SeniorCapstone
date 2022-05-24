import React from 'react'
import { useSelector } from 'react-redux'
import StudentAssignment from './students/StudentAssignment'


/* Assignment Page */
export default function Assignment() {

    // get user role from Redux store
    const role = useSelector((state: any) => state.userReducer.role)

    // Return necessary component based on user role
    return (
        <div>
            {
                role === 'student' ? <StudentAssignment /> : <div>Assignment</div>
            }
        </div>
    )
}
