import React from 'react';
import './dataList.scss';

const DataList = props => {
    const {streetAddress, city, state, zip} = props.detailData.address 
    return(
        <div className = 'dataList'>
            <h2><span>Выбран пользователь</span> {`${props.detailData.firstName} ${props.detailData.lastName}`}</h2>
            <p>{props.detailData.description}</p>
            <p><span>Адрес проживания:</span> <b>{streetAddress}</b> </p>
            <p><span>Город:</span> <b>{city}</b></p>
            <p><span>Провинция:</span> <b>{state}</b></p>
            <p><span>Индекс:</span> <b>{zip}</b></p>
        </div>
    )
}

export default DataList;