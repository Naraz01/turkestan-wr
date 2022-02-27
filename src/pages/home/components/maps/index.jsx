import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { polyline } from "leaflet"
import { divIcon } from 'leaflet';
import { Card } from "../../../../components/card";
import { MenuApi } from "../../../../services/api/menuApi";
import { DownloadBtn } from "../../../../components/card/downloadBtn";
import { PolylineAll } from "./polylineAll";
import { PolygonAll } from "./polygonAll";
import fullScreen from './fullScreen.svg'
import { Loading } from "../../../../components/loading/indexx";
import {antPath} from "leaflet-ant-path";
import {animation} from './animation'
import {names} from './names'
import {markerIconBlue, markerIconOrange, markerIconPurple} from './markerIcon'
import {GeneralApi} from '../../../../services/api/generalApi'

export const Maps = ({onFullScreen, isFullScreen}) => {

    const [general, setGeneral] = React.useState();
    const getGeneral = async () => {
        try {
            let obj = await GeneralApi.fetchGeneral()
            setGeneral(obj.content)
        } catch(error) {
            console.log('getGeneral', error)
        }
    }

    React.useEffect(() => {
        getGeneral()
    }, [])
/*    const {general} = useSelector((state) => {
        return {
            general: state.general.data,
        }
    });
*/
    function addAnimations(){
        const map  = mapRef.current;
        animation.forEach((anime) => {
            const antPolyline = antPath(anime.positions, { 
                use: polyline, 
                color: anime.color,
                pulseColor: anime.pulseColor, 
                weight: 2, 
                dashArray: [5, 12], 
                reverse: true,
                delay: 1000
            })
            antPolyline.addTo(map)
        })
    }

    let [channels, setChannels] = React.useState()
    let [reservoirs, setReservoirs] = React.useState()
    let [citySystems, setCitySystems] = React.useState()
    let [environmentals, setEnvironmentals] = React.useState()
    const [loading, setLoading] = React.useState(false)

    const getData = async () => {
        try {
            const getChannels = await MenuApi.fetchChannels();
            let newChannels = [];
            getChannels.content.forEach((item) => {
                general.forEach((list) => {
                    if (item.id === list.id) {
                        newChannels.push(list)
                    }
                })
            })
            setChannels(newChannels)


            const getCitySystems = await MenuApi.fetchCitySystems();
            let newCitySystems = [];
            getCitySystems.content.forEach((item) => {
                general.forEach((list) => {
                    if (item.id === list.id) {
                        newCitySystems.push(list)
                    }
                })
            })
            setCitySystems(newCitySystems)

            const getEnvironmentals = await MenuApi.fetchEnvironmentals();
            let newEnvironmentals = [];
            getEnvironmentals.content.forEach((item) => {
                general.forEach((list) => {
                    if (item.id === list.id) {
                        newEnvironmentals.push(list)
                    }
                })
            })
            setEnvironmentals(newEnvironmentals)

            const getReservoirs = await MenuApi.fetchReservoirs();

            let newReservoirs = [];
            getReservoirs.content.forEach((item, i) => {
                general.forEach((list) => {
                    if (item.id === list.id) {
                        newReservoirs.push(list)
                    }
                })
            })
            setReservoirs(newReservoirs)
            setLoading(true)
        } catch (error) {
            setLoading(false)
        }
    }
    const [isCardOpen, setIsCardOpen] = React.useState(false)
    const mapRef = React.useRef(null)

    let [id, setId] = React.useState(42)
    const onCardVisibel = (local) => {
        setIsCardOpen(true)
        setId(local.id)
            mapRef.current.setView([local.location.lat, local.location.lng], 11);
        
    };
    React.useEffect(() => {
        getData()
        setLoading(false)
    }, [general])
    
    let mybounds = (
        [
            [41.51686545959234,64.83128339062499],
            [44.75806942902366,74.2081144453125]
        ]
    )
    const OnCardVisibelClose = () => {
        useMapEvents({
          click: (e) => {
            setIsCardOpen(false)
            mapRef.current.setView([42.97045762155687,68.94681841702852], 9);
          },
        })
        return null
    }
    if (!loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className={`maps-container ${isFullScreen ? 'maps-container__little' : 'maps-container__full'}`}>
            <MapContainer
                whenCreated = {(mapInstance)=> { mapRef.current = mapInstance; addAnimations() }}
                center = {[42.97045762155687,68.94681841702852]}
                zoom = {9}
                scrollWheelZoom = {false}
                maxBounds = {mybounds}
                zoomControl = {false}
                doubleClickZoom = {false}
                attributionControl = {false}
            >
                <TileLayer url={'https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=RJz2g9YsjbZqCKNLt7oN'} attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'} />
                    {channels &&
                        channels.map((local) => {
                            return (
                                <Marker
                                    position={[local.location.lat, local.location.lng]}
                                    key={local.id}
                                    icon = {markerIconPurple}
                                    eventHandlers={{
                                        click: (e) => {
                                            onCardVisibel(local)
                                        },
                                    }}>
                                </Marker>
                            )
                        })
                    }

                    {environmentals &&
                        environmentals.map((local) => {
                            return (
                                <Marker
                                    position={[local.location.lat, local.location.lng]}
                                    key={local.id}
                                    icon = {markerIconBlue}
                                    eventHandlers={{
                                        click: (e) => {
                                            onCardVisibel(local)
                                        },
                                    }}>
                                </Marker>
                            )
                        })
                    }

                    {reservoirs &&
                        reservoirs.map((local) => {
                            return (
                                <Marker
                                    position={[local.location.lat, local.location.lng]}
                                    key={local.id}
                                    icon = {markerIconOrange}
                                    eventHandlers={{
                                        click: (e) => {
                                            onCardVisibel(local)
                                        },
                                    }}>
                                </Marker>
                            )
                        })
                    }
                    {citySystems &&
                        citySystems.map((local) => {
                            return (
                                <Marker
                                    position={[local.location.lat, local.location.lng]}
                                    key={local.id}
                                    icon = {markerIconBlue}
                                    eventHandlers={{
                                        click: (e) => {
                                            onCardVisibel(local)
                                        },
                                    }}>
                                </Marker>
                            )
                        })
                    }
                        {names.map((name, i) => {
                            return (<Marker
                                key={i}
                                position={name.position}
                                icon ={divIcon({html: name.html,
                                className:name.className})}>
                            </Marker>)
                            }
                        )}

                <PolylineAll />
                <PolygonAll />
                <OnCardVisibelClose />

            </MapContainer>
            {
                isCardOpen
                    &&
                <Card
                    id = {id}
                    visibel = {() => {
                        setIsCardOpen(!isCardOpen)
                        mapRef.current.setView([42.97045762155687,68.94681841702852], 9);
                    }}
                />
            }
            <div className="maps-downloand">
                <DownloadBtn />
            </div>
            <div className="maps-fullScreen" onClick={onFullScreen}>
                <img src={fullScreen} alt="#"/>
            </div>
        </div>

    )
};
