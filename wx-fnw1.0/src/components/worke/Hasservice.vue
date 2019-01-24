<template>
  <div class="Hasservice">
    <!-- 已服务工单 -->
    <div class="Hasservice_header">
      <h2>
        {{service_count}}
        <span>单</span>
      </h2>
      <p>已服务工单总数</p>
    </div>
    <div class="Hasservice_tab">
      <ul>
        <li
          v-for="(item,index) in tab"
          :class="{active:active==index}"
          @click="showtab(index)"
          :key="index"
        >{{item.data}}</li>
      </ul>
      <div class="Hasservice_fl">
        <div class="Hasservice_dat">
          <p>服务次数</p>
          <span>{{service_count}}次</span>
        </div>
        <div class="Hasservice_dat">
          <p>服务金额</p>
          <span>{{service_total_price}}.00</span>
        </div>
      </div>
    </div>
    <div class="Hasservice_list" v-for="(item,index) in  finish_cards" :key="index" @click="Hasservice(item.card_id)">
      <div class="Hasservice_listher">
        <h2>
          <span></span>
          {{item.service_type}}
        </h2>
        <van-rate v-model="value" :size="14" :count="5" color="#ffa800" readonly/>
      </div>
      <div class="Hasservice_listcen">
        <p>姓名：{{item.username}}</p>
        <p>电话：{{item.phone}}</p>
        <p>地址：{{item.address}}</p>
        <p>接单时间：{{item.start_at}}</p>
        <p>完成时间：{{item.end_at}}</p>
      </div>
      <div class="Hasservice_listpic">
        <p>
          服务价格：&emsp;
          <span>&yen;{{item.price}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BASE_URL from "../../constants";
export default {
  name: "Hasservice",
  data() {
    return {
      globalToast: null,
      value: 5,
      active: 0, //索引
      service_count: 0, //服务工单
      finish_cards: [],
      service_total_price: 0, //总金额
      time: "1",
      tab: [
        { data: "今日" },
        { data: "近7日" },
        { data: "近30日" },
        { data: "全部" }
      ]
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
      .post(BASE_URL + "/api/get_worker_info", {
        worker_id: localStorage.getItem("workId"),
        day: this.time
      })
      .then(res => {
        this.finish_cards = res.data.finish_cards;
        this.service_count = res.data.service_count;
        this.service_total_price = res.data.service_total_price;
        this.globalToast.clear();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    Hasservice(card_id){
      this.$router.push({
        path:'./Workdetails',
        query: {
          card_id:card_id
        }
      })
    },
    showtab(index) {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.active = index;
      if (index == 0) {
        this.time = "1";
        this.$http
          .post(BASE_URL + "/api/get_worker_info", {
            worker_id: localStorage.getItem("workId"),
            day: this.time
          })
          .then(res => {
            console.log(res);
            this.finish_cards = res.data.finish_cards;
            this.service_count = res.data.service_count;
            this.service_total_price = res.data.service_total_price;
            this.globalToast.clear();
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (index == 1) {
        this.time = "7";
        this.$http
          .post(BASE_URL + "/api/get_worker_info", {
            worker_id: localStorage.getItem("workId"),
            day: this.time
          })
          .then(res => {
            console.log(res);
            this.finish_cards = res.data.finish_cards;
            this.service_count = res.data.service_count;
            this.service_total_price = res.data.service_total_price;
            this.globalToast.clear();
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (index == 2) {
        this.time = "30";
        this.$http
          .post(BASE_URL + "/api/get_worker_info", {
            worker_id: localStorage.getItem("workId"),
            day: this.time
          })
          .then(res => {
            console.log(res);
            this.finish_cards = res.data.finish_cards;
            this.service_count = res.data.service_count;
            this.service_total_price = res.data.service_total_price;
            this.globalToast.clear();
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (index == 3) {
        this.$http
          .post(BASE_URL + "/api/get_worker_info", {
            worker_id: localStorage.getItem("workId")
          })
          .then(res => {
            console.log(res);
            this.finish_cards = res.data.finish_cards;
            this.service_count = res.data.service_count;
            this.service_total_price = res.data.service_total_price;
            this.globalToast.clear();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style scoped>
.Hasservice {
  background: #f5f5f5;
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
  margin: 10px auto 10px;
  border-radius: 10px;
}
.Hasservice_listher {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 15px 10px;
}
/* .Hasservice_listher h2 span{width:3px;background: #499ef0;display: inline-block;height: 14px;margin-right: 10px;} */
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
.active {
  background: #499ef0;
  color: #fff !important;
}
</style>
