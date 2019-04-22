<template>
  <div class="userService">
    <div v-show="await" style="display: flex; background: #fff;">
      <div class="img-box">
        <img src="../../assets/images/work.png" alt="">
      </div>
      <div style="line-height: 90px;font-size: 18px;letter-spacing:2px;">等待服务工人接单</div>
    </div>
    <div v-show="ServGetDetails" style="height: 100%;overflow: hidden;">
      <div style="display: flex; background: #fff;">
        <div class="img-box">
          <img src="../../assets/images/work.png" alt="">
        </div>
        <div class="username">
          <p>{{workName}}</p>
          <p><span>服务工号：</span>{{job}}</p>
          <p style="display: flex;line-height: 20px;"><span>服务星级：</span><el-rate v-model="value" disabled void-color="#ffa800"></el-rate></p>
        </div>
        <div class="user_phone" >
          <a :href='"tel:"+workerPhone'><img src="../../assets/images/phone.png" alt=""></a>
        </div>
      </div>
      <div class="progress">
        <van-steps :active="active" active-color=" #499ef0">
          <van-step>订单已经提交</van-step>
          <van-step>工人已接单</van-step>
          <van-step>订单已完成</van-step>
        </van-steps>
      </div>
      <div class="user_text">
        <ul v-show="Have_order">
          <li><span>用户姓名：</span>{{completeName}}</li>
          <li>
            <div style="white-space: nowrap;">用户地址：</div>
            <div>{{completeSite}}</div>
          </li>
          <li><span>服务类型：</span>{{completeType}}</li>
          <li size="1"></li>
          <li><span>服务发起时间：</span>{{startTime}}</li>
          <li><span>服务承接时间：</span>{{continueTime}}</li>
        </ul>
        <ul v-show="Completed">
          <li><span>用户姓名：</span>{{completeName}}</li>
          <li>
            <div style="white-space: nowrap;">用户地址：</div>
      <div>{{completeSite}}</div>
          </li>
          <li><span>服务类型：</span>{{completeType}}</li>
          <li size="1"></li>
          <li><span>服务发起时间：</span>{{startTime}}</li>
          <li><span>服务承接时间：</span>{{continueTime}}</li>
          <li><span>服务完成时间：</span>{{fulfillTime}}</li>
          <li size="1"></li>
          <li><span>服务结果：</span>{{serviceResult}}</li>
          <li v-show="remarkShow"><span>配件备注：</span>{{partsTips}}</li>
          <li><span>支付费用：</span>{{charge}}元</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
  export default {
    name: 'userService',
    data () {
      return {
        Have_order:true,
        Completed:false,
        await:false,
        ServGetDetails:false,
        value:4,
        active: 1,
        timer : null,
        workerPhone:'',
        job:'',//服务工号
        workName:'',//师傅名称
        completeName:'',//用户姓名
        completeSite:'',//用户地址
        completeType:'',//服务类型
        startTime:'',//服务发起时间
        continueTime:'',//服务承接时间
        fulfillTime:'',//服务完成时间
        serviceResult:'',//服务结果
        partsTips:'',//配件备注
        charge:'',//支付费用
        remarkShow:false
      }
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http
        .post(BASE_URL + "/api/get_card_status", {
          card_id: this.$route.query.card_id,
        })
        .then(res => {
          console.log(res)
          if (res.data.code == 0){
            this.active = 0;
            this.ServGetDetails = false;
            this.await = true;
          }
          if (res.data.code == 100){
            this.active = 1;
            this.await = false;
            this.ServGetDetails = true;
            this.Have_order = true;
            this.Completed = false;
            this.workerPhone = res.data.worker ? res.data.worker.phone : '';
            this.job = res.data.worker ? res.data.worker.id : '';
            this.workName = res.data.worker ? res.data.worker.name : '工人离职';
            this.completeName = res.data.username;
            this.completeSite = res.data.address;
            this.completeType = res.data.type;
            //发起时间
            this.startTime = res.data.call_at;
            //承接时间
            this.continueTime = res.data.receive_at;
          }
          if (res.data.code == 200){
            this.active = 2;
            this.await = false;
            this.ServGetDetails = true;
            this.Have_order = false;
            this.Completed = true;
            this.job = res.data.worker ? res.data.worker.id : '';
            this.workerPhone = res.data.worker ? res.data.worker.phone : '';
            this.workName = res.data.worker ? res.data.worker.name : '工人离职';
            this.completeName = res.data.username;
            this.completeSite = res.data.address;
            this.completeType = res.data.type;
            //发起时间
            this.startTime  = res.data.call_at;
            //承接时间
            this.continueTime  = res.data.receive_at;
            //完成时间
            this.fulfillTime = res.data.end_at.date.substr(0,19);
            this.serviceResult = res.data.service_type;
            if ( !res.data.remark){
              this.remarkShow = false;
            } else {
              this.remarkShow = true;
              this.partsTips = res.data.remark;
            }

            this.charge = res.data.price;
          }
          if (res.data.code == 300){
            this.$dialog.alert({
              title: '温馨提示',
              message: '订单已撤销'
            }).then(()=>{
              clearInterval(this.timer)
              this.$router.push({
                path:'/client/PersonalCenter',
                query:{
                  user_id:res.data.user_id
                }
              })
            })
          }
          if (res.data.code == 400){
            this.$dialog.alert({
              title: '温馨提示',
              message: '订单已取消'
            }).then(()=>{
              clearInterval(this.timer)
              this.$router.push({
                path:'/client/PersonalCenter',
                query:{
                  user_id:res.data.user_id
                }
              })
            })
          }
          if (res.data.code == 500){
            clearInterval(this.timer)
              this.$router.push({
                path:'/client/ServiceDetail',
                query:{
                  card_id: this.$route.query.card_id
                }
              })
          }
          this.globalToast.clear();
        })
        .catch(error => {
          clearInterval(this.timer)
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        });

      this.timer = setInterval(() => {
        this.$http
          .post(BASE_URL + "/api/get_card_status", {
            card_id: this.$route.query.card_id
          })
          .then(res => {
            console.log(res)
            if (res.data.code == 0){
              this.active = 0;
              this.ServGetDetails = false;
              this.await = true;
            }
            if (res.data.code == 100){
              this.active = 1;
              this.await = false;
              this.ServGetDetails = true;
              this.Have_order = true;
              this.Completed = false;
              this.job = res.data.worker ? res.data.worker.id : '';
              this.workerPhone = res.data.worker ? res.data.worker.phone : '';
              this.workName = res.data.worker ? res.data.worker.name : '工人离职';
              this.completeName = res.data.username;
              this.completeSite = res.data.address;
              this.completeType = res.data.type;
              //发起时间
              this.startTime = res.data.call_at;
              //承接时间
               this.continueTime = res.data.receive_at;
            }
            //服务完成
            if (res.data.code == 200){
              this.active = 2;
              this.await = false;
              this.ServGetDetails = true;
              this.Have_order = false;
              this.Completed = true;
              this.job = res.data.worker ? res.data.worker.id : '';
              this.workerPhone = res.data.worker ? res.data.worker.phone : '';
              this.workName = res.data.worker ? res.data.worker.name : '工人离职';
              this.completeName = res.data.username;
              this.completeSite = res.data.address;
              this.completeType = res.data.type;
              //发起时间
              this.startTime = res.data.call_at;
              //承接时间
              this.continueTime = res.data.receive_at;
              //完成时间
              this.fulfillTime = res.data.end_at.date.substr(0,19);
              this.serviceResult = res.data.service_type;
              this.partsTips = res.data.remark;
              this.charge = res.data.price;
              clearInterval(this.timer)
            }
            if (res.data.code == 300){
              this.$dialog.alert({
                title: '温馨提示',
                message: '订单已撤销'
              }).then(()=>{
                clearInterval(this.timer)
                this.$router.push({
                  path:'/client/PersonalCenter',
                  query:{
                    user_id:res.data.user_id
                  }
                })
              })
            };
            if (res.data.code == 400){
              this.$dialog.alert({
                title: '温馨提示',
                message: '订单已取消'
              }).then(()=>{
                clearInterval(this.timer)
                this.$router.push({
                  path:'/client/PersonalCenter',
                  query:{
                    user_id:res.data.user_id
                  }
                })
              })
            };
            if (res.data.code == 500){
              clearInterval(this.timer)
              this.$router.push({
                path:'/client/ServiceDetail',
                query:{
                  card_id: this.$route.query.card_id
                }
              })
            }
            this.globalToast.clear();
          })
          .catch(error => {
            clearInterval(this.timer)
            this.globalToast.clear();
            this.$dialog
              .alert({
                message: "系统繁忙，请稍后再试!"
              })
          });
      },3000);
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style >
  .userService{height: 100%;}
  .img-box{width:60px;height: 60px;background: #edecf1;border-radius: 100%;margin: 15px 20px 15px 11px;}
  .img-box img{width:60px;height: 60px;border-radius: 100%;}
  .username{text-align: left;margin: 15px 0;}
  .username p:first-child{font-size: 18px;color: #333;}
  .username p{font-size: 12px;line-height: 22px;color: #686868;}
  .username .el-rate__icon{font-size: 14px;line-height: 20px;}
  .progress{margin:15px 11px 10px 11px;}
  .van-steps {border-radius:10px;}
  .van-step--horizontal .van-step__title{display: block !important;margin-left:13px !important; }
  .van-steps--horizontal .van-steps__items.van-steps__items--alone{padding-top: 15px;}
  .van-steps--horizontal .van-steps__items{margin-bottom: 20px;}
  .user_text{padding: 15px 11px;text-align: left;background: #fff;height: 100%;}
  .user_text ul li{line-height: 26px;}
  .user_text ul li:nth-child(4){border-bottom: dashed  1px #c7c7c7;margin: 14px 0;}
  .user_text ul li:nth-child(8){border-bottom: dashed  1px #c7c7c7;margin: 14px 0;}
  .user_text ul li:nth-child(2){display: flex;}
  .user_phone img{width: 29px;height: 29px;position: relative;top: 29px;right: -70px;}
</style>
