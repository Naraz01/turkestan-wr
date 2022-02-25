import React from "react";

export const Type = ({text}) => {
    if (!text) {
        return null
    }
    return (
        <div className={'type'}>
            {text}
        </div>
    )
};
