import React from 'react'
import AdminUsers from './admin/AdminUsers'


/* Users Page */
export default function Users({ role }: { role: string, }) {

    // Return Necessary Component based on User role
    return (
        <div>
            {
                role === 'admin' ? <AdminUsers /> :

                    <div>Users</div>
            }
        </div>
    )
}
