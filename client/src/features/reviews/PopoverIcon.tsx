import { useState } from "react";
import { IconButton, Popover, Typography } from "@mui/material";

interface PopoverIconProps {
  popoverText: string;
  children: JSX.Element;
}

function PopoverIcon({ popoverText, children }: PopoverIconProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        className="custom-icon-button"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        disableRestoreFocus
        sx={{
          pointerEvents: "none", // Prevents flickering when hovering over the popover
        }}
      >
        <Typography sx={{ p: 1 }}>{popoverText}</Typography>
      </Popover>
    </>
  );
}

export default PopoverIcon;
