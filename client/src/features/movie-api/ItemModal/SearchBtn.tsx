import GoogleIcon from '@mui/icons-material/Google';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { IconButton } from '@mui/material';

interface SearchBtnProps {
  type: string;
  searchLink: string;
}

export default function SearchBtn({ searchLink }: SearchBtnProps): JSX.Element {

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
          <GoogleIcon className='google-icon' sx={{ fontSize: 30,color: 'var(--color1)' }} />
        </Tippy>
      </a>

    </IconButton>

  );
}
