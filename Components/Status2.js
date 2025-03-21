import React, { useEffect, useState } from "react";
import Status from "./Status";

const ReadyToPick = () => {
    return(
        <>
        <Status shippingstatus={2} updateShipping={4} buttonLabel={"Out for Delivery"} ShowButton={true}/>
        </>
    )
}

export default ReadyToPick