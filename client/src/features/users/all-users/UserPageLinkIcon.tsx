import React, { useState } from 'react';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useNavigate } from 'react-router-dom';

interface UserPageLinkProps {  
    userId: string;
}

function UserPageLink({ userId }: UserPageLinkProps) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target: Element = event.currentTarget as Element
       //@ts-ignore  come back to this.. can't get rid of ts error
        setAnchorEl(target);
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
