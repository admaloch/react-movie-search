import React, { useState } from 'react';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';

import { Link, useNavigate } from 'react-router-dom';


function PopoverIcon({ popoverText, children }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        < >
            <IconButton
                className='custom-icon-button'
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}

            >
                {children}

            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                disableRestoreFocus
                sx={{
                    pointerEvents: 'none', // Prevents flickering when hovering over the popover
                }}
            >
                <Typography sx={{ p: 1 }}>{popoverText}</Typography>
            </Popover>
        </>
    );
}

export default PopoverIcon;
