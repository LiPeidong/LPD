<template>
  <div class="nav">
      <img id="logo" src="../assets/logo.png">
      <div id='click'>
        <ul class="hide" id='list'>
          <li v-for="(item,index) in list" :key="index" @click="handleSelect(index+1)">
            <a>{{item}}</a>
          </li>
        </ul>
        <p id="navlogo">更多</p>
      </div>
  </div>
</template>
<script>
export default {
  name:'MyHeader',
  data() {
      return {
        list:['首页','公司服务','关于我们','新闻资讯'],
        display:'none'
      };
  },
    
  methods: {
     handleSelect(key) {
       this.$emit("status", key) 
     },
     handleBodyClick (e) {
      let dom = document.getElementById('click')
        if (dom) {
          if (!dom.contains(e.target)) {
            document.getElementById('list').setAttribute('class','hide')
            this.display='none'
          }
        }
    }
  },
  mounted:function(){
    this.$nextTick(() => {
        document.querySelector('body').addEventListener('click', this.handleBodyClick);
    })
    document.getElementsByTagName('a')[0].className='actived'
    
    document.getElementById('list').onclick=function(e){
      var navList = document.getElementsByTagName('a')
      for(var i = 0; i < navList.length; i++){
        navList[i].classList.remove('actived')
      }
      if(e.target.tagName=='LI'){
        e.target.firstChild.className+='actived'
      }else{
        e.target.classList.add('actived')
      }
    }
    document.getElementsByTagName('p')[0].onclick= ()=>{
      if(this.display=='none'){
        document.getElementById('list').setAttribute('class','show')
        this.display='show'
      }
      else{
        document.getElementById('list').setAttribute('class','hide')
        this.display='none'
      }
    }
  },
  beforeDestroy(){
    document.querySelector('body').removeEventListener('click', this.handleBodyClick);
  },
  watch:{
  $route(to,from){
    document.getElementById('list').setAttribute('class','hide')
    this.display='none'
    var navList = document.getElementsByTagName('a')
    for(var i = 0; i < navList.length; i++){
        navList[i].classList.remove('actived')
    }
    switch(to.path){
      case '/':
        document.getElementsByTagName('a')[0].className+='actived'
        break
      case '/Service':
        document.getElementsByTagName('a')[1].className+='actived'
        break
      case '/AboutUs':
        document.getElementsByTagName('a')[2].className+='actived'
        break
      case '/News':
        document.getElementsByTagName('a')[3].className+='actived'
        break
      case '/NewsDetail':
        document.getElementsByTagName('a')[3].className+='actived'
        break
    }
  }
},
}
</script>
<style scoped>
            body {
                margin: 0;
                padding: 0;
            }
            #logo{
              display: inline-block;
              position: absolute;
              top:15px;
              right:85%;
              z-index: 1000;
              height:50px;
              width: 110px;
            }
            .nav {
              z-index:1000;
              position: fixed;
              top:0;
              background-color: #fff;
              height: 78px;
              width: 100%;
              border-bottom: 1px solid #DADADA;
            }
            .nav p {
                font-size: 20px;
                color:#499ef0;
                position: absolute;
                right: 30px;
                top: 8px;
                width: auto;  
                display: none;
            }
            .nav ul {
                list-style: none;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .nav ul li {
                height: 78px;
                width: 168px;
                line-height: 78px;
                text-align: center;
                display: inline-block;
            }
            .nav ul li a:hover {
                cursor: pointer;
            }
            .nav ul li a {
                text-decoration: none;
                color: #666;
                padding-bottom: 8px;
            }
            .nav ul li .actived {
                border-bottom: 3px solid #499ef0;
            }
            @media only screen and (max-width: 878px) {
                .nav p {
                    display: inline;
                }
                .nav ul {
                    background-color: white;
                    position: absolute;
                    right: 0;
                    text-align: right;
                    top: 78px;
                    z-index:1000
                }
                .nav ul li {
                    display: block;
                    border: 1px solid #dadada;
                    height: 58px;
                    line-height: 58px;
                    width: 98px;
                }
                .nav ul li a {
                    display: block;
                    padding-bottom: 0;
                }
                .nav ul li .actived {
                    border-bottom: none;
                }
                .nav ul li a:hover {
                    background-color: #499ef0;
                    color: #fff;
                }
                .show{
                  display: inline
                }
                .hide{
                  display: none
                }
                #logo{
                  left:5%
                }
            }

</style>