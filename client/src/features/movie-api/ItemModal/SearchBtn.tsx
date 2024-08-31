import GoogleIcon from '@mui/icons-material/Google';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import React, { useState } from 'react';
import { SearchBtnProps } from '../../../models/SearchBtnProps';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { IconButton } from '@mui/material';
import searchIcon from '../../../assets/searchIcon'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function SearchBtn({ searchLink, type }: SearchBtnProps): JSX.Element {
  return (
    <IconButton aria-label={'show more info'} className='custom-icon-button'>
      <a href={searchLink} target="_blank" rel="noopener noreferrer">
        <Tippy content="Google search">

            <FontAwesomeIcon size="lg" icon={faGoogle} />
        </Tippy>
      </a>
    </IconButton>
  );
}
