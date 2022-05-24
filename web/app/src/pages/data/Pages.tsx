
import { Dashboard, LocationOn, Person, Book } from '@material-ui/icons';

// Pages/Links that will be shown to a User in the sidebar
const Pages = [
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
];

export default Pages;