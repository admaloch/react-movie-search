import ItemInfo from "./ItemInfo";
import BioOverlay from "./BioOverlay";
import HoverInfoBtn from "./HoverInfoBtn";
import { useState } from "react";
import { IconButton } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { OmdbItemInterface } from "../../models/ItemApiProps";

interface ItemContentProps extends OmdbItemInterface {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentImdbId?: React.Dispatch<React.SetStateAction<string>>;
}

export default function ItemContent({
  item,
  setIsModalOpen,
  setCurrentImdbId,
}: ItemContentProps): JSX.Element | null {
  
  if (!item) return null;

  const [revealBio, setRevealBio] = useState(false);

  const openBioOverlay = () => {
    setRevealBio(true);
  };

  const closeBioOverlay = () => {
    setRevealBio(false);
  };

  const itemModalHandler = () => {
    if (typeof setIsModalOpen === 'function' && typeof setCurrentImdbId === 'function') {
        setIsModalOpen(true);
        setCurrentImdbId(item?.imdbID || '');
    }
};

  return (
    <>
      <ItemInfo closeBioOverlay={closeBioOverlay} item={item} />

      <div className="hover-btn-container">
        {item.Plot !== "N/A" && (
          <HoverInfoBtn openBioOverlay={openBioOverlay} />
        )}

        
          <div 
            className="user-item-icon"
            onClick={itemModalHandler}
          >
            <IconButton
              aria-label={"view more content"}
              className="custom-icon-button search-item-icon"
            >
              <Tippy content="View more information">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-three-dots"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                </svg>
              </Tippy>
            </IconButton>
          </div>
        
      </div>

      <BioOverlay
        revealBio={revealBio}
        closeBio={closeBioOverlay}
        plot={item.Plot}
        title={item.Title}
      />
    </>
  );
}
