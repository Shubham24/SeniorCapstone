import { Dashboard, Book } from '@material-ui/icons';

// Pages/Links that will be shown to an Student User in the sidebar
const InstructorPages = [
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
];

export default InstructorPages;