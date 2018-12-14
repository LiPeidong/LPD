import React, { Component } from 'react';
import './App.css';
class Cities extends React.Component {
  down=(e)=>{
    console.log(e)
    console.log(e.currentTarget)
    e.currentTarget.parentNode.style.height='auto'
    e.currentTarget.style.display='none',
    e.currentTarget.nextSibling.style.display='inline'
  };
  up=(e)=>{
    e.currentTarget.parentNode.style.height='21px'
    e.currentTarget.style.display='none',
    e.currentTarget.previousSibling.style.display='inline'
  }
  render() {
    return (    //当匹配到对应的路径时，这一段代码就会去渲染对应component内容
      <div className='city_list'>
        <ul>
        <li>
          <div className='content'>
            <div className='getHeight'>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>短视频</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>欧迪芬哪个</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>撒的德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>地方</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>麻辣骗人</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>时代风帆</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>没骂你</a>
              <a>阿萨德</a>
              <a>得分</a>
            </div>
            <a className='down' onClick={(event)=>this.down(event)}>全显</a>
            <a className='up' onClick={(event)=>this.up(event)}>收起</a>
          </div>
        </li>
      </ul>
        <ul>
        <li>
          <div className='content'>
            <div className='getHeight'>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
              <a>中古阿萨德</a>
              <a>阿萨无</a>
              <a>阿萨德</a>
              <a>得分</a>
            </div>
            <a className='down' onClick={e=>this.down(e)}>全显</a>
            <a className='up' onClick={e=>this.up(e)}>收起</a>
          </div>
        </li>
      </ul>     
      </div>
    );
  }
}
export default Cities;
