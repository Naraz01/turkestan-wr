import React from "react";
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import { Helmet } from "react-helmet";
import { Footer } from "../../components/footer";
import { Back } from '../../components/back'
import { ObjectsApi } from '../../services/api/objectsApi'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { objectValidation } from '../../utils/schemmas/objectValidation';
import { EditorText } from '../../components/editorText/';
import {Cancel} from '../../components/cancel/index';
import {BlogDraft} from './blogDraft';
import {Loading} from '../../components/loading/indexx';
import { Saved } from "../../components/saved";
import {MapsObject} from "../../components/mapsObject";
import {ImageAdd} from './imageAdd'
import {ImageBlog} from './imageBlog'

export const UpdateObject = () => {
    const {t} = useTranslation()
    const {id} = useParams()

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(objectValidation)
    })

    const [data, setData] = React.useState();
    const [selectType, setSelectType] = React.useState('null');
    const onSelectType = (value) => {
        console.log(value)
        setSelectType(value.target.value)
    }
    const [isSaved, setIsSaved] = React.useState(false)
    const [isMagistral, setIsMagistral] = React.useState(false)
    const [volume, setVolume] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const [location, setLocation] = React.useState([])
    const setLocationMaps = (dataLocation) => {
        setLocation(dataLocation)
    }

    const [img, setImg] = React.useState([]);

    const [draftProjectRu, setDraftProjectRu] = React.useState(null);
    const [draftProjectKz, setDraftProjectKz] = React.useState(null);
    const [draftProjectEn, setDraftProjectEn] = React.useState(null);
    const changeDraftProjectRu = (text) => {
        setDraftProjectRu(text)
    }
    const changeDraftProjectKz = (text) => {
        setDraftProjectKz(text)
    }
    const changeDraftProjectEn = (text) => {
        setDraftProjectEn(text)
    }

    const getData = async () => {
        try {
            const obj = await ObjectsApi.fetchFindOne(id);
            setData(obj.content)
            setLocation([obj.content.location])
            setImg(obj.content.photos)
        } catch(error) {
            console.log('fetchFindOne', error)
        }
    }
    React.useEffect(() => {
        getData()
    }, [id])
    

    const getImg = (photo) => {
        setImg(photo)
    }

    React.useEffect(() => {
        document.addEventListener('touchstart', {passive: true});
    },[])
    const updateObject = async (list) => {
        try {
            setLoading(true)
            const video = [getValues('video1'), getValues('video2'), getValues('video3'), getValues('video4'), getValues('video5')]
            const newData = JSON.parse(JSON.stringify(list))
            newData.video = video;
            newData.photos = img ? img : null;
            newData.location = { lat:location[0].lat, lng:location[0].lng }
            newData.project_draft_ru = draftProjectRu
            newData.project_draft_kk = draftProjectKz
            newData.project_draft_en = draftProjectEn
            newData.isMagistral = isMagistral
            await ObjectsApi.updateObject(id, newData)
            setIsSaved(true)
            setLoading(false)
        } catch(error) {
            console.log('updateObject', error)
            setLoading(true)
        }
    }

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
                    {t('objectEditing')}
                </title>
            </Helmet>
            <div className = "objectCreate backgroundColor pad-top">
                <div className = "container">
                    <div className="settings-head">
                        <Back />
                        <p>
                            {t('objectEditing')}
                        </p>
                    </div>
                    
                <div className = "objectCreate-data">
                    <form onSubmit = {handleSubmit(updateObject)}>
                    {
                        loading ?
                        <Loading/>
                        :
                        <>
                        <div className = "objectCreate-item">
                            <p className = "objectCreate-item__title"> {t('nameInRu')} *</p>
                            <input
                                defaultValue = {data.name_ru}
                                name = "name_ru" 
                                className = {errors.name_ru ? 'forms-input forms-input__error' : "forms-input"}
                                {...register('name_ru')}
                            />
                            <p> {errors.name_ru?.message} </p>
                        </div>
                        <div className = "objectCreate-item">
                            <p className = "objectCreate-item__title"> {t('nameInKz')} *</p>
                            <input 
                                defaultValue = {data.name_kk}
                                name = "name_kk" 
                                className = {errors.name_kk ? 'forms-input forms-input__error' : "forms-input"}
                                {...register('name_kk')}
                            />
                            <p> {errors.name_kk?.message} </p>
                        </div>
                        <div className = "objectCreate-item">
                            <p className = "objectCreate-item__title"> {t('nameInEn')} *</p>
                            <input 
                                name = "name_en"
                                defaultValue = {data.name_en}
                                className = {errors.name_en ? 'forms-input forms-input__error' : "forms-input"}
                                {...register('name_en')}
                            />
                            <p> {errors.name_en?.message} </p>
                        </div>
                        <div className = "objectCreate-lists">
                            <div className="objectCreate-list">
                                <p className = "objectCreate-item__title"> {t('objectType')} *</p>
                                <select 
                                    name = "type"
                                    className = "objectCreate-list__select"
                                    {...register('type')}
                                    onChange = {onSelectType}
                                    value = {selectType}
                                >
                                    <option disabled value = '0' className="option-delete"> </option>
                                    <option value = '1'> {t('reservoir')} </option>
                                    <option value = '2'> {t('channels')} </option>
                                    <option value = '3'> {t('citySystem')} </option>
                                    <option value = '4'> {t('conservationFacilities')} </option>
                                </select>
                                <p> {errors.type?.message} </p>
                            </div>
                            <div className="objectCreate-list">
                                <p className = "objectCreate-item__title"> {t('objectStatus')} *</p>
                                <select 
                                    name = "status"
                                    className="objectCreate-list__select"
                                    {...register('status')}
                                    value = {selectType}
                                >
                                    <option disabled value = '0' className="option-delete"> </option>
                                    <option value = '1'> {t('awaitingFunding')} </option>
                                    <option value = '2'> {t('planningStage')} </option>
                                    <option value = '3'> {t('underConstruction')} </option>
                                    <option value = '4'> {t('finished')} </option>
                                </select>
                                <p> {errors.status?.message} </p>
                            </div>
                        </div>
                        {
                            (selectType === '2' || selectType === '3') &&
                            <div className = "objectCreate-item objectCreate-item__flex">
                                <input 
                                    type="checkbox" 
                                    value = {isMagistral} 
                                    onClick = {() => setIsMagistral(!isMagistral)} 
                                    className = "objectCreate-item__checkbox"
                                    id="scales"
                                /> 
                                <label className = "objectCreate-item__title" htmlFor = "scales"> {t('trunk')} </label>
                            </div>
                        }
                        <div className = "objectCreate-item">
                            <p className = "objectCreate-item__title"> {t('location')} *</p>
                            <div className="objectCreate-maps">
                                <MapsObject setLocationMaps = {setLocationMaps} locationMap = {location && location} />                                  
                            </div>
                            {
                                (selectType === 'null' || selectType === '1' || selectType === '4') &&
                                <div className = "objectCreate-item">
                                    <p className = "objectCreate-item__title"> {t('volumeObject')}</p>
                                    <input 
                                        name = "volume"
                                        defaultValue = {data.volume}
                                        className = {errors.volume ? 'forms-input forms-input__error' : "forms-input"}
                                        {...register('volume')}
                                    />
                                </div>
                            }
                            {
                                (selectType === '2' || selectType === '3') &&
                                <>
                                    <div className = "objectCreate-item">
                                        <p className = "objectCreate-item__title"> {t('waterOutput')}</p>
                                        <input 
                                            type = "text"
                                            value = {volume} 
                                            onChange = {(e) => setVolume(e.target.value)}
                                            className = {'forms-input'}
                                        />
                                    </div>
                                    <div className = "objectCreate-item">
                                        <p className = "objectCreate-item__title"> {t('length')}</p>
                                        <input 
                                            name = "length"
                                            defaultValue = {data.length}
                                            className = {errors.length ? 'forms-input forms-input__error' : "forms-input"}
                                            {...register('length')}
                                        />
                                    </div>
                                </>
                            }
                            <div className="objectCreate-item">
                                <p className = "objectCreate-item__title"> {t('photography5')} </p>
                                    <ImageAdd getImg = {getImg} img = {img} />
                                </div>
                            </div>
                            <div className = 'objectCreate-item'>
                                <ImageBlog getImg = {getImg} img = {img} />
                            </div>
                            <div className = "objectCreate-lists objectCreate-lists__you">
                                <p className = "objectCreate-item__title"> {t('youTubeLink')} </p>
                                <p></p>
                                {}
                                <input defaultValue = {data.video && data.video[0]} name = "video1" {...register('video1')} className = {'forms-input'} />
                                <input defaultValue = {data.video && data.video[1]} name = "video2" {...register('video2')} className = {'forms-input'} />
                                <input defaultValue = {data.video && data.video[2]} name = "video3" {...register('video3')} className = {'forms-input'} />
                                <input defaultValue = {data.video && data.video[3]} name = "video4" {...register('video4')} className = {'forms-input'} />
                                <input defaultValue = {data.video && data.video[4]} name = "video5" {...register('video5')} className = {'forms-input'} />
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.goal_ru} register = {register} name = 'goal_ru' title = {t('objectTaskRu')} />
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.goal_kk} register = {register} name = 'goal_kk' title = {t('objectTaskKz')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.goal_en} register = {register} name = 'goal_en' title = {t('objectTaskEn')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.expectation_ru} register = {register} name = 'expectation_ru' title = {t('expectedResultRu')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.expectation_kk} register = {register} name = 'expectation_kk' title = {t('expectedResultKz')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.expectation_en} register = {register} name = 'expectation_en' title = {t('expectedResultEn')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.water_spring_ru} register = {register} name = 'water_spring_ru' title = {t('waterSourceRu')} />
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.water_spring_kk} register = {register} name = 'water_spring_kk' title = {t('waterSourceKz')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.water_spring_en} register = {register} name = 'water_spring_en' title = {t('waterSourceEn')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.water_disposal_ru} register = {register} name = 'water_disposal_ru' title = {t('waterDisposalRu')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.water_disposal_kk} register = {register} name = 'water_disposal_kk' title = {t('waterDisposalKz')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.water_disposal_en} register = {register} name = 'water_disposal_en' title = {t('waterDisposalEn')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.technical_solution_ru} register = {register} name = 'technical_solution_ru' title = {t('technicalSolutionRu')} />
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.technical_solution_kk} register = {register} name = 'technical_solution_kk' title = {t('technicalSolutionKz')} />
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.technical_solution_en} register = {register} name = 'technical_solution_en' title = {t('technicalSolutionEn')} />
                            </div>
                            <p className = "customer-title"> {t('customer')} </p>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.water_presence_ru} register = {register} name = 'water_presence_ru' title = {t('responsiblePersonRu')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.water_presence_kk} register = {register} name = 'water_presence_kk' title = {t('responsiblePersonKz')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.water_presence_en} register = {register} name = 'water_presence_en' title = {t('responsiblePersonEn')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors objectCreate-editors__blog">
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.total_funding} register = {register} name = 'total_funding' title = {t('amountFunding')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.planner_ru} register = {register} name = 'planner_ru' title = {t('designerRu')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.planner_kk} register = {register} name = 'planner_kk' title = {t('designerKz')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.planner_en} register = {register} name = 'planner_en' title = {t('designerEn')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.developer_ru} register = {register} name = 'developer_ru' title = {t('builderRu')}/>
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.developer_kk} register = {register} name = 'developer_kk' title = {t('builderKz')} />
                                <EditorText setValue = {setValue} getValues = {getValues} defaultValue = {data.developer_en} register = {register} name = 'developer_en' title = {t('builderEn')} />
                            </div>
                            <div className="objectCreate-item objectCreate-editors">
                                <BlogDraft title = {t('draftProjectRu')} changeDraftProject = {changeDraftProjectRu} />
                                <BlogDraft title = {t('draftProjectKz')} changeDraftProject = {changeDraftProjectKz}/>
                                <BlogDraft title = {t('draftProjectEn')} changeDraftProject = {changeDraftProjectEn}/>
                            </div>
                        </>
                        }
                        <div className="settings-footer">
                            <Cancel/>
                            <button className = 'save btn' type = "submit">
                                { loading ? t('preservation') : t('save') }
                            </button>
                            {isSaved && <Saved />}
                        </div>
                        </form>
                    </div>
                    
                    
                </div>
            </div>
            <Footer />
        </>
    )
};