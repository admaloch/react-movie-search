import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import MovieReviewProps from "./MovieReviewProps";

export interface RTKQueryInterface {
    isLoading?: Boolean;
    isSuccess?: Boolean;
    isError?: Boolean;
    error?: FetchBaseQueryError | SerializedError | null;
}

export interface RTKReviewResultInterface {
    ids: string[];
    entities: {
        [key: string]: MovieReviewProps;
    };
}


