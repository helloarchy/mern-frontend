import React, {useRef, useEffect} from 'react';

import './Map.css';

const Map = props => {
    const mapRef = useRef();
    const {centre, zoom} = props;

    /* Run once component loaded */
    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: centre,
            zoom: zoom
        });

        new window.google.maps.Marker({
            position: centre,
            map: map
        })
    }, [centre, zoom])

    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        />
    );
};

export default Map;
