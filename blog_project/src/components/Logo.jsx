import React from "react";
import pic from "../../public/Logo.jpg";

function Logo({width = '100px'}) {
    return (
        <div>
            <img src={pic} alt="Bloger Logo" style={{ width: width }} />
        </div>
    )
}

export default Logo
