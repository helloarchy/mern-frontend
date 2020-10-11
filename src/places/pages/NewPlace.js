import React, {useCallback, useReducer} from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/utility/validators';

import './PlaceForm.css';

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
                if (inputId === action.inputId) {
                    isFormValid = isFormValid && action.isValid;
                } else {
                    isFormValid = isFormValid && state.inputs[inputId].isValid;
                }
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
            },
            address: {
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


    const submitHandler = event => {
        event.preventDefault(); // Don't refresh page
        console.log(formState.inputs); // TODO: Send to backend
    };


    return (
        <form className={'place-form'} onSubmit={submitHandler}>
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
                label={'Description'}
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText={'Please enter a valid description (min 5 characters)'}
                onInput={inputHandler}
            />
            <Input
                id={'address'}
                element={'input'}
                type={'text'}
                label={'Address'}
                validators={[VALIDATOR_REQUIRE()]}
                errorText={'Please enter a valid address'}
                onInput={inputHandler}
            />
            <Button type={'submit'} disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
