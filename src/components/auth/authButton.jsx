import React from "react";

export const AuthButton = ({img, text}) => {
    return (
        <div className={'auth'}>
            <i>
                {img}
            </i>
            <span className="auth-text">{text}</span>
        </div>
            
    )
};