
import React from 'react';
import ViewHeadlineSharpIcon from '@mui/icons-material/ViewHeadlineSharp';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import openBioOverlayProps from '../../../models/OpenBioOverlayProps';
import { useState } from 'react';



export default function ShowPlotBtn({ openBioOverlay }: openBioOverlayProps): JSX.Element {

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);



    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
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

                onClick={openBioOverlay}>
                <ViewHeadlineSharpIcon sx={{ fontSize: 30 }} />
            </div>

            <Popper
            className='item-popover'
                style={{ color: 'black', zIndex: 200 }}
                placement="top"
                id={id}
                open={open}
                anchorEl={anchorEl}
                transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box sx={{ border: 1, borderRadius: 2, marginBottom: 1, p: 1, bgcolor: 'background.paper' }}>
                            Read plot
                        </Box>
                    </Fade>
                )}
            </Popper>
        </>
    );
}





