import React from 'react'
import { Card, Button ,Spin ,Icon ,Alert} from 'antd'
import './ui.less'
export default class Loadings extends React.Component{
  render(){
    const icon = <Icon type="loading" style={{fontsize:24}}/>
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin />
          <Spin style={{margin:'0 10px'}} size="large"/>
          <Spin indicator={icon}/>
        </Card>
        <Card title="内容遮罩" className="card-wrap">
          <Alert
            message="React"
            description="saidjoajsdoajdoisjaid"
            type="warning">
          </Alert>
        </Card>
        <Spin tip="加载中..." indicator={icon}>
          <Alert
            message="React"
            description="saidjoajsdoajdoisjaid"
            type="warning">
          </Alert>
        </Spin>
      </div>
    )
  }
}