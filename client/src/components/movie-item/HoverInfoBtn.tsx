
import ViewHeadlineSharpIcon from '@mui/icons-material/ViewHeadlineSharp';
import openBioOverlayProps from '../../models/OpenBioOverlayProps';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { IconButton } from '@mui/material';

export default function HoverInfoBtn({ openBioOverlay }: openBioOverlayProps): JSX.Element {

    return (
        <IconButton aria-label={'show more info'}
            className='custom-icon-button'
            onClick={openBioOverlay}
        >
            <Tippy content="View synopsus">
                <ViewHeadlineSharpIcon sx={{ fontSize: 25 }} />
            </Tippy>
        </IconButton>
    );
}

