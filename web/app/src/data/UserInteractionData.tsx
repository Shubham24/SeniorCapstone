// JSON Object Containing Active User dummy data
const UserInteractionData = {
    data: [
        {
            name: 'Jan-21',
            courses: 120,
            notes: 20
        },
        {
            name: 'Feb-21',
            courses: 210,
            notes: 84
        },
        {
            name: 'Mar-21',
            courses: 70,
            notes: 0
        },
        {
            name: 'Apr-21',
            courses: 500,
            notes: 100
        },
        {
            name: 'May-21',
            courses: 480,
            notes: 98
        },
        {
            name: 'Jun-21',
            courses: 480,
            notes: 70
        },
        {
            name: 'Jul-21',
            courses: 200,
            notes: 200
        },
        {
            name: 'Aug-21',
            courses: 180,
            notes: 20
        },
        {
            name: 'Sep-21',
            courses: 160,
            notes: 18
        },
        {
            name: 'Oct-21',
            courses: 240,
            notes: 45
        },
        {
            name: 'Nov-21',
            courses: 389,
            notes: 98
        },
        {
            name: 'Dec-21',
            courses: 400,
            notes: 78
        }
    ],

    axis: {
        xaxis: {
            dataKey: 'name'
        },

        yaxis: [
            {
                dataKey: 'courses',
                stroke: '#8884d8'
            },

            {
                dataKey: 'notes',
                stroke: '#1b82e6'
            },
        ]
    }
}

export default UserInteractionData;