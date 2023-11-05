
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';



export default function PopoverItem({ itemText, id, anchorEl }) {



    return (
        <>
           
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
                            {itemText}
                        </Box>
                    </Fade>
                )}
            </Popper>
        </>
    );
}




