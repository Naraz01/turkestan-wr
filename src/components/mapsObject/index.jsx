import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { polyline } from "leaflet"
import { divIcon } from 'leaflet';
import { antPath } from "leaflet-ant-path";
import { animation } from '../../pages/home/components/maps/animation'
import { names } from '../../pages/home/components/maps/names'
import { PolylineAll } from '../../pages/home/components/maps/polylineAll'
import { PolygonAll } from '../../pages/home/components/maps/polygonAll'
import { markerIconPurple } from '../../pages/home/components/maps/markerIcon'

export const MapsObject = ({locationMap, setLocationMaps}) => { 
    const [location, setLocation] = React.useState([])
    const mapRef = React.useRef(null)
    
    let mybounds = (
        [
            [43.04781870279426, 68.967758]
        ]
    )
    
    React.useEffect(() => {
        setLocation(locationMap)
    }, [locationMap])

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

    const MyLocation = () => {
        useMapEvents({
          click: (e) => {
            setLocation([e.latlng])
            setLocationMaps([e.latlng])
          },
        })
        return null
    }

    return (
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
                location && location.map((item, i) => {
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
    )
};