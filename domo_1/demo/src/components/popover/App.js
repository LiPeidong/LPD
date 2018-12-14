
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { Popover, Button,Icon } from 'antd';
import {
  Link
} from 'react-router-dom';
const content = (
  <div>
      <p><Link to="/cities">cities</Link></p>
      <p><Link to="/market">market</Link></p>
    </div>
);/*
class App extends React.Component {
  render() {
    return (
        <Popover content={content} title="Title" trigger="click" >
            <a><Icon type="caret-down" style={{color:'white',marginLeft:'10px'}} theme="filled"></Icon></a>
        </Popover>
    );
  }
}*/
class App extends React.Component {
  state = {
    visible: false,
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  render() {
    return (
      <Popover
        content={
        <div>
        <p onClick={this.hide}><Link to="/cities">cities</Link></p>
        <p onClick={this.hide}><Link to="/market">market</Link></p>
        </div>
        }
        title="Title"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <a><Icon type="caret-down" style={{color:'white',marginLeft:'10px'}} theme="filled"></Icon></a>
      </Popover>
    );
  }
}

export default App;