import React from 'react';
import './NewPlace.css';
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_REQUIRE} from "../../shared/utility/validators";

const NewPlace = () => {
    return (
        <form className={'place-form'}>
            <Input
                type={'text'}
                label={'Title'}
                element={'text'}
                validators={[VALIDATOR_REQUIRE()]} /* Return a validator configuration object */
                errorText={'Please enter a valid title'}
            />
        </form>
    );
};

export default NewPlace;
