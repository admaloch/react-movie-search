import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                } catch (err) {
                    // Handle any errors if needed
                }
            }

            if (!token && persist) {
                verifyRefreshToken();
            }
        }
        return () => effectRan.current = true;
        // eslint-disable-next-line
    }, [token, persist, refresh]);

    return <Outlet />;
};

export default PersistLogin;
