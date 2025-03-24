import React, { useEffect, useState } from "react";
import Status from "./Status";


export const AssignedTab = () => {
    return(
        <>
        <Status shippingstatus={1} updateShipping={2} buttonLabel={"Accept"} ShowButton={false}/>
        </>
    )
}

 

export const ReadyToPick = () => {
    return(
        <>
        <Status shippingstatus={2} updateShipping={4} buttonLabel={"Out for Delivery"} ShowButton={false}/>
        </>
    )
}

export const OutForDelivery = () => {
    return(
        <>
        <Status shippingstatus={4} updateShipping={5} buttonLabel="Deliver" ShowButton={false}/>
        </>
    )
}

export const Delivered = () => {
    return(
        <>
        <Status shippingstatus={5} buttonLabel="" ShowButton={false}/>
        </>
    )
}