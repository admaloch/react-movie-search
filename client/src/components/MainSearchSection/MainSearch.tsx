import React from "react";
import { useSearchType } from "../../hooks/useSearchType";
import "./MainSearch.css";
import SearchForm from "../../features/movie-api/search-input/SearchForm.js";
import SearchTypeButtons from "./SearchTypeButtons";

interface MainSearchProps {
  isSliderActive: Boolean;
}

function MainSearch({ isSliderActive }: MainSearchProps): JSX.Element {
  const { currType } = useSearchType();
  const currItemHeader = currType ? `Search ${currType.description}` : null;
  let sliderClass = isSliderActive
    ? "show-slider main-search-section"
    : "hide-slider main-search-section";

  return (
    <section className={sliderClass}>
      <h1 className="text-center">{currItemHeader}</h1>
      <SearchTypeButtons />
      <SearchForm />
    </section>
  );
}
export default React.memo(MainSearch);
