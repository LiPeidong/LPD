import React from 'react'
import {Card ,Form ,Button ,Input ,Radio, Checkbox, Select , Switch , DatePicker ,TimePicker,Upload ,Icon,Message} from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const formItemLayout = {
  labelCol:{
    xs:24,
    sm:4
  },
  wrapperCol:{
    xs:24,
    sm:12
  }
}
class FormRegister extends React.Component{
  render(){
    const {getFieldDecorator} = this.props.form
    return(
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName',{
                  initialValue:'',
                  rules:[
                    {
                      required:true,
                      message:'用户名不为空'
                    }
                  ]
                })(
                  <Input placeholder="asdasd"></Input>
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password',{
                  initialValue:'',
                })(
                  <Input placeholder="密码"></Input>
                )
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex',{
                  initialValue:'1',
                })(
                  <RadioGroup>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(FormRegister);