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
import {clone} from 'ramda'

const FormItem = Form.Item;
const { Header, Content, Sider } = Layout;

let key =  0

class FormTwo extends Component {

    constructor(props){
        super(props)
        this.resetClick = this.resetClick.bind(this)
        //this.deleteClick = this.deleteClick.bind(this)
    }

    state = {
        modal: false,
        dataSource: [],
        edit: false,
        currentItem: null
    }

    componentWillReceiveProps(nexProps){
        console.log('nexProps', nexProps)
     //   if(this.state.dataSource != nexProps)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            //console.log('Received values of form: ', values);
            let newElemet = {
                name: values.name,
                age: values.age,
                address: values.address
            }
            let clonetData = clone(this.state.dataSource)

            console.log('!this.state.edit', !this.state.edit)

            if(!this.state.edit){
                
                
                
                newElemet.key = clonetData.length
                clonetData.push(newElemet)

                this.setState({
                    dataSource: clonetData
                })

                this.props.form.resetFields()
                this.setState({
                    modal: false
                })
            } else {
                let key = this.state.currentItem.key
                newElemet.key = key
                clonetData[key] = newElemet

                this.setState({
                    dataSource: clonetData
                })

                this.props.form.resetFields()
                this.setState({
                    modal: false
                })
            }
            

          }
        });
      }

      heandleClick = (e) => {

        this.setState({
            modal: !this.state.modal
        })

        this.setState({
            edit: false
        })

      }

      resetClick = (e) => {
          console.log('reset click!')
          this.props.form.resetFields()
          this.setState({
              modal: false
          })
      }

      editClick = (key) =>{
         
          const {form} = this.props
          this.setState({
              edit: true,
              modal: true
          })

          
          const dataSource = [...this.state.dataSource];
          let currentElement = dataSource.find(item => item.key === key )
            
          this.setState({
            currentItem: currentElement
          })
        form.setFieldsValue({
            name: currentElement.name,
            age: currentElement.age,
            address: currentElement.address
        });
        

      }

    deleteClick(key){
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
    }

    render(){

        const { form } = this.props
        const { getFieldDecorator } = form


        const dataSource = []
        
      
          const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => {
                console.log('record', record)
                return (<p>
                   <span><Icon onClick={() =>{this.editClick(record.key)}} type="edit" /></span> <span><Icon type="delete" onClick={() => {this.deleteClick(record.key)}}  /></span>{record.name}
                </p>)
            }
          }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          }];
          

          console.log('this.state', this.state)
        //console.log('this.props', this.props)
        return (
        <Layout>
             <p>Form 3</p>
            <Content style={{ 
                background: '#fff', 
                padding: 24, 
                margin: 0, 
                minHeight: 280 }}>
                <Table 
                    dataSource={this.state.dataSource} 
                    columns={columns}
                    pagination={false} />
                <Button 
                    onClick={this.heandleClick}> 
                    add new
                </Button>

        <Row>
        <Col span={6}>{ '' }</Col>
            <Col span={12}>
            <Form 
                onSubmit={this.handleSubmit} 
                className={ !this.state.modal ? 'hidden' : '' }>
                
                <FormItem>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your Name!' }],
                    })(
                        <Input placeholder="Name" />
                    )}
                </FormItem>

                 <FormItem>
                    {getFieldDecorator('age', {
                        rules: [{ required: true, message: 'Please input your Age!' }],
                    })(
                        <Input placeholder="Age" />
                    )}
                </FormItem>
                
                <FormItem>
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your address!' }],
                    })(
                        <Input placeholder="Address" />
                    )}
                </FormItem>

                <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Сохронить
                </Button>
                <Button onClick={this.resetClick}>
                    Отмена
                    </Button>
                </FormItem>
            </Form>
        </Col>
      <Col span={6}>{ '' }</Col>
          </Row>
        </Content >
      </Layout>
        )    
    }
}

export default Form.create()(FormTwo)