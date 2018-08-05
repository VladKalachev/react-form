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

    handleSubmit22 = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log('--- values', values)
          }
        })
    }

    creat = (e) => {
        console.log('click!')
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log('--- values', values)
          }
        })
    }

    render() {

        console.log('this.state', this.state)

        const { form } = this.props
        const { getFieldDecorator } = form

        const itemElemet = this.state.list.map( (item, index) => {
            return(
           
               <Form 
               key={index}
                   // onSubmit={this.handleSubmit} 
                >
                    <FormItem>
                    {getFieldDecorator( `name${index}`, {
                            rules: [{ required: true, message: 'Please input your Name!' }],
                        })(
                            <Input placeholder="Name" />
                        )}
                    </FormItem>

                    <FormItem>
                        <Button type="primary" onClick={this.creat}>
                            Сохранить Tap
                        </ Button> 
                    </FormItem>
                    <FormItem>
                        <Button onClick={() => {this.delet(item.key) }}>
                            Отмена
                        </ Button> 
                    </FormItem>
            </Form>
          
            )
        
        })

        console.log('TEP props', this.props)
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

export default Form.create()(Tap)