import React from 'react';
import {useParams} from 'react-router-dom';

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Tower Bridge',
        description: 'Herp derp tower description',
        address: 'Tower Bridge Rd, London SE1 2UP',
        imageUrl: 'https://www.swedishnomad.com/wp-content/images/2020/03/Tower-Bridge.jpg',
        location: {
            lat: 51.505455,
            lng: -0.075356
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Tower Bridge',
        description: 'Herp derp tower description',
        address: 'Tower Bridge Rd, London SE1 2UP',
        imageUrl: 'https://www.swedishnomad.com/wp-content/images/2020/03/Tower-Bridge.jpg',
        location: {
            lat: 51.505455,
            lng: -0.075356
        },
        creator: 'u2'
    }
];

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return (
        <PlaceList items={loadedPlaces}/>
    );
};

export default UserPlaces;
