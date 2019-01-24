<template>
  <div class="Person">
    <!-- 现有服务项目 -->
    <div v-cloak>
      <div class="boxs">
        <div class="box">
          <div style="font-size:22px;margin-bottom:10px;">现有服务项目</div>
          <p>平台将通过以下项目为您派单</p>
          <div class="list">
            <p>综合项目</p>
            <ul class="ul-list">
              <li v-for="(item,index) in basicproducts" :key="index" :class="{'active':active}">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <van-button size="large" class="btn-primary" @click="serviceto" :disabled="!isCheck">添加更多服务</van-button>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";

  export default {
    name: "Nowservices",
    data() {
      return {
        isCheck: true,
        active: true,
        basicproducts: '', //现有服务
        globalToast: null, //加载弹窗
        isAdd: false, //是否是添加服务页面
        canServices: [], //所有服务
        list_info1: [], //可以添加的家庭类类项目
        list_info2: [], //可以添加的的家电类项目
        list_info3: [], //可以添加的的五金类项目
        list_info4: [], //可以添加的的门窗家具类项目
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
        .post(BASE_URL + "/api/get_woker_basic_products", {
          worker_id: localStorage.getItem("workId")
        })
        .then(res => {
          this.basicproducts = res.data.basic_products
          this.globalToast.clear();
        })
        .catch(err => {
          console.log(err);
        });
      this.$http
        .post(BASE_URL + "/api/add_worker_basic_products", {
          worker_id: localStorage.getItem("workId")
        })
        .then(res => {
          console.log(res.data)
          if (res.data.basic_products.length == 0) {
            this.isCheck = false
          }
        })
        .catch(err => {
          console.log(err);
        });
      //获取服务列表
      // axios
      //   .get(baseURL + "/user/get/category")
      //   .then(function(res) {
      //     _this.canServices = res.data.service_info;
      //     if (res.data.worker_info) {
      //       //图片
      //       _this.imgs = JSON.parse(res.data.worker_info.img_data);
      //       _this.cat_ids = res.data.worker_info.cat_id.split(",");
      //     }
      //     _this.canServices.forEach(function(e1) {
      //       _this.$set(e1, "type", false);
      //       _this.cat_ids.forEach(function(e2) {
      //         if (e1.cat_id == e2) {
      //           e1.type = true;
      //           if (e2 == 1) {
      //             //如果有开锁
      //             _this.picshow.p1 = true;
      //           }
      //           if (e1.pid == 6) {
      //             //如果有家电维修类
      //             _this.picshow.p2 = true;
      //           }
      //           if (e1.pid == 7) {
      //             //如果有五金维修类
      //             _this.picshow.p3 = true;
      //           }
      //         }
      //       });
      //       if (e1.pid == 4 || e1.pid == 5) {
      //         //疏通开锁
      //         _this.list_info1.push(e1);
      //       } else if (e1.pid == 6) {
      //         // 家电维修
      //         _this.list_info2.push(e1);
      //       } else if (e1.pid == 7) {
      //         // 五金维修
      //         _this.list_info3.push(e1);
      //       } else if (e1.pid == 41) {
      //         // 清洗加氟服务
      //         _this.list_info4.push(e1);
      //       }
      //     });
      //     _this.globalToast.clear();
      //   })
      //   .catch(function(err) {
      //     console.log(err.message);
      //   });
    },

    mounted() {
      var _this2 = this;

      //生命周期
      // this.$nextTick(function() {
      //   //实例完全插入文档
      //   var ua = window.navigator.userAgent.toLowerCase();
      //   if (ua.match(/MicroMessenger/i) == "micromessenger") {
      //     _this2.cartView();
      //   } else {
      //     var body = document.querySelector("body");
      //     body.innerHTML = "请用微信打开此链接";
      //     body.setAttribute("text-align", "center");
      //   }
      // });
    },
    methods: {

      // 初始化
      cartView() {
      },

      //列表选择
      listSelect(item) {
        var _this = this;
        item.type = !item.type;
        //是否选择疏通开锁
        if (item.cat_id == 1) {
          _this.picshow.p1 = item.type;
        }
        //是否选择家电类型和五金（有一个值成立，返回false）
        var isShow1 = _this.list_info2.some(function (e) {
          return e.type;
        });
        if (isShow1) {
          _this.picshow.p2 = true;
        } else {
          _this.picshow.p2 = false;
        }
        var isShow2 = _this.list_info3.some(function (e) {
          return e.type;
        });
        if (isShow2) {
          _this.picshow.p3 = true;
        } else {
          _this.picshow.p3 = false;
        }

      },


      //提交信息
      register() {
        this.$router.push('/RegisterConfirm')
        var _this3 = this;
        this.new_cat_id = []; //清空选中的服务
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "提交中..."
        });
        //获取选中的服务的cat_id
        this.canServices = this.list_info1.concat(
          this.list_info2,
          this.list_info3,
          this.list_info4
        );
        this.canServices.forEach(function (e) {
          if (e.type) {
            _this3.new_cat_id.push(e.cat_id);
          }
        });

        //验证通过，提交数据
        //   axios.post(baseURL + "/user/post/addCategory", datas).then(function(res) {
        //     if (res.data.res) {
        //       _this3.globalToast.clear();
        //       window.location.href = "register-confirm.html";
        //     }
        //   });
      },
      serviceto() {
        this.$router.push({
          name: 'Addserve',
        });
      }
    }

  };
</script>
<style scoped>
  #app {
    min-height: 100vh;
    overflow: hidden;
  }

  .box {
    padding: 20px 5%;
    text-align: center;
    background: #fff;
  }

  .box p {
    color: #686868;
    line-height: 2;
  }

  .list p {
    color: #333;
    font-size: 18px;
    line-height: 2;
    margin-top: 5px;
    text-align: start;
    margin-left: 8px;
  }

  .van-button--large {
    width: 80%;
    margin-top: 25px;
    height: 40px;
    line-height: 40px;
  }

  .ul-list li {
    background: #fff;
    color: #489ef0;
  }

  .active {
    background: #489ef0 !important;
    color: #fff !important;
  }
</style>


