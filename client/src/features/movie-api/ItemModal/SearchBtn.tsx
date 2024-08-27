import GoogleIcon from '@mui/icons-material/Google';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import React, { useState } from 'react';
import { SearchBtnProps } from '../../../models/SearchBtnProps';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { IconButton } from '@mui/material';

export default function SearchBtn({ searchLink, type }: SearchBtnProps): JSX.Element {


  return (
    <IconButton aria-label={'show more info'}
      className='custom-icon-button'
    >
      <a
        href={searchLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Tippy content="Google search">
          <GoogleIcon className='google-icon' sx={{ fontSize: 30 }} />
        </Tippy>
      </a>

    </IconButton>

  );
}
