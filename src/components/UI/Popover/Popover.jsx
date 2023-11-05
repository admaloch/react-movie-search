

import { useState } from 'react';
import PopoverBtn from './PopoverBtn'
import PopoverItem from './PopoverItem'

export default function Popover({ btnText, itemText }) {

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      <PopoverBtn
        btnText={btnText}
        handleClick={handleClick}
        id={id}
      />
      <PopoverItem
        itemText={itemText}
        id={id}
        anchorEl={anchorEl}
      />
    </>
  );
}




