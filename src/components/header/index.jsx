import React from "react";
import { useTranslation } from "react-i18next";
import { Auth } from "../auth";
import {Language} from "./language";
import { Menu } from "./menu";
import { Link } from "react-router-dom";

export const Header = () => {
    const {t} = useTranslation()
    return (
        <div className={'header'}>
            <div className="container header-container">
                <div className="header-left">
                    <Menu />
                    <Link to="/" className="header-title">
                        {t('waterResourcesTurkestan')}
                    </Link>
                </div>
                <div className="header-right">
                    <Language />
                    <Auth />
                </div>
            </div>
        </div>
    )
};
