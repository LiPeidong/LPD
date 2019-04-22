<template>
  <div class="workvice buy">
    <!-- 已购买服务 -->
    <div class="work_list">
      <ul style="display:flex; justify-content:space-around;">
        <li v-for="(item,index) in work_list" :key="index" @click="workList(index,$event)">
          <span ref="content">{{item}}</span>
          <i :class="triangle" ref="icon" style="color:black"></i>
        </li>
      </ul>
      <div class="name" v-show="show_area">
        <ul>
          <li v-for="(item,index) in area" :key="index" @click="select_menu(index)" :class="{active:index==current}">{{item.name}}</li>
        </ul>
        <div style="text-align:center; padding:2px 0 10px 0 ;">
          <van-button
            type="default"
            style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
            @click="menu_btn"
          >确定</van-button>
        </div>
      </div>
      <div class="name" v-show="show_type">
        <ul>
          <li v-for="(item,index) in type" :key="index" @click="select_type(index)" :class="{active:index==current_type}">{{item.name}}</li>
        </ul>
        <div style="text-align:center; padding:2px 0 10px 0 ;">
          <van-button
            type="default"
            style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
            @click="type_btn"
          >确定</van-button>
        </div>
      </div>
      <div class="name" v-show="show_buy_count">
        <ul>
          <li v-for="(item,index) in next" :key="index" @click="select_service(index)" :class="{active:index==current_service}">{{item.count}}</li>
        </ul>
        <div style="text-align:center; padding:2px 0 10px 0 ;">
          <van-button
            type="default"
            @click="service_btn"
            style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
          >确定</van-button>
        </div>
      </div>
    </div>
    <div class="closelist" v-for="item in list" v-show="listShow" @click="btnList(item.order_id)">
      <div class="closeflex">
        <div class="closetext">
          <div style="display:flex;justify-content:space-between;">
            <h3>{{item.alies}}</h3>
            <p>{{item.time}}</p>
          </div>
          <p>{{item.address}}</p>
          <span>已服务{{item.served_num}}次</span>
        </div>
      </div>
    </div >
    <div style="text-align: center; padding-top: 12px; height:100%;background: #fff;" v-show="Grashow">
      <div style="max-width:45%;height:175px;overflow:hidden;margin: 0 auto;">
        <img src="../../assets/images/关于商品.png" alt="" style="width:100%">
      </div>
      <p style="font-size: 12px;">您还未购买过蜂鸟窝服务</p>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
export default {
  name: "Buy",
  data() {
    return {
      listShow:true,
      Grashow:false,
      current: ' ',
      current_type:'',
      current_service:'',
      triangle: "el-icon-caret-bottom",
      work_active: false,
      show_area: false,
      show_type: false,
      show_buy_count: false,
      value: "",
      value2: "",
      value1: "",
      activeIndex2: "1",
      work_list: ["购买区域", "购买类型", "服务次数"],
      area: [],
      type:[],
      next:[
        {count:'全部次数'},
        {count:0},
        {count:1},
        {count:2},
        {count:3},
        {count:4},
        {count:5},
        {count:6},
        {count:7},
        {count:8},
        {count:9},
        {count:10},
        {count:'>10'},
        ],
      code:0,
      typeId:0,
      servedNum:-1,
      list:[]
    };
  },
  created(){
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.$http.post(BASE_URL+'/api/buy_services_area',{
      userId : localStorage.getItem('big_land_id')
    }).then(res => {
      this.globalToast.clear();
        this.area = res.data;
    }).catch(err => {
      this.globalToast.clear();
      this.$dialog
        .alert({
          message: "系统繁忙，请稍后再试!"
        })
    });
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.$http.post(BASE_URL+'/api/buy_services_type',{
      userId : localStorage.getItem('big_land_id')
    }).then(res => {
      this.globalToast.clear();
      this.type = res.data;
    }).catch(err => {
      this.globalToast.clear();
      this.$dialog
        .alert({
          message: "系统繁忙，请稍后再试!"
        })
    })
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.$http.post(BASE_URL+'/api/buy_services',{
      userId : localStorage.getItem('big_land_id'),
      county_code : this.code,
      typeId : this.typeId,
      servedNum : this.servedNum
    }).then(res => {
       this.globalToast.clear();
      if (res.data.length == 0){
        this.Grashow = true;
        this.listShow = false;
      } else {
        this.Grashow = false;
        this.listShow = true;
        this.list = res.data
      }
    }).catch(err => {
      this.globalToast.clear();
      this.$dialog
        .alert({
          message: "系统繁忙，请稍后再试!"
        })
    })
  },
  methods: {
    workList(index, e) {
      for (let i = 0; i < this.$refs.content.length; i++) {
        if (i != index) {
          this.$refs.icon[i].style.color = "black";
          this.$refs.icon[i].className = "el-icon-caret-top";
          this.$refs.content[i].className = "";

        }
      }
      this.$refs.icon[index].style.color =
        this.$refs.icon[index].style.color == "black" ? "#499ef0" : "black";

      this.$refs.content[index].className =
        this.$refs.content[index].className == "work_active"
          ? ""
          : "work_active";

      this.$refs.icon[index].className =
        this.$refs.icon[index].className == "el-icon-caret-top"
          ? "el-icon-caret-bottom"
          : "el-icon-caret-top";
      if (index == 0) {
        this.show_area = !this.show_area;
        this.show_type = false;
        this.show_buy_count = false;
      }
      if (index == 1) {
        this.show_type = !this.show_type;
        this.show_area = false;
        this.show_buy_count = false;
      }
      if (index == 2) {
        this.show_buy_count = !this.show_buy_count;
        this.show_area = false;
        this.show_type = false;
      }
    },
    select_menu(index,event){
      this.current = index
    },
    select_service(index){
      this.current_service = index
    },
    select_type(index){
      this.current_type = index
    },
    menu_btn(){
      this.show_area = false;
      for (var i=0;i<this.area.length;i++){
        if (i == this.current){
          this.work_list[0] = this.area[i].name;
          this.code = this.area[i].code
        }
      }
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.post(BASE_URL+'/api/buy_services',{
        userId : localStorage.getItem('big_land_id'),
        county_code : this.code,
        typeId : this.typeId,
        servedNum : this.servedNum
      }).then(res => {
        this.globalToast.clear();
        if (res.data.length == 0){
          this.Grashow = true;
          this.listShow = false;
        } else {
          this.Grashow = false;
          this.listShow = true;
          this.list = res.data
        }
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      })
    },
    type_btn(){
      this.show_type = false;
      for (var i=0;i<this.type.length;i++){
        if (i == this.current_type){
          this.work_list[1] = this.type[i].name;
          this.typeId = this.type[i].id;
        }
      }
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.post(BASE_URL+'/api/buy_services',{
        userId : localStorage.getItem('big_land_id'),
        county_code : this.code,
        typeId : this.typeId,
        servedNum : this.servedNum
      }).then(res => {
        this.globalToast.clear();
        if (res.data.length == 0){
          this.Grashow = true;
          this.listShow = false;
        } else {
          this.Grashow = false;
          this.listShow = true;
          this.list = res.data
        }
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      })
    },
    service_btn(){
      this.show_buy_count = false;
      for (var i=0;i<this.next.length;i++){
        if (i == this.current_service){
          this.work_list[2] = this.next[i].count;
          this.servedNum = this.next[i].count;
          if (this.next[i].count == '全部次数'){
            this.servedNum = -1
          }
          if (this.next[i].count == ">10" ){
            this.servedNum = 11
          }
        }
      }
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.post(BASE_URL+'/api/buy_services',{
        userId : localStorage.getItem('big_land_id'),
        county_code : this.code,
        typeId : this.typeId,
        servedNum : this.servedNum
      }).then(res => {
        this.globalToast.clear();
        if (res.data.length == 0){
          this.Grashow = true;
          this.listShow = false;
        } else {
          this.Grashow = false;
          this.listShow = true;
          this.list = res.data
        }
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      })
    },
    btnList(id){
        this.$router.push({
          path:'/Servicedetail',
          query:{
            order_id : id
          }
        })
    }
  }
};
</script>
<style>
.buy .el-picker-panel__footer {
  display: block !important;
}
.buy .el-button--text {
  display: none !important;
}
.buy .el-picker-panel__footer {
  text-align: center;
  padding: 8px 0;
}
.el-button + .el-button {
  margin-left: 0 !important;
}
.buy .el-button {
  width: 225px;
  height: 30px;
  background: rgb(73, 158, 240) !important;
  color: rgb(255, 255, 255) !important;
  border-radius: 15px;
}
body .el-date-picker{
  width: 100% ;
}
body .el-picker-panel{
  border-top: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}
.buy .el-picker-panel__body-wrapper {
  background: #f5f5f5;
}
.el-popper[x-placement^="bottom"] {
  margin: 0;
}
.el-date-picker .el-picker-panel__content {
  width: 100%;
}
.buy .el-date-picker__header {
  margin: 0;
}
.buy .popper__arrow {
  display: none !important;
}

.buy .el-input__prefix {
  display: none;
}
.workvice .time_top {
  display: flex;
  font-size: 12px;
  line-height: 18px;
}
.workvice .name {
  text-align: left;
  line-height: 33px;
}
.workvice .name ul {
  background: #f5f5f5;
  min-height: 0px;
  overflow-y: auto;
  max-height: 201px;
  overflow: scroll;
}
.workvice .name ul li {
  border-bottom: 1px solid #c7c7c7;
  padding-left: 28px;
  color: #333;
}
.workvice .name ul li:last-child {
  border: 0;
}
.workvice {
  background: #f5f5f5;
  height: 100%;
}
.buy .closelist:nth-child(2) {
  margin-top: 10px;
}
.buy .closelist {
  background: #fff;
  margin: 5px 10px 0 10px;
  border-radius: 10px;
}
.workvice .closeflex {
  display: flex;
  padding: 10px;
}
.buy .closetext {
  text-align: left;
  line-height: 20px;
  font-size: 12px;
  width: 100%;
}
.buy .closetext h3 {
  font-size: 14px;
  font-weight: bold;
}
.buy .closetext span {
  border-radius: 8px;
  background: #61c161;
  color: #fff;
  text-align: center;
  display: inline-block;
  padding: 0 15px;
  height: 15px;
  line-height: 15px;
  font-size: 10px;
}
.workvice .work_active {
  color: #499ef0 !important;
}
.workvice .work_list {
  background: #fff;
  margin-bottom: 5px;
}
.workvice .work_list ul li i {
  font-size: 12px;
}
.workvice .work_list ul li {
  margin: 8px 0;
}
.workvice .name ul li:nth-child(1) {
  margin-top: 0;
}
.buy .popper__arrow {
  display: none;
}
.buy .active{color:#499ef0 !important;}
.workvice .name{
  position: relative;
  z-index: 1;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.workvice .name ::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.workvice .name ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
.workvice .name ::-webkit-scrollbar-track {/*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
</style>
