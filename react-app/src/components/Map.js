import React, { useCallback } from 'react';
import { useState, UseCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


function Map() {
    //center of map

    const [currPos, setCurrPos] = useState({ lat: 50, lng: -90 })
    const [map, setMap] = useState(null)
    //script tag equiv. below
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: ProcessingInstruction.env.REACT_APP_MAPS_KEY
    })

    const containerSize = {
        width: "400px",
        height: "600px"
    };

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    // set container height, always.
    return (
        <div className="map_page__container">
            This is a map component.
            <div style={{ height: '700px', width: '500px' }}>
                {isLoaded && <GoogleMap mapContainerSize={containerSize} zoom={8} center={currPos} onUnmount={onUnmount}></GoogleMap>}
            </div>
        </div>
    )

}

export default Map