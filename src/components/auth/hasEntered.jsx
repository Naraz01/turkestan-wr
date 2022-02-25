import React from "react";
import { useTranslation } from "react-i18next";
import { AuthButton } from './authButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOff } from '../../store/ducks/user/actionCreators'

export const HasEntered = () => {
    const {t} = useTranslation()
    const [isOpen, setIsOpen] = React.useState(false)
    const dispatch = useDispatch();
    const menuRef = React.useRef(null);

    const onMenu = () => {
        setIsOpen(!isOpen)
    }
    let menus = [
        {url: 'settings', text: `${t('settings')}`}, 
        {url: 'users', text: `${t('users')}`},
        {url: 'objects', text: `${t('objects')}`},
    ]
    const isOpenMenu = (i) => {
        if (i.path.includes(menuRef.current)) {
            setIsOpen(true)
        }
        else {
            setIsOpen(false)
        }
    };

    const onLogOff = () => {
        dispatch(LogOff())
    }

    return (
        <div ref = {menuRef}>
            <div onClick = {onMenu}>
                <AuthButton
                    img = {<PersonOutlineIcon style = {{ color: '#22577E' }}/>}
                    text = {t('cabinet')}
                />
            </div>
            
            {
                isOpen &&
                <div className="has-entered">
                    <ul className="auth-menu">
                        {
                            menus.map((item, i) => {
                                return (
                                    <li key = {i} className = "auth-menu__item" onClick={onMenu}> 
                                        <Link to={item.url}> {item.text} </Link> 
                                    </li>
                                )
                            })
                        }
                        <li className = "auth-menu__item" onClick = {onLogOff}> 
                            <Link to = {'/'}> {t('logOff')} </Link> 
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
};