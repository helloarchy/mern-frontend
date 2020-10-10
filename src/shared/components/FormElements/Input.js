import React, {useReducer} from 'react';
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
                isValid: true
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
        isValid: false
    });

    const changeHandler = event => {
        // Dispatch to userReducer the action values
        dispatch({
            type:'CHANGE',
            val: event.target.value
        });
    };

    const element = props.element === 'input' ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputState.value}
        />
    ) : (
        <textarea
            id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            value={inputState.value}
        />
    );

    return (
        <div className={`form-control ${!inputState.isValid ? 'form-control__invalid' : null}`}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            {/* Check if input or text area */}
            {element}

            {/* Check input valid */}
            {!inputState.isValid ? <p>{props.errorText}</p> : null}
        </div>
    );
};

export default Input;
