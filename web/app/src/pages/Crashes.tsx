import React from 'react'
import AdminCrashes from './admin/AdminCrashes'

/* Crashes/Analytics page */
export default function Crashes({role}: {role: string,}) {
    // Return Necessary Component based on User role
    return (
        <div>
            {
                role === 'admin' ? <AdminCrashes /> : <div>Access Denied</div>
            }
        </div>
    )
}
