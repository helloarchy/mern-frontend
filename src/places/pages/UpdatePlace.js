import React from 'react';
import {useParams} from 'react-router-dom';

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from "../../shared/utility/validators";

import './PlaceForm.css'

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

const UpdatePlace = () => {
    console.log("Tried to render update place!")

    const placeId = useParams().placeId;
    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

    if (!identifiedPlace) {
        return (
            <div className={'center'}>
                <h2>Could not find place!</h2>
            </div>
        );
    }

    return (
        <form className={'place-form'}>
            <Input
                id={'title'}
                element={'input'}
                type={'text'}
                label={'Title'}
                validators={[VALIDATOR_REQUIRE()]}
                errorText={'Please enter a title'}
                onInput={() => {}}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input
                id={'description'}
                element={'textarea'}
                label={'Description'}
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText={'Please enter a description (min 5 characters)'}
                onInput={() => {}}
                value={identifiedPlace.description}
                valid={true}
            />
            <Button type={'submit'} disabled={true}>
                UPDATE PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;
