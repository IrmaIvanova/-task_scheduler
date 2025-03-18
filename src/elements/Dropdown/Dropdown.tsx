import * as React from 'react';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { StyledMenu, StyledMenuButton, StyledMenuItem } from './Dropdown.styled'

export const DropDown: React.FC<{
    options: string[] | number[],
    defText: string | number,
    handleChange: (elem) => void
}> = React.memo(function DropDown({ options, defText,
    handleChange
}) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [defaultText, setDefaultText] = React.useState<string | number>(defText)
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        setDefaultText(defText)
    }, [defText])

    return (
        <div>
            <StyledMenuButton
                variant="text"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {defaultText}
            </StyledMenuButton>

            <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                elevation={0}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >

                {options.map((elem) => {
                    if (elem === "-") return <Divider />
                    return <StyledMenuItem
                      
                        onClick={() => {
                            handleChange(elem)
                            handleClose()
                        }} disableRipple>

                        {elem}
                        {defText === elem && <CheckIcon />}

                    </StyledMenuItem>
                })}


            </StyledMenu>
        </div>
    );
})