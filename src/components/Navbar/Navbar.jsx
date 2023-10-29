import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{backgroundColor: 'var(--color1)'}} position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, color: 'var(--mainBackground)' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'var(--mainBackground)' }}>
                        Movie Seach
                    </Typography>
                
                </Toolbar>
            </AppBar>
        </Box>
    );
}


