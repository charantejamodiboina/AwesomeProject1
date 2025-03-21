import React, { useEffect, useState } from "react";
import Status from "./Status";


const AssignedTab = () => {
    return(
        <>
        <Status shippingstatus={1} updateShipping={2} buttonLabel={"Accept"} ShowButton={true}/>
        </>
    )
}

export default AssignedTab;
