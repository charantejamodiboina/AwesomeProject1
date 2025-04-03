import React, { useContext, createContext } from "react";
const ColorContext = createContext()
export const ColorProvider = ({children}) => {
    const colors = {
        Primary : "rgb(72, 99, 255)",
        TextInPrimary : "white",
        success : "rgb(149, 206, 149)",
        error : "rgb(255, 141, 141)",
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