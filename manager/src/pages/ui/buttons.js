import React from 'react'
import {Card , Button} from 'antd'
export default class Buttons extends React.Component{
  state = {
    loading:true
  }
  handleCloseLoading = () => {
    this.setState({
      loading:false
    })
  }
  render (){
    return (
      <div>
        <Card title="基础按钮">
          <Button type="primary" loading={this.state.loading}>Imooc</Button>
          <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
        </Card>
      </div>
    );
  }
}