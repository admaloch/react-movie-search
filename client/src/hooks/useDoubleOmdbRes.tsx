import { useLazySearchMoviesQuery } from "../features/movie-api/omdbApiSlice";
import { useSearchType } from "./useSearchType";

//omdb only returns 10 results per page, so we need to make 2 requests to get 20 results for slider

const useDoubleOmdbRes = () => {

  const { currType } = useSearchType();
  
  let currTypeParam = currType?.apiParam;

  const [triggerPage1, { isLoading: isLoadingPage1, isSuccess: isSuccessPage1, isError: isErrorPage1, error: errorPage1 }] = useLazySearchMoviesQuery();

  const [triggerPage2, { isLoading: isLoadingPage2, isSuccess: isSuccessPage2, isError: isErrorPage2, error: errorPage2 }] = useLazySearchMoviesQuery();

  const fetchSubmittedResults = async (searchInput: string) => {
    currTypeParam = currTypeParam as string;
    const firstPage = await triggerPage1({ searchInput, currTypeParam, page: 1 });
    const secondPage = await triggerPage2({ searchInput, currTypeParam, page: 2 });

    const updatedResults = [
      ...(firstPage.data?.Search || []),
      ...(secondPage.data?.Search || []),
    ];

    return updatedResults;
  };


  let isLoading = isLoadingPage1 || isLoadingPage2;
  const isSuccess = isSuccessPage1 && isSuccessPage2;
  let isError = isErrorPage1 || isErrorPage2;
  let error: string | undefined;
  if (isErrorPage1) {
    // @ts-ignore
    error = errorPage1?.data?.Error;
  } else if (isErrorPage2) {
    // @ts-ignore
    error = errorPage2?.data?.Error;
  }
  
  return { fetchSubmittedResults, isLoading, isSuccess, isError, error };
};

export default useDoubleOmdbRes;
