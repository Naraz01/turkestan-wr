import React from "react";
import { useTranslation } from "react-i18next";

export const ReservoirInfo = ({title, text}) => {
    const {t} = useTranslation()
    return (
        <div className='reservoirInfo'>
            <p className='reservoirInfo-title'>
                {title}
            </p>
            {
                text ? 
                <div contentEditable='true' dangerouslySetInnerHTML={{ __html: text }}>
                </div>
                :
                <p>
                {t('notSpecified')}    
                </p>
            }
        </div>
    )
};