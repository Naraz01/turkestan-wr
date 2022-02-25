import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate  } from 'react-router-dom';

export const Cancel = () => {
    const {t} = useTranslation()
    const navigate = useNavigate();

    const handleClickButton = () => {
        navigate(-1)
    }

    return (
        <div className='cancel' onClick = {handleClickButton}>
            {t('cancellation')}
        </div>
    )
};
