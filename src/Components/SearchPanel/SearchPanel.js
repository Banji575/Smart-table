import React from 'react';
import './searchPanel.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

const SearchPaner = props => {
    return(
        <div className = 'searchPanel'>
            <Input 
                value = {props.value}
                onChange = {props.onChange}
            />
            <Button
                clickHundler = {props.onClick}
            >Найти</Button>
        </div>
    )
}

export default SearchPaner;