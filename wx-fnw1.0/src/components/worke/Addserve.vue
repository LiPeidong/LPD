<template>
  <div class="Person">
    <!-- 添加服务 -->
    <div id='app' v-cloak>
			<div class="boxs">
				<div class="box">
					<div style="font-size:22px;line-height:2.5;">请选择服务项目</div>
					<p>平台将通过您选择的项目为您派单</p>
					<p>（多选）</p>
				<div class="list">
						<p>综合服务</p>
						<ul class="ul-list">
							<li v-for="(item,index) in basicproducts" :key="index" @click="handler(index,$event)" :class="{'active':active}">{{item.name}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div>
				<div class="stit m-10" v-if="picshow.p1 || picshow.p2 || picshow.p3" style="text-align:left">资质信息</div>
				<div class="m-10" v-if="picshow.p1">
					<my-upload :img='imgs.service_pic_1?imgs.service_pic_1:""' :pic-up="picUp" ind='service_pic_1' txt='开锁资质照片' @childget='getImg'></my-upload>
					<p class="prompt" style="text-align:left;">开锁属于特种行业，请您上传开锁资质文件照片</p>
				</div>
        <div class="m-10" v-if="picshow.p2">
					<my-upload :img='imgs.service_pic_2?imgs.service_pic_2:""' :pic-up="picUp" ind='service_pic_2' txt='家电维修证书' @childget='getImg'></my-upload>
					<p class="prompt">上传专业技能资格证书，获取更多订单</p>
				</div>
        <div class="m-10" v-if="picshow.p3">
					<my-upload :img='imgs.service_pic_3?imgs.service_pic_3:""' :pic-up="picUp" ind='service_pic_3' txt='水电技能证书' @childget='getImg'></my-upload>
					<p class="prompt">上传专业技能资格证书，获取更多订单</p>
				</div>
			</div>
			<div class="p-10" style="margin: 20px 0 40px;text-align:center;">
				<van-button class='btn-primary' size="large" @click="register">提交申请</van-button>
			</div>
		</div>

  </div>
</template>

<script>
import BASE_URL from "../../constants";
export default {
  name: "Addserve",
  data() {
    return {
      globalToast: null, //加载弹窗
      isAdd: false, //是否是添加服务页面
      basicproducts:[], //综合服务类型
      active: false,
      dataid:[], //服务类型的id
      picshow: {
        p1: false,
        p2: false,
        p3: false
      }, //是否显示上传图片
      picUp: {
        //图片上传的属性
        url: BASE_URL + "/api/upload_qiniu",
        name: "photo"
      },
      imgs: {}, //提交的资质照片
      img_data:[], //存放图片的数组
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
      .post(BASE_URL + "/api/add_worker_basic_products", {
        worker_id: localStorage.getItem("workId")
      })
      .then(res => {
        console.log(res.data)
          this.globalToast.clear();
          this.basicproducts = res.data.basic_products;
      })
      .catch(err => {
        console.log(err);
      });
  },

  mounted() {

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
    handler(index, e) {
      if (!e.target.className) {
        e.target.className = "active"; //切换按钮样式
        //写逻辑
        this.dataid.push(this.basicproducts[index].id)
      } else {
        e.target.className = ""; //切换按钮样式
       this.dataid.splice(this.dataid.indexOf(this.basicproducts[index].id),1)
      }
    },
    //列表选择

    //从组件获取img数据
     getImg(i, url) {
      this.img_data=[]
      this.img_data.push(url)
    },
    //提交信息
     register() {
      //提交前验证
      if ( !this.dataid.length) {
        this.$toast.fail("请至少选择一个服务内容！");
        return false;
      }
       this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http
      .post(BASE_URL + "/api/store_worker_basic_products", {
        worker_id: localStorage.getItem("workId"),
        basic_products : this.dataid,
        img_data : this.img_data
      })
      .then(res => {
        console.log(res.data)
        this.$router.push({
            name:'Servecheck',
        });
         this.globalToast.clear();
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
};
</script>
<style scoped>
#app {min-height: 100vh;overflow: hidden;}
.box {padding: 20px 5%;text-align: center; background: #fff;}
.box p {color: #686868; line-height: 2;}
.list p {color: #333;font-size: 18px;line-height: 2;margin-top: 5px;text-align: start;margin-left: 8px;}
.ul-list li{height: 25px;line-height: 25px;}
.active{color: #fff;background: #5f9de9;   }

.van-button--large {
  width: 80%;
  margin-top: 25px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
</style>


