<template>
  <div class="Person">
    <!-- 添加服务 -->
    <div id='app' v-cloak>
			<div class="boxs">
				<div class="box">
					<div style="font-size:18px; font-weight: bold">请选择服务项目</div>
					<p>平台将通过您选择的项目为您派单</p>
					<p>（多选）</p>
				<div class="list">
						<p>平台服务</p>
						<ul class="ul-list">
							<li v-for="(item,index) in list_info" :key="index" @click="handler(index,$event)" :class="{'active':active}" style="width: 29%;padding: 0;">{{item.name}}</li>
            </ul>
					</div>
          <div class="list">
            <p>服务商服务</p>
            <ul class="ul-list">
              <li v-for="(item,index) in list_info2" :key="index" @click="handler2(index,$event)" :class="{'active':active}" style="width: 29%;padding: 0;">{{item.name}}</li>
            </ul>
          </div>
				</div>
			</div>
			<div>
				<div class="stit m-10" style="text-align: left;">资质信息</div>
        <div class="m-10" >
					<my-upload :img='imgs.service_pic_1?imgs.service_pic_1:""' :pic-up="picUp" ind='service_pic_1' txt='开锁资质照片' @childget='getImg'></my-upload>
					<p class="prompt">提供开锁服务的服务人员须上传本人开锁资质</p>
				</div>
        <!-- <div class="m-10">
					<my-upload :img='imgs.service_pic_2?imgs.service_pic_2:""' :pic-up="picUp" ind='service_pic_2' txt='家电维修证书' @childget='getImg'></my-upload>
					<p class="prompt">上传专业技能资格证书，获取更多订单</p>
				</div> -->
			</div>
			<div class="p-10" style="margin: 30px 0px 0px 0px;text-align:center;">
				<van-button class='btn-primary' size="large" @click="register()" >提交信息</van-button>
			</div>
		</div>
  </div>
</template>

<script>
import BASE_URL from "../../constants";
export default {
  name: "RegisterServices",
  data() {
    return {
      current:'',
      prevdata:{},
      dataid:[],
      classItem: {},
      active: false,
      index: false,
      globalToast: null, //加载弹窗
      isAdd: false, //是否是添加服务页面
      canServices: [], //所有服务
      list_info: [], //平台服务
      list_info2: [], //服务商服务
      key: "",
      user:'',
      nickName: "", //微信昵称
      picshow: {
        p1: true,
        p2: true,
      }, //是否显示上传图片
      picUp: {
        //图片上传的属性
        url: BASE_URL + "/api/upload_qiniu",
        name: "photo"
      },
      imgs: [], //提交的资质照片
      client_cate_gory:[],
      service_provider_basic_product_ids:[]
    };
  },
  created() {
    // 获取居住和服务地址
    this.key = this.$route.query.key;
     let service =  JSON.parse(localStorage.getItem('temp'))
     let seruser =  JSON.parse(localStorage.getItem('user'))
     if(service){
        this.list_info = service.client_basic_product_cate_gory
        this.list_info2 = service.service_provider_basic_products
     }else{
        let fail =  JSON.parse(localStorage.getItem('failed'))
        // this.list_info = fail.basic_products
       this.list_info = fail.client_basic_product_cate_gory
       this.list_info2 = fail.service_provider_basic_products
     }


  },

  mounted() {
    this.prevdata =JSON.parse(localStorage.getItem('temp')) || JSON.parse(localStorage.getItem('failed'))
    console.log(this.prevdata)
    this.prevdatauser =JSON.parse(localStorage.getItem('user')) ||  this.prevdata.user
    //生命周期
    this.$nextTick(() => {
      //实例完全插入文档
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.cartView();
      } else {
        var body = document.querySelector("body");
        body.innerHTML = "请用微信打开此链接";
        body.setAttribute("text-align", "center");
      }
    });
  },
  methods: {
    // 初始化
    cartView() {},
    //从组件获取img数据
    getImg(i, url) {
      let user =  JSON.parse(window.localStorage.getItem('user')) ;
      let imageData = user.img_data;
        this.imgs.push(url)
        for(var i =0;i<this.imgs.length;i++){
            imageData.push(this.imgs[i])
        }
    },
   handler(index, e) {
      if (!e.target.className) {
        e.target.className = "active"; //切换按钮样式
        //写逻辑
        this.client_cate_gory.push(this.list_info[index].id)
        console.log( this.client_cate_gory)
        this.prevdata.client_cate_gory = this.client_cate_gory
      } else {
        e.target.className = ""; //切换按钮样式
        this.client_cate_gory.splice(this.client_cate_gory.indexOf(this.list_info[index].id),1)
        console.log( this.client_cate_gory)
        this.prevdata.client_cate_gory = this.client_cate_gory
      }
    },
    handler2(index, e) {
      if (!e.target.className) {
        e.target.className = "active"; //切换按钮样式
        //写逻辑
        this.service_provider_basic_product_ids.push(this.list_info2[index].id)
        console.log( this.service_provider_basic_product_ids)
        this.prevdata.service_provider_basic_product_ids = this.service_provider_basic_product_ids
      } else {
        e.target.className = ""; //切换按钮样式
        this.service_provider_basic_product_ids.splice(this.service_provider_basic_product_ids.indexOf(this.list_info[index].id),1)
        console.log( this.service_provider_basic_product_ids)
        this.prevdata.service_provider_basic_product_ids = this.service_provider_basic_product_ids
      }


    },
    //提交信息
    register() {
      var datas = {
        name: this.prevdatauser.name,
        id_card: this.prevdatauser.id_card,
        phone:this.prevdatauser.phone,
        open_id: this.prevdata.open_id,
        service_provider: this.prevdata.service_provider,
        nickname:this.prevdata.nickname,
        sex:  this.prevdata.sex,
        city:  this.prevdata.city,
        province:   this.prevdata.province,
        country:   this.prevdata.country,
        avatar:  this.prevdata.avatar,
        is_subscribe:   this.prevdata.is_subscribe,
        districts:this.prevdatauser.districts,
        img_data:this.prevdatauser.img_data,
        subscribe_at:this.prevdata.subscribe_at,
        service_provider_id:this.prevdata.service_provider_id,
        service_provider_basic_product_ids:this.prevdata.service_provider_basic_product_ids,
        client_cate_gory_ids : this.prevdata.client_cate_gory
      };
      localStorage.setItem('registerData',JSON.stringify(datas) )

      //提交前验证
      if (this.service_provider_basic_product_ids.length == 0 && this.client_cate_gory.length == 0) {
        this.$toast.fail("请至少选择一个服务内容！");
        return false;
      }

      //验证通过，提交数据
      this.$router.push("/RegisterConfirm");
    },
  }

};
</script>
<style scoped>
#app {
  min-height: 100vh;
  overflow: hidden;
}
.box {
  padding: 20px 33px;
  text-align: center;
  background: #fff;
}
.box p {
  color: #686868;
  padding-top: 20px;
}
.Person .list p {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  text-align: start;
}
.Person .van-button--large {
  width: 295px;
  height: 40px;
  border-right: 10px;
  line-height:40px;
}
.Person .active {
  background: #489ef0;
  color: #fff !important;
}
</style>


