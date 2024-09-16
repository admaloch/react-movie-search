import { useLazySearchMoviesQuery } from "../features/movie-api/omdbApiSlice";
import { useSearchType } from "./useSearchType";

//omdb only returns 10 results per page, so we need to make 2 requests to get 20 results for slider

const useDoubleOmdbRes = () => {
  const { currType } = useSearchType();
  const currTypeParam = currType.apiParam;

  const [triggerPage1, { data: page1Results, isLoading: isLoadingPage1, isSuccess: isSuccessPage1, isError: isErrorPage1, error: errorPage1 }] = useLazySearchMoviesQuery();
  const [triggerPage2, { data: page2Results, isLoading: isLoadingPage2, isSuccess: isSuccessPage2, isError: isErrorPage2, error: errorPage2 }] = useLazySearchMoviesQuery();

  const fetchSubmittedResults = async (searchInput: string) => {
    const firstPage = await triggerPage1({ searchInput, currTypeParam, page: 1 });
    const secondPage = await triggerPage2({ searchInput, currTypeParam, page: 2 });

    const updatedResults = [
      ...(firstPage.data?.Search || []),
      ...(secondPage.data?.Search || []),
    ];

    return updatedResults;
  };

  const isLoading = isLoadingPage1 || isLoadingPage2;
  const isSuccess = isSuccessPage1 && isSuccessPage2;
  const isError = isErrorPage1 || isErrorPage2;
  const error = errorPage1 || errorPage2;

  return { fetchSubmittedResults, isLoading, isSuccess, isError, error };
};

export default useDoubleOmdbRes;
