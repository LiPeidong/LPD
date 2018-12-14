import { Menu, Layout,Dropdown, Popover } from 'antd';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import PopoverContent from '../popover/App.js'
import {
  Link
} from 'react-router-dom';
const {
  Header, Content, Footer
} = Layout;
  class App extends Component {
    render() {
      return (
        <div>
          <Layout className="layout" >
            <Header>
              <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1 ']}
              style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1"><Link to='/'>index</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/cities'>App1</Link></Menu.Item>
                <Menu.Item key="3"><Link to='/market'>App2</Link></Menu.Item>
                <PopoverContent></PopoverContent>
              </Menu>                                  
            </Header>
          </Layout>
        </div>
      );
    }
  }
  
  export default App;