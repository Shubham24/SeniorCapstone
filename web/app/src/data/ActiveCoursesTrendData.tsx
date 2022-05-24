// JSON Object Containing Active User dummy data
const ActiveCoursesData = {
    data: [
        {
            name: 'Jan-21',
            courses: 40
        },
        {
            name: 'Feb-21',
            courses: 170
        },
        {
            name: 'Mar-21',
            courses: 165
        },
        {
            name: 'Apr-21',
            courses: 155
        },
        {
            name: 'May-21',
            courses: 210
        },
        {
            name: 'Jun-21',
            courses: 70
        },
        {
            name: 'Jul-21',
            courses: 80
        },
        {
            name: 'Aug-21',
            courses: 90
        },
        {
            name: 'Sep-21',
            courses: 140
        },
        {
            name: 'Oct-21',
            courses: 112
        },
        {
            name: 'Nov-21',
            courses: 147
        },
        {
            name: 'Dec-21',
            courses: 148
        }
    ],

    axis: {
        xaxis: {
            dataKey: 'name'
        },

        yaxis: [
            {
                dataKey: 'courses',
                stroke: '#00C49F'
            }
        ]
    }
}

export default ActiveCoursesData;