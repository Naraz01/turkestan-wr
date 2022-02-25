import React from "react";
import {CardInfo} from "./cardInfo";
import {DownloadBtn} from "./downloadBtn";
import {MoreBtn} from "./moreBtn";
import {Slider} from "../../pages/reservoir/slider";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { GeneralApi } from "../../services/api/generalApi";

export const Card = ({ visibel, id}) => {
    const [data, setData] = React.useState();
    const {t} = useTranslation()
    React.useEffect(() => {
        (async () => {
            try {
                const obj = await GeneralApi.fetchFindOne(id);
                setData(obj.content)
            } catch(error) {
                console.log('fetchFindOne', error)
            }
        })()
    }, [id, i18next.language])
    if (!data) {
        return null
    }
    return (
        <div className="card leaflet-popup">
            <div className="card-head">
                <p className='card-type'>
                    {data.type.name}
                </p>
                <div className="card-close" onClick={visibel}>
                    <i> <CloseIcon style = {{ color: '#D9DBE1' }} /> </i>
                </div>
            </div>
            <p className='card-title'>
                {data.name}
            </p>
            <div className="card-photo">
                <Slider photos={data.photos} video={data.video} isCard = {true} />
            </div>
            <CardInfo title = {t('lengthCarryingCapacity')} text={data.length} />
            <CardInfo title = {t('objectTask')} text={data.goal} />
            <CardInfo title = {t('expectedResult')} text={data.expectation} />
            <div className='card-btn'>
                <DownloadBtn />
                <MoreBtn id = {id} />
            </div>
        </div>
    )
};
