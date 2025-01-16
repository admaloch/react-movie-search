import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { OmdbItemInterface } from "./ItemApiProps";

export interface RTKQueryInterface {
  isLoading?: Boolean;
  isSuccess?: Boolean;
  isError?: Boolean;
  error?: FetchBaseQueryError | SerializedError | null;
}

//for rtk query with omdbAPI item
export interface OmdbItemWithRTK extends RTKQueryInterface, OmdbItemInterface {}
