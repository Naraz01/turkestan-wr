import React from "react";

export const StatusObject = ({name, id}) => {

    return (
        <div className = {id === 3 ? 'object-status__color2' : 'object-status__color'}>
            {name}
        </div>
    )
};
