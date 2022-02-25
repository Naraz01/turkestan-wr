import React from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate  } from 'react-router-dom';

export const Back = () => {
    const {t} = useTranslation()
    const navigate = useNavigate();

    const handleClickButton = () => {
        navigate(-1)
    }

    return (
        <div className = 'back' onClick = {handleClickButton}>
            <ArrowBackIosNewIcon style = {{ color: '#ffffff', fontSize: '16px'}}/>
            {t('back')}
        </div>
    )
};
