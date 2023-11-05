

import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';

import { useState } from 'react';

export default function MoreInfoBtn({ openItemModal }) {

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (
        <>


            <div
                aria-describedby={id}
                onMouseEnter={handleClick}
                onMouseLeave={handleClick}
                className="popover-icon"
                onClick={openItemModal}>
                <MoreHorizSharpIcon />
            </div>

            <Popper
                style={{ color: 'black', zIndex: 200 }}
                placement="top"
                id={id}
                open={open}
                anchorEl={anchorEl}
                transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box sx={{ border: 1, borderRadius: 2, marginBottom: 1, p: 1, bgcolor: 'background.paper' }}>
                            View more information
                        </Box>
                    </Fade>
                )}
            </Popper>
        </>
    );
}





