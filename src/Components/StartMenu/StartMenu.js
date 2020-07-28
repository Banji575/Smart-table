import React from 'react';
import Button from '../Button/Button';
import './startMenu.scss';

const StartMenu = props =>{
    return(
        <div className = 'startMenu'>
        <Button
            clickHundler = {()=>props.onClickHundler('small')}
        >Маленькие данные</Button>
        <Button
            clickHundler = {()=>props.onClickHundler('big')}
        >Большие данные</Button>
    </div>
    )
}

export default StartMenu;