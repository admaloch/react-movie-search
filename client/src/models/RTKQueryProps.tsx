import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface RTKQueryInterface {
    isLoading?: Boolean;
    isSuccess?: Boolean;
    isError?: Boolean;
    error?: FetchBaseQueryError | SerializedError | null;
}