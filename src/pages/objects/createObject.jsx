import React from "react";
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import { Helmet } from "react-helmet";
import { Footer } from "../../components/footer";
import { Back } from '../../components/back'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { polyline } from "leaflet"
import { divIcon } from 'leaflet';
import { antPath } from "leaflet-ant-path";
import { animation } from '../home/components/maps/animation'
import { names } from '../home/components/maps/names'
import { PolylineAll } from '../home/components/maps/polylineAll'
import { PolygonAll } from '../home/components/maps/polygonAll'
import { EditorText } from '../../components/editorText/';
import { ObjectsApi } from '../../services/api/objectsApi'
import {markerIconPurple} from '../home/components/maps/markerIcon'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { objectValidation } from '../../utils/schemmas/objectValidation';
import { Loading } from '../../components/loading/indexx';
import {Cancel} from '../../components/cancel/index';
import {BlogDraft} from './blogDraft';
import { Saved } from "../../components/saved";

export const CreateObject = () => {
    const {t} = useTranslation()
    const createObjectForm = useForm({
        defaultValues: {
            name_ru: "",
            name_kk: "",
            name_en: "",
            type: null,
            status: null,
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(objectValidation)
    })
    const [volume, setVolume] = React.useState("")
    const [length, setLength] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [isSaved, setIsSaved] = React.useState(false)
    const [selectType, setSelectType] = React.useState('');

    const [video1, setVideo1] = React.useState("")
    const [video2, setVideo2] = React.useState("")
    const [video3, setVideo3] = React.useState("")
    const [video4, setVideo4] = React.useState("")
    const [video5, setVideo5] = React.useState("")

    const onSelectType = (value) => {
        setSelectType(value.target.value)
    }

    const [objectTaskRu, setObjectTaskRu] = React.useState(null)
    const [objectTaskKz, setObjectTaskKz] = React.useState(null)
    const [objectTaskEn, setObjectTaskEn] = React.useState(null)
    const changeObjectTaskRu = (text) => {
        setObjectTaskRu(text)
    }
    const changeObjectTaskKz = (text) => {
        setObjectTaskKz(text)
    }
    const changeObjectTaskEn = (text) => {
        setObjectTaskEn(text)
    }

    const [amountFunding, setAmountFunding] = React.useState("")
    const changeAmountFunding = (text) => {
        setAmountFunding(text)
    }

    const [expectedResultRu, setExpectedResultRu] = React.useState(null)
    const [expectedResultKz, setExpectedResultKz] = React.useState(null)
    const [expectedResultEn, setExpectedResultEn] = React.useState(null)

    const changeExpectedResultRu = (text) => {
        setExpectedResultRu(text)
    }
    const changeEpectedResultKz = (text) => {
        setExpectedResultKz(text)
    }
    const changeExpectedResultEn = (text) => {
        setExpectedResultEn(text)
    }

    const [waterSourceRu, setWaterSourceRu] = React.useState(null)
    const [waterSourceKz, setWaterSourceKz] = React.useState(null)
    const [waterSourceEn, setWaterSourceEn] = React.useState(null)
    const changeWaterSourceRu = (text) => {
        setWaterSourceRu(text)
    }
    const changeWaterSourceKz = (text) => {
        setWaterSourceKz(text)
    }
    const changeWaterSourceEn = (text) => {
        setWaterSourceEn(text)
    }

    const [waterDisposalRu, setWaterDisposalRu] = React.useState(null)
    const [waterDisposalKz, setWaterDisposalKz] = React.useState(null)
    const [waterDisposalEn, setWaterDisposalEn] = React.useState(null)
    const changeWaterDisposalRU = (text) => {
        setWaterDisposalRu(text)
    }
    const changeWaterDisposalKz = (text) => {
        setWaterDisposalKz(text)
    }
    const changeWaterDisposalEn = (text) => {
        setWaterDisposalEn(text)
    }

    const [technicalSolutionRu, setTechnicalSolutionRu] = React.useState(null)
    const [technicalSolutionKz, setTechnicalSolutionKz] = React.useState(null)
    const [technicalSolutionEn, setTechnicalSolutionEn] = React.useState(null)
    const changeTechnicalSolutionRu = (text) => {
        setTechnicalSolutionRu(text)
    }
    const changeTechnicalSolutionKz = (text) => {
        setTechnicalSolutionKz(text)
    }
    const changeTechnicalSolutionEn = (text) => {
        setTechnicalSolutionEn(text)
    }

    const [responsiblePersonRu, setResponsiblePersonRu] = React.useState(null)
    const [responsiblePersonKz, setResponsiblePersonKz] = React.useState(null)
    const [responsiblePersonEn, setResponsiblePersonEn] = React.useState(null)
    const changeResponsiblePersonRu = (text) => {   
        setResponsiblePersonRu(text)
    }
    const changeResponsiblePersonKz = (text) => {
        setResponsiblePersonKz(text)
    }
    const changeResponsiblePersonEn = (text) => {
        setResponsiblePersonEn(text)
    }

    const [designerRu, setDesignerRu] = React.useState(null)
    const [designerKz, setDesignerKz] = React.useState(null)
    const [designerEn, setDesignerEn] = React.useState(null)
    const changeDesignerRu = (text) => {   
        setDesignerRu(text)
    }
    const changeDesignerKz = (text) => {
        setDesignerKz(text)
    }
    const changeDesignerEn = (text) => {
        setDesignerEn(text)
    }

    const [builderRu, setBuilderRu] = React.useState(null)
    const [builderKz, setBuilderKz] = React.useState(null)
    const [builderEn, setBuilderEn] = React.useState(null)
    const changeBuilderRu = (text) => {   
        setBuilderRu(text)
    }
    const changeBuilderKz = (text) => {
        setBuilderKz(text)
    }
    const changeBuilderEn = (text) => {
        setBuilderEn(text)
    }

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

    const [location, setLocation] = React.useState([])
    const mapRef = React.useRef(null)
    
    let mybounds = (
        [
            [43.04781870279426, 68.967758]
        ]
    )
    
    function addAnimations(){
        const map  = mapRef.current;
        animation.forEach((anime) => {
            const antPolyline = antPath(anime.positions, { 
                use: polyline, 
                color: anime.color,
                pulseColor: anime.pulseColor, 
                weight: 2, 
                dashArray: [4, 10], 
                reverse: true,
                delay: 1000
            })
            antPolyline.addTo(map)
        })
    }

    function MyLocation() {
        useMapEvents({
          click: (e) => {
            setLocation([e.latlng])
          },
        })
        return null
    }

    const [isMagistral, setIsMagistral] = React.useState(false)
    let [img, setImg] = React.useState([]);

    const sendFile = async (e) => {
        try {
            let lists = e.target.files;
            const data = new FormData();
            let newImg = []
            for (let i = 0; i < lists.length; i++) {
                data.append('file', lists[i])
                let obj = await ObjectsApi.uploadImage(data)
                const createImg = {
                    url: obj.content.value,
                    type: lists[i].type,
                    name: lists[i].name,
                }
                newImg.push(createImg)
            }
            setImg([...img, ...newImg])
            console.log(img)
        } catch(error) {
            console.log('sendFile', error)
        }
    }

    const deleteImg = (item) => {
        let newImg = img.filter((photo) => {
            return photo !== item;
        })
        setImg(newImg)
    }

    const setObject = async (data) => {
        try {
            console.log(data)
            setLoading(true)
            let object = {
                type: data.type,
                status: data.status,
                volume: volume,
                length: length,
                location: location[0],
                isMagistral: isMagistral,
                name_ru: data.name_ru,
                name_kk: data.name_kk,
                name_en: data.name_en,
                goal_ru: objectTaskRu,
                goal_kk: objectTaskKz,
                goal_en: objectTaskEn,
                expectation_ru: expectedResultRu,
                expectation_kk: expectedResultKz,
                expectation_en: expectedResultEn,
                water_presence_ru: "ru",
                water_presence_kk: "kk",
                water_presence_en: "en",
                water_spring_ru: waterSourceRu,
                water_spring_kk: waterSourceKz,
                water_spring_en: waterSourceEn,
                water_disposal_ru: waterDisposalRu,
                water_disposal_kk: waterDisposalKz,
                water_disposal_en: waterDisposalEn,
                work_type_ru: null,
                work_type_kk: null,
                work_type_en: null,
                technical_solution_ru: technicalSolutionRu,
                technical_solution_kk: technicalSolutionKz,
                technical_solution_en: technicalSolutionEn,
                description_ru: "Описание",
                description_kk: null,
                description_en: null,
                responsible_person_ru: responsiblePersonRu,
                responsible_person_kk: responsiblePersonKz,
                responsible_person_en: responsiblePersonEn,
                total_funding: amountFunding,
                planner_ru: designerRu,
                planner_kk: designerKz,
                planner_en: designerEn,
                developer_ru: builderRu,
                developer_kk: builderKz,
                developer_en: builderEn,
                project_draft_ru: draftProjectRu,
                project_draft_kk: draftProjectKz,
                project_draft_en: draftProjectEn,
                photos: img.length === 0 ? null : img,
                video: video1 || video2 || video3 || video4 || video5 ? [video1, video2, video3, video4, video5] : null
            }
            let obj = await ObjectsApi.setObject(object)
            setIsSaved(true)
            setLoading(false)
        } catch(error) {
            console.log('setObject', error)
            setLoading(true)
        }
    }

    return (
        <>
            <Helmet>
                <html lang = { i18next.language }/>
                <title>
                    {t('createObject')}
                </title>
            </Helmet>
            <div className = "objectCreate backgroundColor pad-top">
                <div className = "container">
                    <div className="settings-head">
                        <Back />
                        <p>
                            {t('createObject')}
                        </p>
                    </div>
                    <div className = "objectCreate-data">
                    {
                    loading ? 
                    <>
                        <Loading />
                        <div className="saved-successfully">
                            {t('preservation')}
                        </div>
                    </>
                        :
                        
                    <form onSubmit = {createObjectForm.handleSubmit(setObject)}>
                        <div className = "objectCreate-item">
                            <p className = "objectCreate-item__title"> {t('nameInRu')} *</p>
                            <input 
                                name = "name_ru" 
                                className = {createObjectForm.formState.errors.name_ru ? 'forms-input forms-input__error' : "forms-input"}
                                {...createObjectForm.register('name_ru')}
                            />
                            <p> {createObjectForm.formState.errors.name_ru?.message} </p>
                        </div>
                        <div className = "objectCreate-item">
                            <p className = "objectCreate-item__title"> {t('nameInKz')} *</p>
                            <input 
                                name = "name_kk" 
                                className = {createObjectForm.formState.errors.name_kk ? 'forms-input forms-input__error' : "forms-input"}
                                {...createObjectForm.register('name_kk')}
                            />
                            <p> {createObjectForm.formState.errors.name_kk?.message} </p>
                        </div>
                        <div className = "objectCreate-item">
                            <p className = "objectCreate-item__title"> {t('nameInEn')} *</p>
                            <input 
                                name = "name_en" 
                                className = {createObjectForm.formState.errors.name_en ? 'forms-input forms-input__error' : "forms-input"}
                                {...createObjectForm.register('name_en')}
                            />
                            <p> {createObjectForm.formState.errors.name_en?.message} </p>
                        </div>
                        <div className = "objectCreate-lists">
                            <div className="objectCreate-list">
                                <p className = "objectCreate-item__title"> {t('objectType')} *</p>
                                <select 
                                    name = "type"
                                    className = "objectCreate-list__select"
                                    {...createObjectForm.register('type')}
                                    onChange = {onSelectType}
                                    >
                                    <option disabled value = '0' className="option-delete"> </option>
                                    <option value = '1'> {t('reservoir')} </option>
                                    <option value = '2'> {t('channels')} </option>
                                    <option value = '3'> {t('citySystem')} </option>
                                    <option value = '4'> {t('conservationFacilities')} </option>
                                </select>
                                <p> {createObjectForm.formState.errors.type?.message} </p>
                            </div>
                            <div className="objectCreate-list">
                                <p className = "objectCreate-item__title"> {t('objectStatus')} *</p>
                                <select 
                                    name = "status"
                                    className="objectCreate-list__select"
                                    {...createObjectForm.register('status')}
                                    >
                                    <option disabled value = '0' className="option-delete"> </option>
                                    <option value = '1'> {t('awaitingFunding')} </option>
                                    <option value = '2'> {t('planningStage')} </option>
                                    <option value = '3'> {t('underConstruction')} </option>
                                    <option value = '4'> {t('finished')} </option>
                                </select>
                                <p> {createObjectForm.formState.errors.status?.message} </p>
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
                                    id = {'scales'}
                                /> 
                                <label htmlFor = "scales" className = "objectCreate-item__title"> {t('trunk')} </label>
                            </div>
                        }
                        <div className = "objectCreate-item">
                            <p className = "objectCreate-item__title"> {t('location')} *</p>
                            <div className="objectCreate-maps">
                                <MapContainer
                                    whenCreated = {(mapInstance)=> { mapRef.current = mapInstance; addAnimations() }}
                                    center = {[43.04781870279426,68.967758]}
                                    zoom = {9}
                                    scrollWheelZoom = {false}
                                    maxBounds = {mybounds}
                                    zoomControl = {false}
                                    doubleClickZoom = {false}
                                    attributionControl = {false}
                                >
                                    <TileLayer url={'https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=RJz2g9YsjbZqCKNLt7oN'} attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'} />
                                        {names.map((name, i) => {
                                            return (<Marker
                                                key={i}
                                                position={name.position}
                                                icon ={divIcon({html: name.html,
                                                className:name.className})}>
                                            </Marker>)
                                            }
                                        )}
                                          
                                        <MyLocation />
                                        {
                                            location.map((item, i) => {
                                                return (<Marker
                                                    key = {i}
                                                    position = {[item.lat, item.lng]}
                                                    icon = {markerIconPurple}
                                                />)       
                                            })
                                        }
                                        <PolylineAll />
                                        <PolygonAll />
                                </MapContainer>                                  
                            </div>
                        </div>
                        {
                            (selectType === null || selectType === '1' || selectType === '4') &&
                            <div className = "objectCreate-item">
                                <p className = "objectCreate-item__title"> {t('volumeObject')}</p>
                                <input 
                                    type = "text"
                                    value = {volume} 
                                    onChange = {(e) => setVolume(e.target.value)}
                                    className = {'forms-input'}
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
                                        type = "text"
                                        value = {length} 
                                        onChange = {(e) => setLength(e.target.value)}
                                        className = {'forms-input'}
                                    />
                                </div>
                            </>
                        }
                        <div className="objectCreate-item">
                            <p className = "objectCreate-item__title"> {t('photography5')} </p>
                            <div>
                                <input 
                                    type = "file"
                                    className = "forms-input__file"
                                    accept = ".jpg, .jpeg, .png"
                                    name = "fileUpload[]"
                                    multiple
                                    onChange={(e) => sendFile(e)}
                                />
                            </div>
                        </div>
                        <div className = 'objectCreate-item'>
                                {
                                    img.map((item, i) => {
                                        return (
                                            <div className = 'objectCreate-item__images' key = {i}>
                                                <div className = "objectCreate-item__block">
                                                    <div className = 'objectCreate-item__image'>
                                                        <img src = {`https://dev14.panama.kz/${item.url}`} alt = "#"/>
                                                    </div>
                                                    <p className = "objectCreate-item__p">{item.name}</p>
                                                </div>
                                                <div className = 'objectCreate-item__image-delete' onClick = {() => deleteImg(item)}>
                                                    <CloseIcon style = {{fontSize: '14px', color: '#22577E'}} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>

                        <div className = "objectCreate-lists objectCreate-lists__you">
                            <p className = "objectCreate-item__title"> {t('youTubeLink')} </p>
                            <p></p>
                            <input 
                                type = "text"
                                value = {video1} 
                                onChange = {(e) => setVideo1(e.target.value)}
                                className = {'forms-input'}
                            />
                            <input 
                                type = "text"
                                value = {video2} 
                                onChange = {(e) => setVideo2(e.target.value)}
                                className = {'forms-input'}
                            />
                            <input 
                                type = "text"
                                value = {video3} 
                                onChange = {(e) => setVideo3(e.target.value)}
                                className = {'forms-input'}
                            />
                            <input 
                                type = "text"
                                value = {video4} 
                                onChange = {(e) => setVideo4(e.target.value)}
                                className = {'forms-input'}
                            />
                            <input 
                                type = "text"
                                value = {video5} 
                                onChange = {(e) => setVideo5(e.target.value)}
                                className = {'forms-input'}
                            />
                        </div>
                        <div className = "objectCreate-item objectCreate-editors">
                            <EditorText changeText = { changeObjectTaskRu } title = {t('objectTaskRu')}/>
                            <EditorText changeText = { changeObjectTaskKz } title = {t('objectTaskKz')}/>
                            <EditorText changeText = { changeObjectTaskEn } title = {t('objectTaskEn')}/>
                        </div>
                        <div className = "objectCreate-item objectCreate-editors">
                            <EditorText changeText = { changeExpectedResultRu } title = {t('expectedResultRu')}/>
                            <EditorText changeText = { changeEpectedResultKz } title = {t('expectedResultKz')}/>
                            <EditorText changeText = { changeExpectedResultEn } title = {t('expectedResultEn')}/>
                        </div>
                        <div className = "objectCreate-item objectCreate-editors">
                            <EditorText changeText = { changeWaterSourceRu } title = {t('waterSourceRu')} />
                            <EditorText changeText = { changeWaterSourceKz } title = {t('waterSourceKz')}/>
                            <EditorText changeText = { changeWaterSourceEn } title = {t('waterSourceEn')}/>
                        </div>
                        <div className = "objectCreate-item objectCreate-editors">
                            <EditorText changeText = { changeWaterDisposalRU } title = {t('waterDisposalRu')}/>
                            <EditorText changeText = { changeWaterDisposalKz } title = {t('waterDisposalKz')}/>
                            <EditorText changeText = { changeWaterDisposalEn } title = {t('waterDisposalEn')}/>
                        </div>
                        <div className = "objectCreate-item objectCreate-editors">
                            <EditorText changeText = { changeTechnicalSolutionRu } title = {t('technicalSolutionRu')} />
                            <EditorText changeText = { changeTechnicalSolutionKz } title = {t('technicalSolutionKz')} />
                            <EditorText changeText = { changeTechnicalSolutionEn } title = {t('technicalSolutionEn')} />
                        </div>
                        <p className = "customer-title"> {t('customer')} </p>
                        <div className = "objectCreate-item objectCreate-editors">
                            <EditorText changeText = { changeResponsiblePersonRu } title = {t('responsiblePersonRu')}/>
                            <EditorText changeText = { changeResponsiblePersonKz } title = {t('responsiblePersonKz')}/>
                            <EditorText changeText = { changeResponsiblePersonEn } title = {t('responsiblePersonEn')}/>
                        </div>
                        <div className = "objectCreate-item objectCreate-editors objectCreate-editors__blog">
                            <EditorText changeText = { changeAmountFunding } title = {t('amountFunding')}/>
                        </div>
                        <div className = "objectCreate-item objectCreate-editors">
                            <EditorText changeText = { changeDesignerRu } title = {t('designerRu')}/>
                            <EditorText changeText = { changeDesignerKz } title = {t('designerKz')}/>
                            <EditorText changeText = { changeDesignerEn } title = {t('designerEn')}/>
                        </div>
                        <div className = "objectCreate-item objectCreate-editors">
                            <EditorText changeText = { changeBuilderRu } title = {t('builderRu')}/>
                            <EditorText changeText = { changeBuilderKz } title = {t('builderKz')} />
                            <EditorText changeText = { changeBuilderEn } title = {t('builderEn')} />
                        </div>
                        <div className="objectCreate-item objectCreate-editors">
                            <BlogDraft title = {t('draftProjectRu')} changeDraftProject = {changeDraftProjectRu} />
                            <BlogDraft title = {t('draftProjectKz')} changeDraftProject = {changeDraftProjectKz}/>
                            <BlogDraft title = {t('draftProjectEn')} changeDraftProject = {changeDraftProjectEn}/>
                        </div>

                        <div className="settings-footer">
                            <Cancel />
                            <button className = 'save btn' type = "submit">
                                { loading ? t('preservation') : t('save') }
                            </button>
                            {isSaved && <Saved />}
                        </div>
                        </form>
                    }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};