import { useState, useEffect } from "react";

// Define the return type as a tuple containing a boolean and a setter function
const usePersist = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [persist, setPersist] = useState<boolean>(() => {
        // Parse localStorage value, ensuring it's treated as a boolean
        const storedPersist = localStorage.getItem("persist");
        return storedPersist ? JSON.parse(storedPersist) : false;
    });

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    return [persist, setPersist];
};

export default usePersist;
