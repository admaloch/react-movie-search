import ItemInfo from "./ItemInfo";
import BioOverlay from "./BioOverlay";
import HoverInfoBtn from "./HoverInfoBtn";
import { useState } from "react";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
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
          <IconButton
            aria-label={"view more content"}
            className="custom-icon-button"
          >
            <Tippy content="View more information">
              <MoreHorizSharpIcon sx={{ fontSize: 30 }} />
            </Tippy>
          </IconButton>
        </ListItemModal>
      </div>

      <BioOverlay
        revealBio={revealBio}
        closeBio={closeBioOverlay}
        plot={item.Plot}
      />
    </>
  );
}
