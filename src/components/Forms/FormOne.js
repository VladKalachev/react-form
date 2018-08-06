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
import { clone } from "ramda";
import Tap from "./FormParts/Tap";
import CreatTap from "./FormParts/CreatTap";
import { default as UUID } from "node-uuid";

const FormItem = Form.Item;
const { Header, Content, Sider } = Layout;

// Правила для формы

let keys = 0;

class FormOne extends Component {
  constructor(props) {
    super(props);
    this.resetClick = this.resetClick.bind(this);
    this.delet = this.delet.bind(this);
  }

  state = {
    modal: false,
    dataSource: [],
    edit: false,
    currentItem: null,
    list: [],
    tap: []
  };

  componentWillReceiveProps(nexProps) {
    //console.log('nexProps', nexProps)
    //   if(this.state.dataSource != nexProps)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        //let clonetData = clone(this.state.dataSource)

        let clonetData = [...this.state.dataSource];

        // Преобразовываем tap для чтения
        // taps[{ name: 'name', value: 'value' }]
        let taps = [];

        for (var key in values) {
          if (~key.indexOf("tap")) {
            let str = values[key];
            let name = key.split("--");
            // console.log("99999999999999999", name);
            let elem = {
              name: name[1],
              value: str
            };
            taps.push(elem);
            //  console.log("key", key);
            //  console.log("values", str);
          }
        }

        let newElemet = {
          name: values.name,
          age: values.age,
          address: values.address,
          taps: taps
        };

        console.log("--- taps", taps);
        //console.log('!this.state.edit', !this.state.edit)

        if (!this.state.edit) {
          newElemet.key = UUID.v4();
          clonetData.push(newElemet);

          this.setState({
            dataSource: clonetData
          });

          this.props.form.resetFields();
          this.setState({
            modal: false
          });
        } else {
          let key = this.state.currentItem.key;
          newElemet.key = key;
          // clonetData[key] = newElemet
          clonetData.map(item => {
            if (item.key == key) {
              (item.name = newElemet.name),
                (item.address = newElemet.address),
                (item.age = newElemet.age);
            }
            return item;
          });
          this.setState({
            dataSource: clonetData
          });

          this.props.form.resetFields();
          this.setState({
            modal: false
          });
        }
      }
    });
  };

  heandleClick = e => {
    this.setState({
      modal: !this.state.modal
    });

    this.setState({
      edit: false
    });
  };

  resetClick = e => {
    //console.log('reset click!')
    this.props.form.resetFields();
    this.setState({
      modal: false
    });
  };

  editClick = key => {
    const { form } = this.props;
    this.setState({
      edit: true,
      modal: true
    });

    const dataSource = [...this.state.dataSource];
    let currentElement = dataSource.find(item => item.key === key);

    this.setState({
      currentItem: currentElement
    });
    form.setFieldsValue({
      name: currentElement.name,
      age: currentElement.age,
      address: currentElement.address
    });
  };

  deleteClick(key) {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  addTep = e => {
    //console.log('click!', UUID.v4())
    let cloneList = clone(this.state.list);

    let newElement = {
      name: keys++,
      type: "",
      key: UUID.v4(),
      delet: false
    };

    newElement.key = UUID.v4();

    cloneList.push(newElement);
    this.setState({
      list: cloneList
    });
  };

  addNew = (values, key) => {
    //console.log("add", values, key);

    let cloneList = clone(this.state.list);

    let newElement = {
      name: values.name,
      type: values.type,
      key: key,
      delet: true
    };

    cloneList.map(item => {
      if (item.key == key) {
        (item.name = newElement.name),
          (item.type = newElement.type),
          (item.key = newElement.key),
          (item.delet = newElement.delet);
      }
      return item;
    });

    this.setState({
      list: cloneList
    });

    this.addNewTap(newElement);
  };

  addNewTap = element => {
    console.log("------ element", element);

    let getElement = [...this.state.tap];
    getElement.push(element);

    this.setState({
      tap: getElement
    });
  };

  cheang = value => {
    //console.log("value", value);
    const key = value.key;
    const listClone = [...this.state.list];
    let newElement = {
      name: value.name,
      type: value.type,
      key: value.key,
      delet: value.delet
    };

    listClone.map(item => {
      if (item.key == key) {
        (item.name = newElement.name),
          (item.type = newElement.type),
          (item.key = newElement.key),
          (item.delet = newElement.delet);
      }
      return item;
    });
    this.setState({
      list: listClone
    });
  };

  delet = index => {
    //console.log("delet", index);
    const list = [...this.state.list];
    let del = list.filter(item => item.key !== index);
    //console.log("--- del", del);
    this.setState({ list: del });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const dataSource = [];

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text, record, index) => {
          //console.log('record', record)
          return (
            <p>
              <span>
                <Icon
                  onClick={() => {
                    this.editClick(record.key);
                  }}
                  type="edit"
                />
              </span>{" "}
              <span>
                <Icon
                  type="delete"
                  onClick={() => {
                    this.deleteClick(record.key);
                  }}
                />
              </span>
              {record.name}
            </p>
          );
        }
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "Tap",
        dataIndex: "tap",
        key: "tap",
        render: (text, record, index) => {
          console.log("tap", record);
          return (
            <div>
              {record.taps
                ? record.taps.map(item => {
                    return (
                      <span>
                        {item.name}: {item.value}; &nbsp;
                      </span>
                    );
                  })
                : null}
            </div>
          );

          // taps
        }
      }
    ];

    console.log("this.state", this.state);

    let getElement = this.state.list.map((item, index) => {
      return (
        <Tap
          key={item.key}
          list={item.key}
          element={item}
          add={this.addNew}
          cheang={this.cheang}
          delet={this.delet}
          state={this.state.list}
        />
      );
    });

    let getTap = this.state.tap.map((item, i) => {
      return (
        <CreatTap
          key={item.key}
          getFieldDecorator={getFieldDecorator}
          index={item.key}
          data={this.state.tap}
        />
      );
    });

    //console.log('this.props', this.props)
    return (
      <Layout>
        <p>Form 2</p>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Table
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={false}
          />
          <Button onClick={this.heandleClick}>add new</Button>

          <Row>
            <Col span={6}>{""}</Col>
            <Col span={12}>
              <Form
                onSubmit={this.handleSubmit}
                className={!this.state.modal ? "hidden" : ""}
              >
                <FormItem>
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "Please input your Name!" }
                    ]
                  })(<Input placeholder="Name" />)}
                </FormItem>

                <FormItem>
                  {getFieldDecorator("age", {
                    rules: [
                      { required: true, message: "Please input your Age!" }
                    ]
                  })(<Input placeholder="Age" />)}
                </FormItem>

                <FormItem>
                  {getFieldDecorator("address", {
                    rules: [
                      { required: true, message: "Please input your address!" }
                    ]
                  })(<Input placeholder="Address" />)}
                </FormItem>

                <p>Проектируемые технико-экономические показатели</p>

                {getTap}
                {getElement}

                <Button onClick={this.addTep} type="primary">
                  Добавить Teп
                </Button>

                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Сохронить
                  </Button>
                  <Button onClick={this.resetClick}>Отмена</Button>
                </FormItem>
              </Form>
            </Col>
            <Col span={6}>{""}</Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(FormOne);
