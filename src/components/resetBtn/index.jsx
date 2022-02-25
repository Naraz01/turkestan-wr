import React from "react";
import { useTranslation } from "react-i18next";

export const ResetBtn = () => {
    const {t} = useTranslation()
    return (
        <div className='resetBtn'>
            {t('resetPassword')}
        </div>
    )
};
