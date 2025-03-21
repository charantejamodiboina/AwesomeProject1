import React, { useEffect, useState } from "react";
import Status from "./Status";

const Delivered = () => {
    return(
        <>
        <Status shippingstatus={5} buttonLabel="" ShowButton={false}/>
        </>
    )
}

export default Delivered