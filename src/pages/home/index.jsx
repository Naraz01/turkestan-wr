import React from "react";
import {Title} from "../../components/title";
import {Typography} from "../../components/typography";
import { Maps } from "./components/maps";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import i18next from "../../utils/i18next";
import { Footer } from "../../components/footer";

export const Home = () => {
    const {t} = useTranslation()
    const [isFullScreen, setIsFullScreen] = React.useState(true);
    const onFullScreen = () => {
        setIsFullScreen(!isFullScreen)
    }
    React.useEffect(() => {
        setIsFullScreen(true)
    }, [])
    return (
        <>
        <Helmet>
            <html lang = { i18next.language }/>
            <title>
                {t('waterResourcesTurkestan')}
            </title>
        </Helmet>
        <div className='home'>
            {
                isFullScreen &&
                <div className='container'>
                    <div className="home-content">
                        <div className="home-title">
                            <Title title="О проекте"/>
                        </div>
                        <Typography text='Vitae nec sed proin lorem eget. Nec porta consectetur vulputate arcu. Sit in malesuada integer cursus iaculis eget malesuada a. Euismod aliquet morbi tortor, mi. Adipiscing tortor, ornare lectus sit in consequat vitae, malesuada.'/>
                    </div>
                </div>
            }
            <Maps onFullScreen = {onFullScreen} isFullScreen={isFullScreen}/>
        </div>
        {
            isFullScreen &&
            <Footer />
        }
        </>
    )
};