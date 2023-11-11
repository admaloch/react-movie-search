import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { OpenModalProps } from '../../models/ModalProps';
import React from 'react';

export default function MainNav({ openModal }: OpenModalProps): JSX.Element {
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ backgroundColor: 'var(--color1)' }} position="static">
                <Toolbar>

                    <Typography variant="h6" component="div"
                        sx={{
                            flexGrow: 1,
                            color: 'var(--mainBackground)',
                            fontFamily: 'Poppins',
                            fontSize: '2rem',
                            fontWeight: '800',
                        }}>
                        Movie Seach
                    </Typography>
                    <IconButton
                        onClick={openModal}
                        
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{fontSize: '4rem', mr: 1, color: 'var(--mainBackground)' }}
                    >
                        <InfoIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


