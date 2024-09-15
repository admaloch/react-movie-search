import { Outlet } from "react-router-dom";
import { useEffect, useRef } from 'react';
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [refresh] = useRefreshMutation();

    useEffect(() => {
        // Check if effect has already run or if we're in development mode
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                } catch (err) {
                    console.log(err);
                }
            };
            if (!token && persist) {
                verifyRefreshToken();
            }
        }
        
        // Mark as ran
        effectRan.current = true;
        
        return () => {};
    }, [token, persist, refresh]);

    return <Outlet />;
};

export default PersistLogin;
