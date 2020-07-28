import React from 'react';
import './input.scss';

const isInvalid=({valid, shouldValidate, touched})=>{
return valid && shouldValidate && touched  
}

const Input = props => {
    const inputType = props.type || 'text';
    const cls = isInvalid(props)? 'valid':'invalid'
    const htmlFor = `${inputType}-${Math.random()}`

    return (
        <div className = 'input'>
            <label htmlFor = {htmlFor}>{props.label}</label>
            <input
            type = {inputType}
            id = {htmlFor}
            value = {props.value}
            onChange = {props.onChange}
            onBlur = {props.onBlur || null}
            />
            {
               props.shouldValidate
               ? <span className={cls}>{props.errorMessage || 'Введите верное значение'}</span>
               : null
            }
            
            {/* {
                !isInvalid(props)
                ?<span>{props.errorMessage || 'Введите верное значение'}</span>
                :null
            } */}
        </div>
    )
}

export default Input