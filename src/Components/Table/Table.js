import React from 'react';
import './Table.scss';

const Table = props => {
    let cls = {...props.arrowDirection}
    Object.keys(cls).forEach(el=>{
        if(cls[el]===null){
            cls[el]=''
        }
        if(cls[el]===false){
            cls[el]='str'
        }
        if(cls[el]===true){
            cls[el]='rev'
        }
    }) // Меняем булевы значения на классы для псевдоэлементов
    return(
        <table className="table">
        <thead>
            <tr className = 'table__header'>
                <th onClick = {(evt)=>props.onFilterHundler(evt, 'id')}
                ><span>ID</span>
                <span className = {cls.id}></span>  
                </th>
                <th
                onClick = {(evt)=>props.onFilterHundler(evt, 'firstName')}
                >First Name
                <span className = {cls.firstName} ></span>
                </th>
                <th
                onClick = {(evt)=>props.onFilterHundler(evt, 'lastName')}
                >Last Name
                <span className = {cls.lastName} ></span>
                </th>
                <th
                onClick = {(evt)=>props.onFilterHundler(evt, 'email')}
                >E-mail
                <span className = {cls.email} ></span>
                </th>
                <th
                onClick = {(evt)=>props.onFilterHundler(evt, 'phone')}
                >Phone
                <span className = {cls.phone} ></span>
                </th>
            </tr>
        </thead>
        <tbody>
            { props.data.map((item,i)=>{
                const key = i + Math.random()
                return(
                    <tr key={key}
                        onClick={(evt)=>props.onDetailHundler(evt,item.id)}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                    </tr>
                    )
                })}
        </tbody>
    </table>
    )
}

export default Table;