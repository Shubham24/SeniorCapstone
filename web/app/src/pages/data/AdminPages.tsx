import { Dashboard, LocationOn, Person, Book, PieChart } from '@material-ui/icons';

// Pages/Links that will be shown to an Admin User in the sidebar
const AdminPages = [
    {
        name: 'Dashboard',
        icon: <Dashboard />,
        path: '/dashboard'
    },
    {
        name: 'Courses',
        icon: <Book />,
        path: '/courses'
    },
    {
        name: 'Users',
        icon: <Person />,
        path: '/users'
    },
    {
        name: 'Location',
        icon: <LocationOn />,
        path: '/location'
    },
    {
        name: 'Analytics',
        icon: <PieChart />,
        path: '/analytics'
    },
]

export default AdminPages;