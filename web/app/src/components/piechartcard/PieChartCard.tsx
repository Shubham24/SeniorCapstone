import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

/* PieChartCard Component  */
/* title: Title of the pie chart {default value is 'Pie Chart'} 
** data: JSON that contains the data that will be displayed in the pie chart
** color: String array that contains the colors of the pie chart
*/
export default function PieChartCard({ title = 'Pie chart', data, colors }: { title: string, data: any, colors: string[] }) {

    // get each item's name
    const names = data.map((item: any) => item.name);

    // props for multiselect box
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    // state for multiselect box
    const [selectionName, setSelectionName] = React.useState<string[]>(names);

    /**
     * Handle state change for multiselect box
     * @param event The event that triggers the state change
     */
    const handleChange = (event: SelectChangeEvent<typeof selectionName>) => {
        const {
            target: { value },
        } = event;
        setSelectionName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // MultipleSelect component
    const MultipleSelectCheckmarks = () => {

        return (
            <div>
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Selection</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectionName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {names.map((name: any) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={selectionName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }

    // set filteredData based on what items were selected in the multi select box
    const filteredData = data.filter((item: any) => selectionName.indexOf(item.name) > -1);

    // front end material
    return (
        <div>
            {/* Wrap Pie Chart Component In a Card Component */}
            <Card>
                {/* Title of the Card */}
                <CardHeader title={title} />
                <CardContent>
                    <MultipleSelectCheckmarks />
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Tooltip />
                            <Legend />
                            <Pie
                                data={filteredData}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#fff"
                                label
                                isAnimationActive={true}
                            >
                                {
                                    // Map the colors array to the colors of the pie chart
                                    data.map((_entry: any, index: number) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}




