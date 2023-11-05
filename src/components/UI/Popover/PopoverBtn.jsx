
import Popover from './Popover'


export default function PopoverBtn({ btnText, handleClick, id }) {



  return (
    <>
      <div
        className='google-icon-container'
        aria-describedby={id}
        onMouseEnter={handleClick}
        onMouseLeave={handleClick}>
        {btnText}
      </div>
      
    </>
  );
}




