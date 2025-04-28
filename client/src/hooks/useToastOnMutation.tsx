import { useEffect } from "react";
import { toast } from "react-toastify";

interface ToastOptions {
  successMessage?: string;
  errorMessage?: string;
}

export function useToastOnMutationResult(
  isSuccess: boolean,
  isError: boolean,
  error: any,
  { successMessage = "Success!", errorMessage = "An error occurred" }: ToastOptions = {},
) {
  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success(successMessage);
    }
    if (isError) {
      toast.dismiss();
      const serverErrorMessage = error?.data?.message || errorMessage;
      toast.error(serverErrorMessage);
    }
  }, [isSuccess, isError, error, successMessage, errorMessage]);
}
