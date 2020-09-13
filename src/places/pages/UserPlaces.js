import React from 'react';
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Tower Bridge',
        description: 'Herp derp tower description',
        address: 'Tower Bridge Rd, London SE1 2UP',
        imageUrl: 'https://www.swedishnomad.com/wp-content/images/2020/03/Tower-Bridge.jpg',
        location: {
            lat: 51.5054564,
            lng: -0.0775505
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
            lat: 51.5054564,
            lng: -0.0775505
        },
        creator: 'u2'
    }
];
const UserPlaces = () => {
    return (
        <PlaceList items={DUMMY_PLACES}/>
    );
};

export default UserPlaces;
