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
import { ObjectsApi } from '../../services/api/objectsApi'
import { markerIconPurple } from '../home/components/maps/markerIcon'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { objectValidation } from '../../utils/schemmas/objectValidation';
import CloseIcon from '@mui/icons-material/Close';
import { EditorText } from '../../components/editorText/';
import {Cancel} from '../../components/cancel/index';
import {BlogDraft} from './blogDraft';
import {Loading} from '../../components/loading/indexx';
import { Saved } from "../../components/saved";

export const UpdateObject = () => {
    const {t} = useTranslation()
    const {id} = useParams()

    const createObjectForm = useForm({
        defaultValues: {
            name_ru: "",
            name_kk: "",
            name_en: "",
            type: null,
            status: null,
            video1: "",
            video2: "",
            video3: "",
            video4: "",
            video5: "",

        },
        mode: 'onSubmit',
        resolver: yupResolver(objectValidation)
    })

    const [data, setData] = React.useState();
    const [selectType, setSelectType] = React.useState('null');
    const onSelectType = (value) => {
        console.log(value.target.value)
        setSelectType(value.target.value)
    }
    const [isSaved, setIsSaved] = React.useState(false)
    const [isMagistral, setIsMagistral] = React.useState(false)
    const [volume, setVolume] = React.useState('')
    const [length, setLength] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [location, setLocation] = React.useState([])
    const [img, setImg] = React.useState([]);

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

    const [expectedResultRu, setExpectedResultRu] = React.useState(null)
    const [expectedResultKz, setExpectedResultKz] = React.useState(null)
    const [expectedResultEn, setExpectedResultEn] = React.useState(null)

    const changeExpectedResultRu = (text) => {
        setExpectedResultRu(text)
    }
    const changeExpectedResultKz = (text) => {
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

    const [amountFunding, setAmountFunding] = React.useState("")
    const changeAmountFunding = (text) => {
        setAmountFunding(text)
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
    const mapRef = React.useRef(null)
    
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

    const getData = async () => {
        try {
            const obj = await ObjectsApi.fetchFindOne(id);
            setData(obj.content)
            let list = obj.content
            createObjectForm.setValue( "name_ru", list.name_ru );
            createObjectForm.setValue( "name_kk", list.name_kk );
            createObjectForm.setValue( "name_en", list.name_en );
            setLocation([list.location])
            createObjectForm.setValue( "type", list.type.id );
            setSelectType(list.type.id.toString())
            createObjectForm.setValue( "status", list.status.id );
            setIsMagistral(list.isMagistral)
            setLength(list.length)
            setVolume(list.volume)
            setImg(list.photos)
            createObjectForm.setValue( "video1", list.video[0] );
            createObjectForm.setValue( "video2", list.video[1] );
            createObjectForm.setValue( "video3", list.video[2] );
            createObjectForm.setValue( "video4", list.video[3] );
            createObjectForm.setValue( "video5", list.video[4] );
            setObjectTaskRu(list.goal_ru)
            setObjectTaskKz(list.goal_kk)
            setObjectTaskEn(list.goal_kk)
            setExpectedResultRu(list.expectation_ru)
            setExpectedResultKz(list.expectation_kk)
            setExpectedResultEn(list.expectation_en)
            setWaterSourceRu(list.water_spring_ru)
            setWaterSourceKz(list.water_spring_kk)
            setWaterSourceEn(list.water_spring_en)
            setWaterDisposalRu(list.water_disposal_ru)
            setWaterDisposalKz(list.water_disposal_kk)
            setWaterDisposalEn(list.water_disposal_en)
            setTechnicalSolutionRu(list.technical_solution_ru)
            setTechnicalSolutionKz(list.technical_solution_kk)
            setTechnicalSolutionEn(list.technical_solution_en)
            setResponsiblePersonRu(list.responsible_person_ru)
            setResponsiblePersonKz(list.responsible_person_kk)
            setResponsiblePersonEn(list.responsible_person_en)
            setDesignerRu(list.planner_ru)
            setDesignerKz(list.planner_kk)
            setDesignerEn(list.planner_en)
            setAmountFunding(list.total_funding)
            setBuilderRu(list.developer_ru)
            setBuilderKz(list.developer_kk)
            setBuilderEn(list.developer_en)
            setDraftProjectRu(list.project_draft_ru)
            setDraftProjectKz(list.project_draft_kk)
            setDraftProjectEn(list.project_draft_en)
        } catch(error) {
            console.log('fetchFindOne', error)
        }
    }
    React.useEffect(() => {
        getData()
    }, [id])
    


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
    React.useEffect(() => {
        document.addEventListener('touchstart', {passive: true});
    },[])
    const updateObject = async (list) => {
        try {
            setLoading(true)
            let object = {
                type: list.type,
                status: list.status,
                volume: volume,
                length: length,
                location: location[0],
                isMagistral: isMagistral,
                name_ru: list.name_ru,
                name_kk: list.name_kk,
                name_en: list.name_en,
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
                photos: img,
                video: createObjectForm.getValues('video1') || createObjectForm.getValues('video2') || createObjectForm.getValues('video3') || createObjectForm.getValues('video4') || createObjectForm.getValues('video5') ? [list.video1, list.video2, list.video3, list.video4, list.video5] : null
            }
            await ObjectsApi.updateObject(id, object)
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
                    <form onSubmit = {createObjectForm.handleSubmit(updateObject)}>
                    {
                        loading ?
                        <Loading/>
                        :
                        <>
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
                                    value = {selectType}
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
                                    value = {selectType}
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
                                    id="scales"
                                /> 
                                <label className = "objectCreate-item__title" htmlFor = "scales"> {t('trunk')} </label>
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
                            {
                                (selectType === 'null' || selectType === '1' || selectType === '4') &&
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
                            </div>
                            <div className = 'objectCreate-item'>
                                {
                                    img && img.map((item, i) => {
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
                                    name = "video1" 
                                    {...createObjectForm.register('video1')}
                                    className = {'forms-input'}
                                />
                                <input 
                                    name = "video2" 
                                    {...createObjectForm.register('video2')}
                                    className = {'forms-input'}
                                />
                                <input 
                                    name = "video3" 
                                    {...createObjectForm.register('video3')}
                                    className = {'forms-input'}
                                />
                                <input 
                                    name = "video4" 
                                    {...createObjectForm.register('video4')}
                                    className = {'forms-input'}
                                />
                                <input
                                    name = "video5" 
                                    {...createObjectForm.register('video5')}
                                    className = {'forms-input'}
                                />
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText changeText = { changeObjectTaskRu } text = {objectTaskRu} title = {t('objectTaskRu')}/>
                                <EditorText changeText = { changeObjectTaskKz } text = {objectTaskKz} title = {t('objectTaskKz')} />
                                <EditorText changeText = { changeObjectTaskEn } text = {objectTaskEn} title = {t('objectTaskKz')} />
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText changeText = { changeExpectedResultRu } text = {expectedResultRu} title = {t('expectedResultRu')}/>
                                <EditorText changeText = { changeExpectedResultKz } text = {expectedResultKz} title = {t('expectedResultKz')}/>
                                <EditorText changeText = { changeExpectedResultEn } text = {expectedResultEn} title = {t('expectedResultEn')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText changeText = { changeWaterSourceRu } text = {waterSourceRu} title = {t('waterSourceRu')}/>
                                <EditorText changeText = { changeWaterSourceKz } text = {waterSourceKz} title = {t('waterSourceKz')} />
                                <EditorText changeText = { changeWaterSourceEn } text = {waterSourceEn} title = {t('waterSourceEn')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText changeText = { changeWaterDisposalRU } text = {waterDisposalRu} title = {t('waterDisposalRu')} />
                                <EditorText changeText = { changeWaterDisposalKz } text = {waterDisposalKz} title = {t('waterDisposalKz')}/>
                                <EditorText changeText = { changeWaterDisposalEn } text = {waterDisposalEn} title={t('waterDisposalEn')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText changeText = { changeTechnicalSolutionRu } text = {technicalSolutionRu} title = {t('technicalSolutionRu')}/>
                                <EditorText changeText = { changeTechnicalSolutionKz } text = {technicalSolutionKz} title = {t('technicalSolutionKz')} />
                                <EditorText changeText = { changeTechnicalSolutionEn } text = {technicalSolutionEn} title = {t('technicalSolutionEn')}/>
                            </div>
                            <p className = "customer-title"> {t('customer')} </p>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText changeText = { changeResponsiblePersonRu } text = {responsiblePersonRu} title = {t('responsiblePersonRu')}/>
                                <EditorText changeText = { changeResponsiblePersonKz } text = {responsiblePersonKz} title = {t('responsiblePersonKz')} />
                                <EditorText changeText = { changeResponsiblePersonEn } text = {responsiblePersonEn} title = {t('responsiblePersonEn')} />
                            </div>
                            <div className = "objectCreate-item objectCreate-editors objectCreate-editors__blog">
                                <EditorText changeText = { changeAmountFunding } text = {amountFunding} title = {t('amountFunding')}/>
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText changeText = { changeDesignerRu } text = {designerRu} title = {t('designerRu')}/>
                                <EditorText changeText = { changeDesignerKz } text = {designerKz} title = {t('designerKz')}/>
                                <EditorText changeText = { changeDesignerEn } text = {designerEn} title = {t('designerEn')} />
                            </div>
                            <div className = "objectCreate-item objectCreate-editors">
                                <EditorText changeText = { changeBuilderRu } text = {builderRu} title = {t('builderRu')} />
                                <EditorText changeText = { changeBuilderKz } text = {builderKz} title = {t('builderKz')}/>
                                <EditorText changeText = { changeBuilderEn } text = {builderEn} title = {t('builderEn')}/>
                            </div>
                            <div className="objectCreate-item objectCreate-editors">
                                <BlogDraft title = {t('draftProjectRu')} changeDraftProject = {changeDraftProjectRu} draftProject = {draftProjectRu} />
                                <BlogDraft title = {t('draftProjectKz')} changeDraftProject = {changeDraftProjectKz} draftProject = {draftProjectKz} />
                                <BlogDraft title = {t('draftProjectEn')} changeDraftProject = {changeDraftProjectEn} draftProject = {draftProjectEn} />
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