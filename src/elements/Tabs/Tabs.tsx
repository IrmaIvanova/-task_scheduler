import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';

interface ITabsCmponent {
    options: {
        label: string,
    }[]
    value: number
    setValue: (value: number) => void
    theme: string
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TabsComponent: React.FC<ITabsCmponent> = ({ options, value, setValue, theme }) => {


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const color = theme === "DayTheme" ? '#e1ad03' : '#893ed0';

    return <Tabs
        sx={{
            '& .MuiTabs-indicator': {
                " backgroundColor": color,

            },

        }}
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example">
        {options.map((option, index) => <Tab sx={{
            "&.MuiTab-root": {
                color: theme === "DayTheme" ? "#000" : "#ffffffa3"
            },
            '&.Mui-selected': {
                color: color,

            },


        }} label={option.label} {...a11yProps(index)} />)}



    </Tabs>
}