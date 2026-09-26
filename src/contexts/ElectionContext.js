import { useContext, createContext, useState, useEffect } from "react";
import api from "../api/axios";


const ElectionContext = createContext();

// Election Provider

export function ElectionProvider({children}) {
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadElections() {
        setLoading(true); // we set the loading state to true since we are about making the API call to fetch the elections
        try{
            const response = await api.get('/elections/');
            if (response.status === 200) {
                setElections(response.data);
            }
        }catch(err) {
            console.error('Error: ', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const access = localStorage.getItem("access");

        if(!access) return;
        queueMicrotask(loadElections);

    }, []);

    return (<ElectionContext.Provider value={{elections,loading,loadElections}}>{children}</ElectionContext.Provider>);

}

export function useElection() {
    const context = useContext(ElectionContext);
    
    if (!context) {
        throw new Error("useElection must be used within an ElectionProvider");
    }
    return context;
}

export default ElectionContext


