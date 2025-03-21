import React, { useEffect, useState } from "react";
import Status from "./Status";

const OutForDelivery = () => {
    return(
        <>
        <Status shippingstatus={4} updateShipping={5} buttonLabel="Deliver" ShowButton={true}/>
        </>
    )
}

export default OutForDelivery