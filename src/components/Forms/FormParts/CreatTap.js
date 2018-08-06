import React, { Component } from "react";
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
const FormItem = Form.Item;

class CreatTap extends Component {
  render() {
    const { getFieldDecorator, data, index } = this.props;
    let getElement = data.find(item => item.key == index);

    console.log("CreatTap this.props", this.props, getElement);
    return (
      <Form>
        <Row>
          <Col span={6}>{getElement.name}</Col>
          <Col span={10}>
            <FormItem>
              {getFieldDecorator(`tap--${getElement.name}--${index}`, {
                rules: [{ required: true, message: "Please input your Name!" }]
              })(<Input placeholder="Название" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default CreatTap;
