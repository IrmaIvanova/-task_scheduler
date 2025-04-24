import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';

interface ITabsCmponent {
    options: {
        label: string,
    }[]
    value: number
    setValue: (value:number)=> void
    
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TabsComponent: React.FC<ITabsCmponent> = ({ options, value, setValue }) => {



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {options.map((option, index) => <Tab label={option.label} {...a11yProps(index)} />)}


      
    </Tabs>
}