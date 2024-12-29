import React from "react";
import "./styles.css"

function Button({value, onclick}) {

    return (
        <div className="btn btn-outline-dark square-btn m-1" onClick={onclick}>
            <h1>{value}</h1>
        </div>
    );
};

export default Button;