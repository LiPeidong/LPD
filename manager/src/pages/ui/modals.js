import React from 'react'
import {Card , Button ,Modal} from 'antd'
import './ui.less'
export default class Buttons extends React.Component{
  state = {
    showModal1:false,
    showModal2:false,
    showModal3:false
  }
  handleOpen = (type) =>{
    this.setState({
      [type]:true
    })
  }
  handleConfirm = (type) =>{
    Modal[type]({
      title:'确认？',
      content:'你撒大声地',
      onOk(){
        console.log('ok')
      },
      onCancel(){
        console.log('cancle')
      }
    })
  }
  render (){
    return (
      <div>
        <Card title="基础模态框">
          <Button type="primary" onClick={()=>this.handleOpen('showModal1')}>open</Button>
          <Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
          <Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20px</Button>
        </Card>
        <Card title="信息确认框" className="card-wrap">
          <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>confirm</Button>
          <Button type="primary" onClick={()=>this.handleConfirm('info')}>info</Button>
          <Button type="primary" onClick={()=>this.handleConfirm('success')}>success</Button>
        </Card>
        <Modal 
        title="React" 
        visible={this.state.showModal1} 
        onCancel={()=>{
          this.setState({
            showModal1:false
          })
        }}>
          <p>react</p>
        </Modal>
        <Modal 
        title="React" 
        visible={this.state.showModal2} 
        okText="下一步"
        cancelText="取消"
        onCancel={()=>{
          this.setState({
            showModal2:false
          })
        }}>
          <p>react</p>
        </Modal>
        <Modal 
        title="React" 
        style={{top:20}}
        visible={this.state.showModal3} 
        onCancel={()=>{
          this.setState({
            showModal3:false
          })
        }}>
          <p>react</p>
        </Modal>
      </div>
    );
  }
}