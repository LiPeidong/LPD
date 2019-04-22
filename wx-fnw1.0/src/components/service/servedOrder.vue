<template>
  <div class="Hasservice">
    <!-- 工人详情 -->
    <div class="work_list">
      <ul style="display:flex; justify-content:space-around;">
        <li v-for="(item,index) in work_list" :key="index" @click="workList(index,$event)">
          <span ref="content">{{item}}</span>
          <i :class="triangle" ref="icon" style="color:black"></i>
        </li>
      </ul>
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
    <div style="display:flex; justify-content:space-around;background: #fff;">
      <div class="Hasservice_header">
        <h2>
          {{ orderNum }}
          <span>单</span>
        </h2>
        <p>已服务工单总数</p>
      </div>
      <div class="Hasservice_header">
        <h2>
          {{orderMoney}}
          <span>元</span>
        </h2>
        <p>已服务工单总金额</p>
      </div>
    </div>
    <div class="Hasservice_list" v-for="(item,index) in finish_cards" :key="index" @click="workdetail(item.card_id)">
      <div class="Hasservice_listher">
        <h2>
          <span></span>
          {{item.service_type}}
        </h2>
        <van-rate v-model="item.rate" v-if ="item.rate!=null" :size="14" :count="5" color="#ffa800" readonly void-color="#ffa800"/>
        <van-rate v-show="item.rate != null" v-else ="item.rate==null" :size="14" :count="5" color="#ffa800" readonly void-color="#ffa800"/>
      </div>
      <div class="Hasservice_listcen">
        <p>姓名：{{item.username}}</p>
        <p>电话：{{item.phone.substring(0,3)+"XXXX"+item.phone.substring(7,11)}}</p>
        <p>地址：{{item.address.substring(0,9)+"XXXXXXX"}}</p>
        <p>接单时间：{{item.start_at}}</p>
        <p>完成时间：{{item.end_at}}</p>
      </div>
      <div class="Hasservice_listpic">
        <p>
          服务价格：&emsp;
          <span>&yen;{{item.price.toString()+".00"}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
  export default {
    name: "servedOrder",
    data() {
      return {
        work_list: [ "服务时间", "服务项目"],
        globalToast: null, //加载弹窗
        value: 5,
        active: 0, //索引
        service_count: 0, //服务工单
        finish_cards: [],
        service_total_price: 0, //总金额
        time: 1,
        current:'',
        current_type:'',
        triangle: "el-icon-caret-bottom",
        work_active: false,
        nameshow: false,
        project: false,
        time: false,

        value2: "",
        value1: "",
        activeIndex2: "1",
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
        orderNum:'0',
        orderMoney:'0'
      };
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http
        .post(BASE_URL + "/api/get_worker_detail", {
          worker_id: this.$route.query.worker_id
        })
        .then(res => {
          console.log(res.data)
          this.finish_cards = res.data.finish_cards;
          this.orderNum = res.data.service_count;
          this.orderMoney = res.data.service_total_price.toFixed(2);
          this.globalToast.clear();
        })
        .catch(err => {
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        });
      this.$http
        .post(BASE_URL + "/api/get_worker_basic_product_list", {
          worker_id: this.$route.query.worker_id
        })
        .then(res => {
          console.log(res.data)
          res.data.unshift({name:'全部服务'})
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
          this.time =  !this.time;
          this.project = false;
        }
        if (index == 1) {
          this.time = false;
          this.project =  !this.project;
        }
      },
      select_menu(index){
        this.current = index
      },
      select_type(index){
        this.current_type = index
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
          this.work_list[1] = this.service[this.current_type].name;
          this.basic_product_id = this.service[this.current_type].id;
        }else{
          this.work_list[1] = '全部服务';
          this.basic_product_id = null;
        }

        this.$http
          .post(BASE_URL + "/api/get_worker_detail", {
            worker_id:this.$route.query.worker_id,
            service_start_at : this.service_start_at,
            service_end_at : this.service_end_at,
            basic_product_id : this.basic_product_id
          })
          .then(res => {
            this.finish_cards = res.data.finish_cards;
            this.orderNum = res.data.service_count;
            this.orderMoney = res.data.service_total_price;
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
          .post(BASE_URL + "/api/get_worker_detail", {
            service_start_at:this.start_time,
            service_end_at:this.end_time,
            worker_id:this.$route.query.worker_id,
            basic_product_id:this.basic_product_id
          })
          .then(res => {
            this.finish_cards = res.data.finish_cards;
            this.orderNum = res.data.service_count;
            this.orderMoney = res.data.service_total_price;
            this.time = false;
            this.work_list[0] = this.end_time;
            this.globalToast.clear();
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
   .work_active {
    color: #499ef0 !important;
  }
   .name {
    text-align: left;
    line-height: 33px;
  }
   .name ul {
    background: #f5f5f5;
     overflow: scroll;
     max-height: 201px;
  }
   .name ul li {
    border-bottom: 1px solid #c7c7c7;
    padding-left: 28px;
    color: #333;
  }
   .name ul li:last-child {
    border: 0;
  }
   .name ul li:first-child {
     margin-top: 0px;
   }
  body  .el-input__inner{text-align: center;}
   body .block{width: 100%;}
   .el-icon-date:before{display: none;}
  body .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
   body .el-date-picker{
     width: 100% ;
   }
   body .el-picker-panel{
     border-top: 1px solid #e4e7ed;
     border-bottom: 1px solid #e4e7ed;
   }
   body .el-popper[x-placement^=bottom] {
     margin-top: 10px;
   }
  .time_top {
    display: flex;
    font-size: 12px;
    line-height: 18px;
    width: 100%;
  }
  .activeColor{color: #499ef0 !important;}
  .Hasservice {
    background: #f5f5f5;
    height: 100%;
  }
  .Hasservice_header {
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
  .Hasservice_tab {
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
  .Hasservice_fl {
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
    width: 94% !important;
    background: #fff;
    margin: 10px;
    border-radius: 10px;
  }
  .Hasservice_listher {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 15px 10px;
  }
  .Hasservice_listher h2 {
    font-size: 14px;
    color: #499ef0;
    border-left: 3px solid #499ef0;
    padding-left: 13px;
    line-height: 15px;
  }
  .Hasservice_listcen {
    border-bottom: 1px solid #c7c7c7;
    padding-bottom: 10px;
    text-align: left;
    padding-left: 10px;
  }
  .Hasservice_listcen p {
    line-height: 20px;
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
 .time {
    background: #f5f5f5;
   margin-bottom: 8px;
  }
 .el-date-picker .el-picker-panel__content{
   margin:0 auto;
 }
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
