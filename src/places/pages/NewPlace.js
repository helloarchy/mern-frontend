import React, {useCallback, useReducer} from 'react';

import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/utility/validators";

import './NewPlace.css';
import Button from "../../shared/components/FormElements/Button";

/**
 * Handle the state of the whole new place form
 * @param state
 * @param action
 */
const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let isFormValid = true;
            for (const inputId in state.inputs) {
                // If any validation is false, then the whole form is invalid
                isFormValid = inputId === action.inputId ?
                    isFormValid && action.isValid :
                    isFormValid && state.inputs[inputId].isValid;
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { /* Dynamically update key */
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: isFormValid
            };
        default:
            return state;
    }
};

const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        /* Initial state of the whole form */
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    /* useCallback to avoid recursive function creation from child,
     * dependencies trigger re-render, with none, no extra execution of
     * callback function */
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            inputId: id,
            isValid: isValid,
        })
    }, []);

    return (
        <form className={'place-form'}>
            <Input
                id={'title'}
                element={'input'}
                type={'text'}
                label={'Title'}
                validators={[VALIDATOR_REQUIRE()]} /* Return a validator configuration object */
                errorText={'Please enter a valid title'}
                onInput={inputHandler}
            />
            <Input
                id={'description'}
                element={'textarea'}
                type={'textarea'}
                label={'Description'}
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText={'Please enter a valid description (min 5 characters)'}
                onInput={inputHandler}
            />
            <Button type={'submit'} disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
