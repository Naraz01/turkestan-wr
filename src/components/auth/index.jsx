import React from "react";
import { Entrance } from "./entrance";
import { HasEntered } from './hasEntered';
import { useSelector } from "react-redux";

export const Auth = () => {
    const {isAuth} = useSelector((state) => {
        return {
            isAuth: state.user.isAuth,
        }
    });
    return (
        <div className = "auth-block">  
            {
                isAuth ?
                <HasEntered />
                :
                <Entrance />
            }
        </div>
    )
};