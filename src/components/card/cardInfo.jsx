import React from "react";
import { useTranslation } from "react-i18next";

export const CardInfo = ({title, text}) => {
    const {t} = useTranslation()
    return (
        <div className='CardInfo'>
            <p className='CardInfo-title'>{title}</p>
            {
                text ? 
                <p dangerouslySetInnerHTML={{ __html: text }} className='CardInfo-text'>
                </p>
                :
                <p className='CardInfo-text'>
                {t('notSpecified')}    
                </p>
            }
        </div>
    )
};
