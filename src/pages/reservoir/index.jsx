import React from "react";
import {Title} from "../../components/title";
import {Type} from "../../components/type";
import {Breadcrumbs} from "../../components/breadcrumbs";
import { ReservoirInfo } from "./reservoirInfo";
import {DownloadBtn} from "../../components/card/downloadBtn";
import { Slider } from "./slider";
import { useParams } from 'react-router-dom';
import { GeneralApi } from "../../services/api/generalApi";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Footer } from "../../components/footer";
import { Loading } from "../../components/loading/indexx";

export const Reservoir = () => {
    const [data, setData] = React.useState();
    const {t, i18next } = useTranslation()
    const {id} = useParams()
    
    React.useEffect(() => {
        (async () => {
            try {
                const obj = await GeneralApi.fetchFindOne(id);
                setData(obj.content)
                console.log(obj.content)
            } catch(error) {
                console.log('fetchFindOne', error)
            }
        })()
    }, [id, i18next.language])
    
    if (!data) {
        return (
            <div className='reservoir'>
                <div className='container'>
                    <Loading />
                </div>
            </div>
        )
    }
    return (
        <>
        <Helmet>
            <html lang = { i18next.language }/>
            <title>
                {data.name}
            </title>
        </Helmet>
        <div className = 'reservoir'>
            <div className = 'container'>
                <Breadcrumbs title = {data.name} id = {data.id} />
                <Type text = {data.type.name}/>
                <Title title = {data.name} />
                <div className = {'slider-reservoir'}>
                    <Slider photos = {data.photos} video = {data.video}/>
                </div>
                <div className = "reservoir-content">
                    <ReservoirInfo title = {t('volume')} text = {data.volume}/>
                    <ReservoirInfo title = {t('objectTask')} text = {data.goal}/>
                    <ReservoirInfo title = {t('expectedResult')} text = {data.expectation}/>
                    <ReservoirInfo title = {t('presenceWaterObject')} text = {data.water_presence}/>
                    <ReservoirInfo title = {t('waterSource')} text = {data.water_spring}/>
                    <ReservoirInfo title = {t('drainage')} text = {data.water_disposal}/>
                    <ReservoirInfo title = {t('typeWorkStage')} text = {data.work_type}/>
                    <ReservoirInfo title = {t('technicalSolution')} text = {data.technical_solution}/>
                    <ReservoirInfo title = {t('additionalInformation')} text = {data.description}/>
                </div>
                <div className = 'reservoir-customer'>
                    <p className = 'reservoir-customer__title'> {t('customer')} </p>
                    <ReservoirInfo title={t('responsiblePerson')} text = {data.responsible_person}/>
                    <ReservoirInfo title={t('amountFunding')} text = {data.total_funding}/>
                    <ReservoirInfo title={t('designer')} text = {data.planner}/>
                    <ReservoirInfo title={t('builder')} text = {data.developer}/>
                    <div className='reservoirInfo'>
                        <p className='reservoirInfo-title'>
                            {t('draftProject')}
                        </p>
                        {
                            data.project_draft ? 
                            <div className = 'reservoir-customer__img'>
                                {
                                    data.project_draft.map((item, i) => {
                                        return <img src = {`https://dev14.panama.kz/${item.url}`} alt = "#" key = {i} />
                                    })
                                }
                            </div>
                            :
                            <p>
                                {t('notSpecified')}    
                            </p>
                        }
                    </div>
                </div>
                <div className='reservoir-download'>
                    <DownloadBtn />
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
};