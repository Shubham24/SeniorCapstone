import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';




/* LineChartCard Component  */
/* title: Title of the line chart {default value is 'Line Chart'} 
** data: JSON that contains the data that will be displayed in the pie chart
** axis: data that contains information about the x/y axis
*/
export default function LineChartCard({ title = 'Line Chart', data, axis }: { title: string, data: any, axis: any }) {

    // Get allowedRange method from Datepicker
    const { allowedRange } = DateRangePicker;

    // get the start and end date from data
    const startDate = new Date(data[0].date);
    const endDate = new Date(data[data.length - 1].date);

    // use states to manage the stard/end dates for filtered data
    const [startFilteredDate, setStartFilteredDate] = useState(startDate);
    const [endFilteredDate, setEndFilteredDate] = useState(endDate);

    // set the filteredData to the data initially
    let filteredData = data;

    // set the start/end filtered date to the value selected by the user
    const handleChange = (value: any) => {
        setStartFilteredDate(new Date(new Date(value[0]).setHours(0, 0, 0, 0)));
        setEndFilteredDate(new Date(new Date(value[1]).setHours(0, 0, 0, 0)));
        fd();
    }

    // set start/end filteredDate to the original start/end date on clears
    const handleClear = () => {
        setStartFilteredDate(startDate);
        setEndFilteredDate(endDate);
    }

    // filter the data based on start/end filteredDates
    const fd = () => {
        filteredData = data.filter((d: any) => {
            return d.date.getTime() >= startFilteredDate.getTime() && d.date.getTime() <= endFilteredDate.getTime();
        });

        return filteredData;
    }

    // if the filteredData has data in it, make each tick represent a date in MM/DD/YYYY format
    const tickFormatter = (tick: any) => {

        if (filteredData.length > 0) {
            const t = new Date(tick);
            const month = t.getMonth() + 1;
            const day = t.getDate();
            const year = t.getFullYear();
            return month + '/' + day + '/' + year;
        }

        return tick;

    }

    return (

        <div>
            {/* Wrap Pie Chart Component In a Card Component */}
            <Card>
                {/* Title of the Card */}
                <CardHeader title={title}>
                </CardHeader>
                {/* Content of the Card */}
                <CardContent>
                    <DateRangePicker
                        appearance="subtle"
                        placeholder="Date Range"
                        format="MM/dd/yyyy"
                        disabledDate={
                            allowedRange !== undefined ?
                                allowedRange(startDate, endDate) : undefined
                        }
                        showOneCalendar={true}
                        onChange={handleChange}
                        onClean={handleClear}
                        style={{ width: 230 }}
                    />
                    <ResponsiveContainer width="100%" aspect={1.25}>
                        <LineChart
                            width={500}
                            height={300}
                            data={fd()}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <XAxis dataKey={"date"} tickFormatter={tickFormatter} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {axis.yaxis.map(
                                (l: { dataKey: any; stroke: string }) => <Line type="monotone" dataKey={l.dataKey} strokeWidth={3} stroke={l.stroke} activeDot={{ r: 8 }} />
                            )
                            }

                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
