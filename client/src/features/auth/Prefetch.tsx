import { store } from "../../app/store";
import { reviewsApiSlice } from "../reviews/reviewsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      reviewsApiSlice.util.prefetch("getReviews", "reviewsList", {
        force: true,
      }),
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true }),
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
