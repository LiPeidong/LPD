<template>
  <div class="workvice">
    <!-- 已服务工单 -->
    <div class="work_list">
      <ul style="display:flex; justify-content:space-around;">
        <li v-for="(item,index) in work_list" :key="index" @click="workList(index,$event)">
          <span ref="content">{{item}}</span>
          <i :class="triangle" ref="icon" style="color:black"></i>
        </li>
      </ul>
      <div class="name" v-show="nameshow">
        <ul>
          <li v-for="(item,index) in datamenu" :key="index"  @click="select_menu(index)" :class="{activeColor:index==current}">{{item.name}}</li>
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
              <el-date-picker v-model="value1" type="date" placeholder="开始日期" :editable="false" class="wid"></el-date-picker>
            </div>
            <div class="block">
              <el-date-picker v-model="value2" type="date" placeholder="结束日期" :editable="false" class="wid"></el-date-picker>
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
    <div class="workvice_header">
      <h2>
      {{service_list.length}}
        <span>单</span>
      </h2>
      <p>服务总单数</p>
    </div>
    <div class="closelist" v-for="item in service_list" @click="workdetail(item.card_id)">
      <div class="closeflex">
        <div class="closeimg">
          <img :src="url + item.logo_path" alt="">
        </div>
        <div class="closetext">
          <div style="display:flex;justify-content:space-between;">
            <h3>{{item.service_type}}</h3>
            <p>{{item.end_at}}</p>
          </div>
          <p>{{item.address}}</p>
          <span>{{item.username}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
export default {
  name: "Workservice",
  data() {
    return {
      current:'',
      current_type:'',
      triangle: "el-icon-caret-bottom",
      work_active: false,
      nameshow: false,
      project: false,
      time: false,
      value: "",
      value2: "",
      value1: "",
      activeIndex2: "1",
      work_list: ["工人姓名", "服务时间", "服务项目"],
      service:[],
      service_provider_id:'',
      workers:[],
      basic_product:[],
      worker_id:null,
      service_start_at:null,
      service_end_at:null,
      basic_product_id:null,
      datamenu:[],
      service_list: [],
      start_time:'',
      end_time:'',
      url:'http://testimg.funlifeday.com/',
    };
  },
  created(){
    this.service_provider_id = localStorage.getItem('service_provider_id');
    this.globalToast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      mask: true, //背景层
      forbidClick: true, // 禁用背景点击
      message: "加载中..."
    });
    this.$http
      .post(BASE_URL + "/api/get_workers", {
        service_provider_id: this.service_provider_id
      })
      .then(res => {
        res.data.unshift({name:'全部工人'})
        console.log(res.data)
        this.datamenu = res.data;
        console.log(this.datamenu)
        this.globalToast.clear();
      })
      .catch(err => {
        console.log(err);
      });
    //服务项目
    this.$http
      .post(BASE_URL + "/api/get_service_provider_basic_product_list", {
        service_provider_id: this.service_provider_id
      })
      .then(res => {
        res.data.unshift({name:'全部服务'})
        this.service = res.data;
        console.log(res.data)
        this.globalToast.clear();
      })
      .catch(err => {
        console.log(err);
      });
    this.$http
      .post(BASE_URL + "/api/get_service_provider_order_cards", {
        service_provider_id: this.service_provider_id,
        worker_id:this.worker_id,
        service_start_at : this.service_start_at,
        service_end_at : this.service_end_at,
        basic_product_id : this.basic_product_id
      })
      .then(res => {
        this.service_list = res.data
        console.log(this.service_list)
        this.globalToast.clear();
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch:{
    value1(d){
      this.start_time = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
        + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
    },
    value2(d){
      console.log(this.worker_id)
      this.end_time = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
      + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
    }
  },
  methods: {
    workList(index) {
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
        this.project = false;
        this.nameshow = false;
        this.time =  !this.time;
      }
      if (index == 2) {
        this.project = !this.project;
        this.time = false;
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
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.nameshow = false;
      if(this.current != ''){
        this.work_list[0] = this.datamenu[this.current].name;
        this.worker_id = this.datamenu[this.current].id;
      }else{
        this.work_list[0] = '全部工人';
        this.worker_id = null;
      }

      this.$http
        .post(BASE_URL + "/api/get_service_provider_order_cards", {
          service_provider_id: this.service_provider_id,
          worker_id:this.worker_id,
          service_start_at : this.service_start_at,
          service_end_at : this.service_end_at,
          basic_product_id : this.basic_product_id
        })
        .then(res => {
          this.service_list = res.data;
          this.globalToast.clear();
        })
        .catch(err => {
          console.log(err);
        });
    },
    type_btn(){
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.project = false;
      if(this.current_type != ''){
        this.work_list[2] = this.service[this.current_type].name;
        this.basic_product_id = this.service[this.current_type].id;
      }else{
        this.work_list[2] = '全部服务';
        this.basic_product_id = null;
      }

      this.$http
        .post(BASE_URL + "/api/get_service_provider_order_cards", {
          service_provider_id: this.service_provider_id,
          worker_id:this.worker_id,
          service_start_at : this.service_start_at,
          service_end_at : this.service_end_at,
          basic_product_id : this.basic_product_id
        })
        .then(res => {
          this.service_list = res.data
          console.log(res.data)
          this.globalToast.clear();
        })
        .catch(err => {
          console.log(err);
        });
    },
    time_btn(){
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      if(this.end_time == '' || this.start_time == ''){
        let d = new Date()
        this.end_time = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
          + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
      }
      this.$http
        .post(BASE_URL + "/api/get_service_provider_order_cards", {
          service_provider_id: this.service_provider_id,
          service_start_at:this.start_time,
          service_end_at:this.end_time,
          worker_id:this.worker_id,
          basic_product_id:this.basic_product_id
        })
        .then(res => {
          this.service_list = res.data;
          this.globalToast.clear();
          this.time = false;
          this.work_list[1] = this.end_time;
        })
        .catch(err => {
          console.log(err);
        });

    },
    workdetail(card_id){
      this.$router.push({
        path:'/Workdetails',
        query:{
          card_id : card_id
        }
      })
    }
}
};
</script>
<style>
  .el-icon-date:before{display: none;}
  .activeColor{color: #499ef0 !important;}
  .workvice .el-picker-panel__footer {
  display: block !important;
}
.workvice .el-button--text {
  display: none !important;
}
.workvice .el-picker-panel__footer {
  text-align: center;
  padding: 8px 0;
}
.workvice .el-button + .el-button {
  margin-left: 0 !important;
}
.workvice .el-button {
  width: 225px;
  height: 30px;
  background: rgb(73, 158, 240) !important;
  color: rgb(255, 255, 255) !important;
  border-radius: 15px;
}
.workvice .el-popper {
  margin: 0;
}
.workvice .time {
  background: #f5f5f5;
  margin-bottom: 8px;
}
  body .block{width: 100%;}
body  .el-input__inner {text-align: center;}
.workvice .el-picker-panel__body-wrapper {
  background: #f5f5f5;
}
.workvice .el-popper[x-placement^="bottom"] {
  margin: 0;
}

.el-date-picker .el-picker-panel__content{
  margin:0 auto;
}
.workvice .el-date-picker__header {
  margin: 0;
}
.workvice .popper__arrow {
  display: none !important;
}
.workvice .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
  body .el-date-picker{
    width: 100% ;
    border-top: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
  }
  body .el-popper[x-placement^=bottom] {
    margin-top: 10px;
  }
.workvice .el-input__prefix {
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
  height: 201px;
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
.workvice .workvice_header {
  background: #fff;
}
.workvice .workvice_header > h2 {
  font-weight: bold;
  color: #ff8431;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  padding: 20px 0 13px 0;
}
.workvice .workvice_header > h2 > span {
  font-size: 12px;
}
.workvice .workvice_header > p {
  font-size: 14px;
  padding-bottom: 20px;
}

.workvice .closelist {
  background: #fff;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
}
.workvice .closeflex {
  display: flex;
  padding: 10px;
}
.workvice .closeimg {
  width: 48px;
  height: 48px;
  border: solid 1px #c7c7c7;
  padding: 10px;
  border-radius: 5px;
}
.workvice .closeimg img {
  width: 48px;
  height: 48px;
}
.workvice .closetext {
  text-align: left;
  margin-left: 12px;
  line-height: 22px;
  font-size: 12px;
  width: 100%;
}
.workvice .closetext h3 {
  font-size: 14px;
  font-weight: bold;
}
  .closetext span {
  border-radius: 7px;
  background: #61c161;
  font-size: 10px;
  color: #fff;
  text-align: center;
  display: inline-block;
    padding: 0 15px;
  height: 15px;
  line-height: 15px;
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
.workvice .el-popper {
  margin: 0;
}
.workvice .popper__arrow {
  display: none;
}
  .el-popper[x-placement^=bottom] .popper__arrow{
    display: none;
  }
.wid{
  width: 100%;
}

</style>
