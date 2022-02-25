import React from "react";
import { useTranslation } from "react-i18next";
import "../../utils/i18next"
import i18next from "../../utils/i18next";

export const Language = () => {
    const { t, i18n } = useTranslation();
    const changleLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }
    let language = ['РУС', 'ҚАЗ', 'ENG'];
    let [activeMenu, setActiveMenu] = React.useState(0);
    const onMenuActive = (i = 0) => {
        setActiveMenu(i)
        if (i === 0) {
            changleLanguage('ru')
        } else if (i === 1) {
            changleLanguage('kk')
        } else {
            changleLanguage('en')
        }
    };
    React.useEffect(() => {
        if (i18next.language === 'kk') {setActiveMenu(1)}
        else if (i18next.language === 'en') {setActiveMenu(2)}
        else {setActiveMenu(0)}
    }, []);
    return (
        <ul className={'language-items'}>
            {
                language.map((item, i) => {
                    return <li
                        className = {`language-item ${activeMenu === i ? 'language-active' : ''}`}
                        onClick = {() => onMenuActive(i)} key={i}
                        >
                            {item}
                    </li>
                })
            }
        </ul>
    )
};
