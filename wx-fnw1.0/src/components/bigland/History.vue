<template>
  <div class="Hasservice">
    <!--历史服务  -->
    <div class="work_list">
      <ul style="display:flex; justify-content:space-around;">
        <li v-for="(item,index) in work_list" :key="index" @click="workList(index,$event)">
          <span ref="content">{{item}}</span>
          <i :class="triangle" ref="icon" style="color:black"></i>
        </li>
      </ul>
       <div class="name" v-show="nameshow">
        <ul>
          <li v-for="(item,index) in area" :key="index"  @click="select_menu(index)" :class="{activeColor:index==current}">{{item.name}}</li>
        </ul>
        <div style="text-align:center; padding:2px 0 10px 0 ;">
          <van-button
            type="default"
            style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
            @click="menu_btn"
          >确定</van-button>
        </div>
      </div>
      <div class="name" v-show="project">
        <ul>
          <li v-for="(item,index) in service" :key="index"  @click="select_type(index)" :class="{activeColor:index==current_type}">{{item.name}}</li>
        </ul>
        <div style="text-align:center; padding:2px 0 10px 0 ;">
          <van-button
            type="default"
            style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
            @click="type_btn"
          >确定</van-button>
        </div>
      </div>
       <div v-show="time">
        <div class="time">
          <div class="time_top">
            <div class="block">
              <el-date-picker v-model="value1" type="date" placeholder="开始日期" :editable="false"></el-date-picker>
            </div>
            <div class="block">
              <el-date-picker v-model="value2" type="date" placeholder="结束日期" :editable="false"></el-date-picker>
            </div>
          </div>
        </div>
         <div style="text-align:center; padding:2px 0 10px 0 ;">
           <van-button
             type="default"
             style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
             @click="time_btn"
           >确定</van-button>
         </div>
      </div>
    </div>
    <div class="Hasservice_list" v-for="item in list" v-show="listShow">
      <div class="Hasservice_listher">
        <h2>
          <span>{{item.basic_product}}</span>
        </h2>
        <van-rate v-if=item.rate :value=item.rate :size="14" :count="5" color="#ffa800" void-color="#ffa800"/>
      </div>
      <div class="Hasservice_listcen">
        <p>姓名：{{item.name}}</p>
        <p>电话：{{item.phone}}</p>
        <div style="display: flex;">
          <p style="white-space: nowrap">地址：</p><p>{{item.addresss}}</p>
        </div>

        <p>接单时间：{{item.receiving_at}}</p>
        <p>完成时间：{{item.verification_at}}</p>
        <p>工单状态：{{item.service_type}}</p>
      </div>
      <div class="Hasservice_listpic">
        <p>服务价格：&emsp;
          <span>&yen;{{item.price}}.00</span>
        </p>
      </div>
    </div>
    <div style="text-align: center; padding-top: 59px ;" v-show="Grashow">
      <img src="../../assets/images/关于服务及订单.png" alt="" style="width:90px;height: 78px;">
      <p style="margin-top: 22px; color: #686868; font-size: 18px;">您还未使用过蜂鸟窝服务</p>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
export default {
  name: "History",
  data() {
    return {
      listShow:true,
      Grashow:false,
      current:'',
      current_type:'',
      nameshow: false,
      project: false,
      work_active: false,
      time:false,
      triangle: "el-icon-caret-bottom",
      work_list: ["服务区域", "服务类型", "服务时间"],
      value: 0,
      value2: "",
      value1: "",
      active: 0, //索引
      start_time:'',
      end_time:"",
      area: [],
      service: [],
      code:0,
      typeId:0,
      list:[]
    };
  },
  watch:{
    value1(d){
      this.start_time = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
        + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
      console.log(this.start_time)
    },
    value2(d){
      this.end_time = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
        + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
    }
  },
  created(){
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.$http
      .post(BASE_URL + "/api/history_service_area", {
        userId : localStorage.getItem('big_land_id')
      }).then(res => {
        console.log(res)
        this.area = res.data;
        this.globalToast.clear();
      })
      .catch(err => {
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
    //服务项目
    this.$http
      .post(BASE_URL + "/api/history_service_type", {
        userId : localStorage.getItem('big_land_id')
      })
      .then(res => {
        this.service = res.data;
        this.globalToast.clear();
      })
      .catch(err => {
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
    this.$http.post(BASE_URL+'/api/history_service_record',{
      userId : localStorage.getItem('big_land_id'),
      county_code : this.code,
      typeId : this.typeId,
      startTime : this.start_time,
      endTime : this.end_time
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
    showtab(index) {
      this.active = index;
    },
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
        this.nameshow = !this.nameshow;
        this.project = false;
        this.time = false;
      }
      if (index == 1) {
        this.project = !this.project;
        this.nameshow = false;
        this.time = false;
      }
      if (index == 2) {
        this.time = !this.time;
        this.project = false;
        this.nameshow = false;
      }
    },
    select_menu(index){
      this.current = index
    },
    select_type(index){
      this.current_type = index
    },
    menu_btn(){
      this.nameshow = false;
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
      this.$http.post(BASE_URL+'/api/history_service_record',{
        userId : localStorage.getItem('big_land_id'),
        county_code : this.code,
        typeId : this.typeId,
        startTime : this.start_time,
        endTime : this.end_time
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
      this.project = false;
      console.log(this.service)
      for (var i=0;i<this.service.length;i++){
        if (i == this.current_type){
          this.work_list[1] = this.service[i].name;
          this.typeId = this.service[i].id
        }
      }
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.post(BASE_URL+'/api/history_service_record',{
        userId : localStorage.getItem('big_land_id'),
        county_code : this.code,
        typeId : this.typeId,
        startTime : this.start_time,
        endTime : this.end_time
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
    time_btn(){
      if(this.end_time == '' || this.start_time == ''){
        let d = new Date()
        this.end_time = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
          + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
      }
      this.work_list[2] = this.end_time;
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.post(BASE_URL+'/api/history_service_record',{
        userId : localStorage.getItem('big_land_id'),
        county_code : this.code,
        typeId : this.typeId,
        startTime : this.start_time,
        endTime : this.end_time
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
      this.time = false;
    },
  }
};
</script>
<style>
.Hasservice .el-picker-panel__footer {
  display: block !important;
}
.Hasservice .el-button--text {
  display: none !important;
}
.Hasservice .el-picker-panel__footer {
  text-align: center;
  padding: 8px 0;
}
.el-button + .el-button {
  margin-left: 0 !important;
}
.Hasservice .el-button {
  width: 225px;
  height: 30px;
  background: rgb(73, 158, 240) !important;
  color: rgb(255, 255, 255) !important;
  border-radius: 15px;
}
.Hasservice .el-popper {
  margin: 0;
}
 .time {
  background: #f5f5f5;
}
.Hasservice .el-date-picker {
  width: 100% !important;
}
 body .el-input__inner {text-align: center;}
body .block{width: 100%;}
.Hasservice .el-picker-panel__body-wrapper {
  background: #f5f5f5;
}
.Hasservice .el-popper[x-placement^="bottom"] {
  margin: 0;
}
.el-date-picker .el-picker-panel__content {
  width: 100%;
}
.Hasservice .el-date-picker__header {
  margin: 0;
}
.Hasservice .popper__arrow {
  display: none !important;
}
 .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.Hasservice .el-input__prefix {
  display: none;
}
 .time_top {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  line-height: 18px;
}
 .name {
  text-align: left;
  line-height: 33px;
}
.name ul {
  background: #f5f5f5;
  overflow: scroll;
}
.name ul li {
  border-bottom: 1px solid #c7c7c7;
  padding-left: 28px;
  color: #333;
}
 .name ul li:last-child {
  border: 0;
}
 .work_list {
  background: #fff;
  margin-bottom: 5px;
}
 .work_list ul li i {
  font-size: 12px;
}
 .work_list ul li {
  margin: 8px 0;
}
.Hasservice {
  background: #f5f5f5;
  height: 100%;
}
.Hasservice .Hasservice_header {
  background: #fff;
}
.Hasservice_header > h2 {
  font-weight: bold;
  color: #ff8431;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  padding: 20px 0 13px 0;
}
.Hasservice_header > h2 > span {
  font-size: 12px;
}
.Hasservice_header > p {
  font-size: 14px;
  padding-bottom: 20px;
}
.Hasservice_tab > ul {
  display: flex;
  height: 25px;
  border: 1px solid #499ef0;
  border-radius: 25px;
}
.Hasservice .Hasservice_tab {
  padding: 10px 10px 0 10px;
  background: #fff;
  margin-top: 5px;
}
.Hasservice_tab > ul > li {
  flex-grow: 1;
  line-height: 25px;
  color: #499ef0;
  font-size: 13px;
  font-family: PingFangSC-Regular;
}
.Hasservice_tab > ul > li:nth-child(1) {
  border-radius: 25px 0 0 25px;
}
.Hasservice_tab > ul > li:nth-child(4) {
  border-radius: 0 25px 25px 0;
}
.Hasservice_tab > ul > li:nth-child(2) {
  border-left: 1px solid #499ef0;
  border-right: 1px solid #499ef0;
}
.Hasservice_tab > ul > li:nth-child(3) {
  border-right: 1px solid #499ef0;
}
.Hasservice .Hasservice_fl {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: #333;
  padding: 20px 0;
}
.Hasservice_fl .Hasservice_dat p {
  padding-bottom: 10px;
}
.Hasservice_fl .Hasservice_dat span {
  font-size: 14px;
  color: #499ef0;
}
.Hasservice_list {
  background: #fff;
  margin: 5px 10px;
  border-radius: 10px;
}
.Hasservice_listher {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.Hasservice_listher h2 {
  font-size: 16px;
  color: #499ef0;
  border-left: 3px solid #499ef0;
  padding-left: 13px;
  line-height: 16px;
}
.Hasservice_listcen {
  border-bottom: 1px solid #c7c7c7;
  padding-bottom: 10px;
  text-align: left;
  padding-left: 10px;
}
.Hasservice_listcen p {
  line-height: 20px;
  font-family:PingFangSC-Regular ;
  font-size: 13px;
  letter-spacing: 1.5px;
}
.Hasservice_listpic {
  text-align: right;
  padding: 10px 10px 10px 0;
  font-size: 12px;
}
.Hasservice_listpic span {
  font-size: 18px;
  color: #499ef0;
}
.Hasservice .active {
  background: #499ef0;
  color: #fff !important;
}

.Hasservice .work_active {
  color: #499ef0 !important;
}

.el-date-editor.el-input__inner {
  width: 100%;
}
#box .el-select input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #333; /* placeholder字体大小  */
  font-size: 14px; /* placeholder位置  */
  text-align: center;
}
#box .el-select .el-input .el-select__caret {
  color: #333;
}

 .el-select-dropdown {
  width: 100%;
  top: 28px !important;
  left: 0px !important ;
  border: 0;
}
.Hasservice .activeColor{color: #499ef0 !important;}
.Hasservice .name{
  position: relative;
  z-index: 1;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.Hasservice .name ::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.Hasservice .name ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
.Hasservice .name ::-webkit-scrollbar-track {/*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
</style>
