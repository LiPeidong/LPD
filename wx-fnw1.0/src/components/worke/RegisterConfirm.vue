<template>
  <!-- 我的注册信息 -->
  <div id="confirm" v-cloak>
    <div class="boxs">
      <div class="box">
        <div style="font-size:22px;line-height:2;">我的注册信息</div>
        <p>请确认注册信息是否正确</p>
      </div>
      <div class="box-t list-field my-field">
        <a>
          <van-icon name="edit-data"></van-icon>
          <span @click="editUserinfo">修改</span>
        </a>
        <van-field
          label="微信昵称："
          :placeholder="nickname"
          disabled
          style="text-align:left;line-height:30px;"
        ></van-field>
        <van-field
          label="真实姓名："
          :placeholder="name"
          disabled
          style="text-align:left;line-height:30px;"
        ></van-field>
        <van-field
          label="手机号码："
          :placeholder="phone"
          disabled
          style="text-align:left;line-height:30px;"
        ></van-field>
        <van-field
          label="所属商家："
          :placeholder="shops"
          disabled
          style="text-align:left;line-height:30px;"
        ></van-field>
        <div class="adds van-cell van-field">
          <div class="van-cell__title">
            <span class="van-cell__text">服务范围：</span>
          </div>
          <ul class="van-cell__value" style="text-align: left; display:flex; flex-wrap: wrap;padding-top: 4px;">
            <li v-for="(item,index)  in service" :key="index">{{item}}&ensp;</li>
          </ul>
        </div>
      </div>
      <div class="box-t list-field my-field">
        <a>
          <van-icon name="edit-data"></van-icon>
          <span @click="editContent">修改</span>
        </a>
        <div class="adds van-cell van-field">
          <div class="van-cell__title" style="height: 30px">
            <span class="van-cell__text">平台服务：</span>
          </div>
          <ul
            class="van-cell__value"
            style="text-align: left;display:flex;flex-wrap: wrap;padding-right:50px;align-items: center"
          >
            <li v-for="(item,index) in client" :key="index ">{{item}}&ensp;</li>
          </ul>
        </div>
        <div class="adds van-cell van-field">
          <div class="van-cell__title">
            <span class="van-cell__text">服务商服务：</span>
          </div>
          <ul
            class="van-cell__value"
            style="text-align: left;display:flex;flex-wrap: wrap;padding-right:50px;align-items: center"
          >
            <li v-for="(item,index) in ser" :key="index ">{{item}}&ensp;</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="p-10" style="margin: 20px 0 40px;text-align:center;">
      <van-button class="btn-primary" size="large" @click="register()" :disabled="isDisable">确认提交</van-button>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";

  export default {
    name: "RegisterConfirm",
    data() {
      return {
        isDisable:false,
        globalToast: null, //加载弹窗
        nickname: "",
        name: "",
        phone: "",
        shops: "",
        service: [], //服务范围
        client_category: [] ,//平台内容
        service_basic : [],
        client:[],
        ser:[],
      };
    },
    created: function created() {
      //禁止返回
      // history.pushState(null, null, document.URL);
      // window.addEventListener('popstate', function () {
      // 	history.pushState(null, null, document.URL);
      // });

      this.registerData = JSON.parse(localStorage.getItem("registerData"));
      this.comfirmData = JSON.parse(localStorage.getItem("user"));
      var tempData = JSON.parse(localStorage.getItem("temp"));
      this.client_category = this.registerData.client_cate_gory_ids ? this.registerData.client_cate_gory_ids : []
      this.service_basic = this.registerData.service_provider_basic_product_ids ? this.registerData.service_provider_basic_product_ids : []
      this.nickname = this.registerData.nickname;
      this.name = this.registerData.name;
      this.phone = this.registerData.phone;
      this.shops = this.registerData.service_provider;
      this.service = this.registerData.districts;
      for (var i = 0; i < this.client_category.length; i++) {
        for (var j = 0; j < tempData.client_basic_product_cate_gory.length; j++) {
          if (tempData.client_basic_product_cate_gory[j].id == this.client_category[i])
            this.client.push(tempData.client_basic_product_cate_gory[j].name);
        }
      }
      for (var i = 0; i < this.service_basic.length; i++) {
        for (var j = 0; j < tempData.service_provider_basic_products.length; j++) {
          if (tempData.service_provider_basic_products[j].id == this.service_basic[i])
            this.ser.push(tempData.service_provider_basic_products[j].name);
        }
      }
    },
    mounted() {
      this.$nextTick(() =>{
      	//实例完全插入文档
      	var ua = window.navigator.userAgent.toLowerCase();
      	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      		this.cartView();
      	} else {
      		var body = document.querySelector('body');
      		body.innerHTML = '请用微信打开此链接';
      		body.setAttribute('text-align', 'center');
      	}
      });
    },
    methods: {
      //提交信息
      register() {
        this.isDisable = true;
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "提交中..."
        });
        this.$http
          .post(BASE_URL + "/api/request_to_be_worker", this.registerData)
          .then(res => {
            this.isDisable = false;
            if (res.status == 200) {
              let dataUser = {user: null};
              dataUser.user = {
                name: this.registerData.name,
                phone: this.registerData.phone,
                service_provider: this.shops,
                client: this.client,
                ser:this.ser,
                districts: this.registerData.districts
              };
              localStorage.setItem("auditin", JSON.stringify(dataUser));
              localStorage.removeItem("failed");
              localStorage.removeItem("temp");
              localStorage.removeItem("user");
              localStorage.removeItem("registerData");
              localStorage.removeItem("userInfor");
              this.$router.push("/Submit");
            }
            this.globalToast.clear();
          }).catch(err => {
            this.globalToast.clear();
            this.isDisable = false;
            this.$dialog
              .alert({
                message: "系统繁忙，请稍后再试!"
              })
        });
      },
      editUserinfo() {
        localStorage.setItem("userInfor", JSON.stringify(this.comfirmData));
        this.$router.push({
          path: "AnewRegister"
        });
      },
      editContent() {
        let data = {
          content: this.content
        };
        this.$router.push({
          path: "RegisterServices",
          query: {
            data: JSON.stringify(data)
          }
        });
      }
    }
  };
</script>
<style>
 #confirm input::-webkit-input-placeholder {
            /* placeholder颜色  */ color: #333;
        }
  #confirm {
    overflow: hidden;
  }

  #confirm .box {
    padding: 20px 5% 0;
    text-align: center;
  }

  #confirm .box p {
    color: #686868;
    line-height: 2;
  }

  #confirm .list p {
    color: #333;
    font-size: 0.18rem;
    line-height: 2;
    margin-top: 5px;
    text-align: start;
    margin-left: 15px;
  }

  #confirm .box-t {
    margin: 15px auto;
    width: 90%;
    padding: 0 10px;
    background: #fff;
    border-radius: 5px;
    position: relative;
  }

  #confirm .box-t > a {
    position: absolute;
    right: 10px;
    top: 0px;
    color: #489ef0;
    line-height: 30px;
    z-index: 1;
  }

  #confirm .box-t > a .van-icon {
    vertical-align: middle;
    margin-right: 4px;
  }

  #confirm .my-field.list-field .van-field .van-cell__title {
    text-align: left;
    height: 30px;
    line-height: 30px;
  }

  #confirm .van-button__text {
    font-size: 18px;
  }

  #confirm .van-field__control {
    line-height: 30px;
  }
</style>
