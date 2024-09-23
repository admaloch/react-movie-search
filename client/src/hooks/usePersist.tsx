import { useState, useEffect, useMemo } from "react";

const usePersist = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const getPersistValue = useMemo(() => {
        const storedPersist = localStorage.getItem("persist");
        return storedPersist ? JSON.parse(storedPersist) === true : false;
    }, []);

    const [persist, setPersist] = useState<boolean>(getPersistValue);

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    return [persist, setPersist];
};

export default usePersist;
