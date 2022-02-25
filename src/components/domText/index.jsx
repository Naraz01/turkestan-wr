import React from "react";

export const DomText = ({text}) => {
    let innerRef = React.useRef(null);
    React.useEffect(() => {

    },[])
    
    return (
        <div dangerouslySetInnerHTML={{ __html: text }}>
        </div>
    )
};
