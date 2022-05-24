import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardContent } from '@material-ui/core'



/* BarChartCard Component  */
/* title: Title of the line chart {default value is 'Line Chart'} 
** data: JSON that contains the data that will be displayed in the pie chart
** axis: data that contains information about the x/y axis
*/
export default function BarChartCard({ title = 'Bar Chart', data, axis, bar }: { title: string, data: any, axis: any, bar: any }) {

    return (

        <div>
            {/* Wrap Bar Chart Component In a Card Component */}
            <Card>
                {/* Title of the Card */}
                <CardHeader title={title} />
                <CardContent>
                    <ResponsiveContainer width="100%" aspect={1.25}>
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <XAxis dataKey={axis.xaxis.dataKey.toString()}>
                            </XAxis>
                            <YAxis>
                            </YAxis>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey={bar.dataKey} fill={bar.fill} />

                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
