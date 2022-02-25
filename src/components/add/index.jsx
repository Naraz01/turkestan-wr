import React from "react";
import { useTranslation } from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";

export const Add = ({children}) => {
    const {t} = useTranslation()
    return (
        <Link to = "/users/create/" className='btn add'>
            <AddIcon style = {{ color: '#ffffff', fontSize: '20px'}}/>
            {t('add')}
        </Link>
    )
};