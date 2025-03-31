import React, { useContext, createContext, useState } from "react";
const RefreshContext = createContext()
export const RefreshProvider = ({children}) => {
    const [refreshData, setRefreshData] = useState(null)
    const triggerRefresh = () => {
        setRefreshData((prev) => !prev);
    return (
        <RefreshContext.Provider value={{refreshData, triggerRefresh}}>{children}</RefreshContext.Provider>
    )
}
}
export const useRefresh = () =>{
    return useContext(RefreshContext)
}