import React from 'react';
import {useParams} from 'react-router-dom';
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/utility/validators";

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
    const placeId = useParams().placeId;
    const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId)

    const inputHandler = () => {
        console.log('Input entered')
    };

    return !identifiedPlace ? (
        <div className={'centre'}>
            <h2>Could not find place!</h2>
        </div>
    ) : (
        <form>
            <Input
                id={'title'}
                element={'input'}
                type={'text'}
                label={'Title'}
                validators={[VALIDATOR_REQUIRE()]}
                errorText={'Please enter a title'}
                onInput={inputHandler}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input
                id={'description'}
                element={'textarea'}
                label={'Description'}
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText={'Please enter a description (min 5 characters)'}
                onInput={inputHandler}
                value={identifiedPlace.description}
                valid={true}
            />
            <Button type={'submit'} disabled={true}>UPDATE PLACE</Button>
        </form>
    );
};

export default UpdatePlace;
