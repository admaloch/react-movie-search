import ItemInfo from "./ItemInfo";
import BioOverlay from "./BioOverlay";
import HoverInfoBtn from "./HoverInfoBtn";
import { useState } from "react";
import ListItemModal from "../../features/movie-api/ItemModal/ListItemModal";
import { IconButton } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { OmdbItemInterface } from "../../models/ItemApiProps";

export default function ItemContent({
  item,
}: OmdbItemInterface): JSX.Element | null {
  if (!item) return null;

  const [revealBio, setRevealBio] = useState(false);

  const openBioOverlay = () => {
    setRevealBio(true);
  };

  const closeBioOverlay = () => {
    setRevealBio(false);
  };

  return (
    <>
      <ItemInfo closeBioOverlay={closeBioOverlay} item={item} />

      <div className="hover-btn-container">
        {item.Plot !== "N/A" && (
          <HoverInfoBtn openBioOverlay={openBioOverlay} />
        )}

        <ListItemModal imdbId={item.imdbID}>
          <div className="user-item-icon">
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
        </ListItemModal>
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
