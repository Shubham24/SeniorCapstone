import React from 'react'
import AdminLocation from './admin/AdminLocation'




/* Location Page */
export default function Location({ role }: { role: string, }) {
    // Return Necessary Component based on User role
    return (
        <div>
            {
                role === 'admin' ? <AdminLocation /> :

                    <div>Location</div>
            }
        </div>
    )
}
