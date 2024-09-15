import React, { useState } from 'react';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';

function UserPageLink({ userId }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Link to={`/profiles/${userId}`} style={{ textDecoration: 'none',color: 'var(--containerText)' }}>

                <IconButton
                    // onClick={navigate(`/profiles/${userId}`)}
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    sx={{
                        color: 'var(--containerText)', // Non-hover color
                        '&:hover': {
                            color: 'var(--text)', // Hover color
                            backgroundColor: 'var(--mainBackground)', // Hover background color
                        },
                    }}
                >
                    <ExitToAppIcon sx={{ fontSize: 40 }} />

                </IconButton>
            </Link>
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
                <Typography sx={{ p: 1 }}>Visit Page</Typography>
            </Popover>
        </Box>
    );
}

export default UserPageLink;
