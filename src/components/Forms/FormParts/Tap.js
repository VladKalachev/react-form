import React, { Component, PureComponent } from "react";
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
} from "antd";
import { default as UUID } from "node-uuid";

import { clone } from "ramda";

const FormItem = Form.Item;

// Написать генератор форм в цикле с валидацией и сабмитом

class Tap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  handleClick = e => {
    console.log("click!", UUID.v4());
    let cloneList = clone(this.state.list);
    let newElement = {
      name: "name"
    };

    newElement.key = UUID.v4();

    cloneList.push(newElement);
    this.setState({
      list: cloneList
    });
  };

  delet222 = index => {
    console.log("delet", index);
    const list = [...this.state.list];
    this.setState({ list: list.filter(item => item.key !== index) });
  };

  handleSubmit22 = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("--- values", values);
      }
    });
  };

  creat = e => {
    console.log("click!", this.props.list);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("--- values", values);
        this.props.add(values, this.props.list);
      }
    });
  };

  close = e => {
    console.log("click! close", this.props);
    let list = this.props.list;
    //this.props.form.resetFields();
    this.props.delet(list);
  };

  handleName = e => {
    const name = e.target.value;
    //console.log("handleName", name, this.props);
    let newElement = { ...this.props.element };
    newElement.name = name;
    //console.log("newElement", newElement);
    this.props.cheang(newElement);
  };

  handleType = e => {
    const type = e.target.value;
    console.log("handleType", type, this.props);
  };

  render() {
    //console.log('this.state', this.state)

    const { form, list, element } = this.props;
    const { getFieldDecorator } = form;

    console.log("TEP props", this.props);

    return (
      <Form
        className={this.props.element.delet ? "hidden" : ""}
        // onSubmit={this.handleSubmit}
      >
        <p>{this.props.list}</p>
        <FormItem>
          {getFieldDecorator(`name`, {
            rules: [{ required: true, message: "Please input your Name!" }]
          })(<Input onChange={this.handleName} placeholder="Название" />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator(`type`, {
            rules: [{ required: true, message: "Please input your Type!" }]
          })(<Input onChange={this.handleType} placeholder="Тип" />)}
        </FormItem>

        <FormItem>
          <Button type="primary" onClick={this.creat}>
            Сохранить Tap
          </Button>
        </FormItem>
        <FormItem>
          <Button onClick={this.close}>Отмена</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Tap);
