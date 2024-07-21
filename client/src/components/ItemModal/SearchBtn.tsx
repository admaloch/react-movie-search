import GoogleIcon from '@mui/icons-material/Google';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import React, { useState } from 'react';
import { SearchBtnProps } from '../../models/SearchBtnProps';


export default function SearchBtn({ searchLink, type }: SearchBtnProps): JSX.Element {
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
        className='google-icon-container'
        aria-describedby={id}
        onMouseEnter={handleClick}
        onMouseLeave={handleClick}>
        <a
          href={searchLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GoogleIcon className='google-icon' sx={{ fontSize: 30 }} />
        </a>
      </div>
      <Popper
     
        disablePortal={true}
        placement="top"
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{ border: 1, color: 'black', borderRadius: 2, marginBottom: 1, p: 1, bgcolor: 'background.paper' }}>
              Search {type}
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}
