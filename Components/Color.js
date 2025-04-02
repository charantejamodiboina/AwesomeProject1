import React, { useContext, createContext } from "react";
const ColorContext = createContext()
export const ColorProvider = ({children}) => {
    const colors = {
        Primary : "rgb(72, 99, 255)",
        TextInPrimary : "white",
        TextColor : "black",
        background : "white"
    }
    return (
        <ColorContext.Provider value={colors}>{children}</ColorContext.Provider>
    )
}
export const useTheme = () =>{
    return useContext(ColorContext)
}