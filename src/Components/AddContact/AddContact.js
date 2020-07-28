import React, { Component } from 'react';
import './addContact.scss';
import Button from '../Button/Button'
import Input from '../Input/Input';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class AddContact extends Component {

    state = {
        newContact:{
            id:null,
            firstName:null,
            lastName:null,
            email:null,
            address: {
                streetAddress: null,
                city: null,
                state: null,
                zip: null
            },
            phone:null, 
        },
        test : 'test button hundler',
        isFormValid:false,
        formControls:{
            id:{
                value:'',
                type: 'number',
                label: 'Id',
                errorMessage: 'Поле должно содержать только цифры',
                valid:false,
                touched:false,
                validation:{
                    require:true,
                    number:true
                }
            },
            firstName:{
                value:'',
                type: 'text',
                label: 'First name',
                errorMessage: 'Обязательно к заполнению',
                valid:false,
                touched:false,
                validation:{
                    require:true
                }
            },
            lastName:{
                value:'',
                type:'text',
                label:'Last name',
                errorMessage:'Обязательно к заполнению',
                valid: false,
                touched:false,
                validation:{
                    require:true
                }
            },
            email:{
                value:'',
                type: 'email',
                label:'Email',
                errorMessage:'формат email адреса',
                valid:false,
                touched:false,
                validation:{
                    require:true,
                    email:true
                }
            },
            phone:{
                value:'',
                type: 'number',
                label: 'Phone',
                errorMessage: 'Поле должно содержать только цифры',
                valid:false,
                touched:false,
                validation:{
                    require:true,
                    number:true
                }
            }
        }
    }

    onSubmitHundler = evt => {
        evt.preventDefault()
    }

    validateControl = (value, validation) =>{
        if(!validation){
            return true
        }
        let isValid = true

        if(validation.require){
            isValid = value.trim() !== '' && isValid
        }
        if(validation.email){
            isValid = validateEmail(value)
        }

        return isValid;
    }

    onChangeHundler = (evt, controlName) =>{
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        const newContact = {...this.state.newContact}
        control.value = evt.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control
        newContact[controlName] = control.value
        let isFormValid = true
        Object.keys(formControls).forEach(controlName=>{
           isFormValid = formControls[controlName].valid && isFormValid
        })
        this.setState({formControls, isFormValid, newContact})
    }

    renderInputs = () => {
       return Object.keys(this.state.formControls).map((controlName, i)=>{
            const control = this.state.formControls[controlName]
            return(
                <Input
                key = {control.type + i}
                type = {control.type}
                value = {control.value}
                touched = {control.touched}
                label = {control.label}
                onChange = {(evt)=>this.onChangeHundler(evt, controlName)}
                errorMessage = {control.errorMessage}
                valid = {control.valid}
                shouldValidate = {!!control.validation}
                />
            )
        })
    }
    render(){
        return(
            <div className = 'addContact'>
                <h1>Добавить контакт</h1>
                <form onSubmit = {(evt)=>this.onSubmitHundler(evt)}>
                    {this.renderInputs()}
                </form>
                <div className = 'buttonBlock'>
                <Button
                disabled = {!this.state.isFormValid}
                type = 'submit'
                clickHundler = {()=>this.props.onAddContact(this.state.newContact)}
                >Добавить</Button>
                <Button clickHundler = {this.props.onToggleForm}>Закрыть</Button>
                </div>
            </div>
        )
    }
}
