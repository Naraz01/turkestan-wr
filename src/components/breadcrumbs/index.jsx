import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Breadcrumbs = ({title, id}) => {
    const {t} = useTranslation()
    return (
        <div className={'breadcrumbs'}>
            <ul className="breadcrumbs-items">
                <li className="breadcrumbs-item">
                    <Link to="/">
                        {t('home')}
                    </Link>
                </li>
                <li className="breadcrumbs-item">
                    <Link to={`/objects/${id}`} >
                        {title}
                    </Link>
                </li>
            </ul>
        </div>
    )
};
