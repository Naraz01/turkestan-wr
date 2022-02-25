import React from "react";
import {Title} from "../../components/title";
import { Helmet } from "react-helmet";
import i18next from "../../utils/i18next";
import { Footer } from "../../components/footer";

export const NotFound = () => {
    return (
        <>
            <Helmet>
                <html lang = { i18next.language }/>
                <title>
                    404
                </title>
            </Helmet>
            <div className='home'>
                <div className="container">
                    <div className="home-title">
                        <Title title="404"/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};