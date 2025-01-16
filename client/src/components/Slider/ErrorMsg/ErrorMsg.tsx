import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchType } from "../../../hooks/useSearchType";
import "./ErrorMsg.css";
import { useOmdbState } from "../../../hooks/useOmdbState";

function ErrorMsg() {
  const { currType, searchTypes } = useSearchType();
  const { submittedSearch, omdbSearchResults } = useOmdbState();
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  useEffect(
    function hideErrMsgStateHandler() {
      if (submittedSearch.length > 0 && omdbSearchResults.length === 0) {
        setShowErrorMsg(true);
      } else {
        setShowErrorMsg(false);
      }
    },
    [submittedSearch],
  );

  useEffect(
    function eraseErrOnTypeChange() {
      setShowErrorMsg(false);
    },
    [searchTypes],
  );

  if (!showErrorMsg) return null;

  return (
    <div className="error-msg-container" aria-hidden="true">
      <p>
        We couldn&apos;t find anything for that. Try searching for a specific
        topic or {currType.errorMsg} to get better results{" "}
      </p>
    </div>
  );
}
export default React.memo(ErrorMsg);
