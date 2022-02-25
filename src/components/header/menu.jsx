import React from "react";
import { Link } from "react-router-dom";
import { MenuApi } from "../../services/api/menuApi";
import menu from './menu-Bold.svg';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import { Language } from "./language";
import { Loading } from "../loading/indexx";

export const Menu = () => {
    const {t} = useTranslation()
    const [loading, setLoading] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false);
    let [channels, setChannels] = React.useState()
    let [reservoirs, setReservoirs] = React.useState()
    let [citySystems, setcitySystems] = React.useState()
    let [environmentals, setEnvironmentals] = React.useState()

    let menuRef = React.useRef(null);
    const openMenu = () => {
        setIsOpen(!isOpen)
    };
    const getMenu = async () => {
        try {
            const getChannels = await MenuApi.fetchChannels();
            setChannels(getChannels.content)

            const getCitySystems = await MenuApi.fetchCitySystems();
            setcitySystems(getCitySystems.content)

            const getEnvironmentals = await MenuApi.fetchEnvironmentals();
            setEnvironmentals(getEnvironmentals.content)

            const getReservoirs = await MenuApi.fetchReservoirs();
            setReservoirs(getReservoirs.content)
            setLoading(true)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    } 
    React.useEffect(() => {
        getMenu()
        setLoading(false)
    },[i18next.language])
    
    return (
        <div className='menu'>
            <div className='menu-icon' onClick={openMenu}>
                {
                 isOpen ?  
                    <CloseIcon style={{ color: '#5584AC' }} />
                        :
                    <img src={menu} alt="#" />
                }
            </div>
            {
                isOpen &&
                <div className='menu-content' ref = {menuRef}>
                    <div className="phone-languge">
                        <div className="container">
                            <Language />
                        </div>
                    </div>
                    <div className="container menu-items">
                        {
                            loading ?
                            <>
                            <ul className='menu-item'>
                                <li className='menu-item__title'> {t('reservoir')} </li>
                                {
                                    reservoirs.map((item) => {
                                        return <li key={item.id}> <Link to={`/object/${item.id}`} onClick={openMenu}> {item.name} </Link> </li>
                                    })
                                }
                            </ul>
                            <ul className='menu-item'>
                                <li className='menu-item__title'> {t('channels')} </li>
                                {
                                    channels.map((item) => {
                                        return <li key={item.id}> <Link to={`/object/${item.id}`} onClick={openMenu}> {item.name} </Link> </li>
                                    })
                                }
                            </ul>
                            <ul className='menu-item'>
                                <li className='menu-item__title'> {t('citySystem')} </li>
                                {
                                    citySystems.map((item) => {
                                        return <li key={item.id}> <Link to={`/object/${item.id}`} onClick={openMenu}> {item.name} </Link> </li>
                                    })
                                }
                            </ul>
                            <ul className='menu-item'>
                                <li className='menu-item__title'> {t('conservationFacilities')} </li>
                                {
                                    environmentals.map((item) => {
                                        return <li key={item.id}> <Link to={`/object/${item.id}`} onClick={openMenu}> {item.name} </Link> </li>
                                    })
                                }
                            </ul>
                            </>
                            :
                            <Loading/>
                        }
                    </div>
                </div>
            }
        </div>
    )
};