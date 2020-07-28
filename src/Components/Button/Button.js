import React from 'react';
import './button.scss';
const Button = props => {
    return(
    <button
        className = 'button'
        disabled = {props.disabled}
        type = {props.type || 'button'}
        onClick = {(data)=>props.clickHundler(data)}
    >{props.children}</button>
    )
}
export default Button;