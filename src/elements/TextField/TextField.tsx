import * as React from 'react'

import TextFieldMui, { OutlinedTextFieldProps } from '@mui/material/TextField';

import { alpha, styled } from '@mui/material/styles';

interface ITextField extends OutlinedTextFieldProps {
    theme: string
}


export const TextField: React.FC<ITextField> = ({ theme, label, error, variant, helperText, value, onChange }) => {
    console.log("thene", theme)
    const color = theme === "DayTheme" ? '#e1ad03' : '#893ed0'
    return <TextFieldMui

        sx={{
            '& label.Mui-focused': {
                color: color,
            },
            '& label': {
                color: color,
            },
            '& .MuiInputBase-input': {
                color: color
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: color,
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: color,
                },
                '&:hover fieldset': {
                    borderColor: color,
                },
                '&.Mui-focused fieldset': {
                    borderColor: color,
                },
            },
        }}
        value={value}
        label={label}
        error={error}
        variant={variant}
        onChange={onChange}
        helperText={helperText}

    // color={className === "DayTheme" ? "success" : "secondary"} 
    />
}