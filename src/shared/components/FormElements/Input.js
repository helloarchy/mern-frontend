import React, {useReducer} from 'react';

import {validate} from "../../utility/validators";

import './Input.css';

/**
 * Returns a state depending on the change case.
 * @param state
 * @param action
 * @returns {*|{isValid: boolean, value: string}}
 */
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
};

const Input = props => {
    /* useReducer instead of state to handle interconnected states
     * Can have second attribute for an initial state */
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isTouched: false,
        isValid: false
    });

    const changeHandler = event => {
        // Dispatch to userReducer the action values
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    /* User entered then left */
    const touchHandler = () => {
        dispatch({
            type: 'TOUCH',
        });
    };

    const element = props.element === 'input' ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler} /* Entered then left */
            value={inputState.value}
        />
    ) : (
        <textarea
            id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            onBlur={touchHandler} /* Entered then left */
            value={inputState.value}
        />
    );

    return (
        <div className={`form-control ${
            !inputState.isValid && inputState.isTouched ? 'form-control__invalid' : null
        }`}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            {/* Check if input or text area */}
            {element}

            {/* Check input valid */}
            {!inputState.isValid && inputState.isTouched ? <p>{props.errorText}</p> : null}
        </div>
    );
};

export default Input;
