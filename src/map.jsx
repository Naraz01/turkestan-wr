import React from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L, { DivIcon } from "leaflet"
import { divIcon } from 'leaflet';

const names = [
    {position: [43.290254187176096,68.26432599999998], className: 'myDivIcon', html: 'Туркестан'},
    {position: [42.33269300816081,69.6757185], className: 'myDivIcon', html: 'Шымкент'},
    {position: [43.3880748680563,67.53948615429217], className: 'myDivIcon-blue', html: 'Сырдарья'},
    {position: [43.0680748680563,67.93948615429217], className: 'myDivIcon-blue', html: 'Сырдарья'},
    {position: [43.37288690168756,68.2799949975388], className: 'myDivIcon-blue', html: 'Карашык'},
    {position: [42.83142244442835,69.495952076882], className: 'myDivIcon-blue', html: 'Боген'},
    {position: [42.73142244442835,69.595952076882], className: 'myDivIcon-blue', html: 'Боралдай'},
    {position: [42.64142244442835,69.295952076882], className: 'myDivIcon-blue', html: 'Арыс'},
    {position: [43.43196407323968,68.27175525144506], className: 'myDivIcon-white', html: 'Жуйнек'},
    {position: [43.43902306951999,68.16779799999997], className: 'myDivIcon-white', html: 'Яссы'},
    {position: [43.523968634842255,68.49216845945284], className: 'myDivIcon-white', html: 'Кентау'},
    {position: [43.81355452416456,68.59449249999995], className: 'myDivIcon-white', html: 'ГОРЫ КАРАТАУ'},
    {position: [43.23307813485648,68.59336764965818], className: 'myDivIcon-white', html: '30 лет Казахстана'},
    {position: [43.18890938410169,68.51723299999993], className: 'myDivIcon-white', html: 'Старойкан'},
    {position: [43.304070590860994,68.06212680230132], className: 'myDivIcon-white', html: 'Ушкайык'},
    {position: [42.913428400684694,68.34255260693358], className: 'myDivIcon-white', html: 'Отрар'},
    {position: [42.89946322031038,68.8110998990399], className: 'myDivIcon-white', html: 'Шилик'},
    {position: [42.92924040346459,68.9449957730633], className: 'myDivIcon-white', html: 'Тортколь'},
    {position: [42.77616395377889,68.37189511174648], className: 'myDivIcon-white', html: 'Шульдер'},
    {position: [42.82616395377889,68.19189511174648], className: 'myDivIcon-white', html: 'Баялдыр'},
    {position: [42.43392486217926,68.79829545157088], className: 'myDivIcon-white', html: 'Арысь'},
    {position: [42.37803833362115,69.25248143811207], className: 'myDivIcon-white', html: 'Бадам'},
    {position: [42.48616017209866,69.41770696295156], className: 'myDivIcon-white', html: 'Чубарсу'},
    {position: [42.58616017209866,69.41770696295156], className: 'myDivIcon-white', html: 'Чубаровка'},
    {position: [42.625910845393186,69.17124249999993], className: 'myDivIcon-white', html: 'Ордабасинский район'},
]

export const Maps = ({onFullScreen, isFullScreen}) => {
    /*
    const markerIconBlue = new L.Icon({
        iconUrl: require("./blueIcon.png"),
        iconSize: [40, 45],
        popupAnchor: [3, 15],

    })
    
    const markerIconOrange = new L.Icon({
        iconUrl: require("./orangeIcon.png"),
        iconSize: [40, 45],
        popupAnchor: [3, 15],
    })
    
    const markerIconPurple = new L.Icon({
        iconUrl: require("./purpleIcon.png"),
        iconSize: [40, 45],
        popupAnchor: [3, 15],
    })
    
    const markerIconRed = new L.Icon({
        iconUrl: require("./redIcon.png"),
        iconSize: [40, 45],
        popupAnchor: [3, 15],
    })

    const {general} = useSelector((state) => {
        return {
            general: state.general.data,
        }
    });

*/

    let [channels, setChannels] = React.useState();
    let [reservoirs, setReservoirs] = React.useState();
    let [citySystems, setCitySystems] = React.useState();
    let [environmentals, setEnvironmentals] = React.useState();
    const [loading, setLoading] = React.useState(false);

    /*
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
            getReservoirs.content.forEach((item) => {
                general.forEach((list) => {
                    if (item.id === list.id) {
                        newReservoirs.push(list)
                    }
                })
            })
            setReservoirs(newReservoirs)
            setLoading(true)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
*/
    const [center, setCenter] = React.useState([42.97045762155687,68.94681841702852])
    const [zoom, setZoom] = React.useState(9)
    const [isCardOpen, setIsCardOpen] = React.useState(false)
    const mapRef = React.useRef(null)

    let [id, setId] = React.useState(42)
    let [data, setData] = React.useState();
    const onCardVisibel = (local) => {
        setIsCardOpen(!isCardOpen)
        setId(local.id)
        if (isCardOpen !== false) {
            mapRef.current.setView([42.97045762155687,68.94681841702852], 9);
            setData('')
        } else {
            mapRef.current.setView([local.location.lat, local.location.lng], 12);
            setData(local)
        }
    };
    React.useEffect(() => {
        if (loading) {
            setTimeout(
                () => mapRef.current.invalidateSize(false), 0
            );
        }
    }, [])
    let mybounds = (
        [
            [41.51686545959234,64.83128339062499],
            [44.75806942902366,74.2081144453125]
        ]
    )   
    return (
        <div className={`maps-container ${isFullScreen ? 'maps-container__little' : 'maps-container__full'}`}>
            <MapContainer 
                whenCreated = {(mapInstance)=> { mapRef.current = mapInstance }} 
                center = {center} 
                zoom = {zoom} 
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
            </MapContainer>
          
            
        </div>
        
    )
};
