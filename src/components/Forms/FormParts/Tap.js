import React, {Component} from 'react'
import {
    Row,
    Col,
    Form,
    Table,
    Checkbox,
    Input,
    Icon,
    Button,
    Layout
} from 'antd'
import {default as UUID} from "node-uuid";

import {clone} from 'ramda'

const FormItem = Form.Item;

// Написать генератор форм в цикле с валидацией и сабмитом  

class Tap extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            list: []
        }
    }

    handleClick = (e) => {
        console.log('click!', UUID.v4())
        let cloneList = clone(this.state.list)
        let newElement = {
            name: 'name'
        }
        
        newElement.key = UUID.v4()

        cloneList.push(newElement)
        this.setState({
            list: cloneList
        })
    }

    delet = (index) => {
        console.log('delet', index)
        const list = [...this.state.list];
        this.setState({ list: list.filter(item => item.key !== index) })
    }

    render() {

        console.log('this.state', this.state)
        const itemElemet = this.state.list.map( (item, index) => {
            return(
            <div key={index}>
               <p>+ {item.key} {item.name}</p> 
                <Button type="primary" >
                    Сохранить Tap
                </ Button> 
                <Button onClick={() => {this.delet(item.key) }}>
                    Отмена
                </ Button> 
            </div> 
            )
        
        })

        return (
            <div>
                {itemElemet}
                TODO TAP
                <Button 
                    onClick={this.handleClick} 
                    type="primary" >
                   Добавить Teп
                </ Button> 
            </div>
        )
    }
} 

export default Tap