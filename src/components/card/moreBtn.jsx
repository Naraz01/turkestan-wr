import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const MoreBtn = ({id}) => {
    const {t} = useTranslation()
    if (!id) {
        return null
    }
    return (
        <Link to={`/object/${id}`} className='moreBtn'>
            {t('moreAboutObject')}
        </Link>
    )
};
