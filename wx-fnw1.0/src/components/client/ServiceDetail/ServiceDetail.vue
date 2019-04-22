<template>
  <div>
    <service-info :name="name" :phone="phone" :address="address" :startTime="startTime" :continueTime="continueTime"
                  :fulfillTime="fulfillTime" :serviceName="serviceName" :job="job"
                  :servicePhone="servicePhone"></service-info>
    <service-result :partsType="partsType" :partsName="partsName" :maintainMoney="maintainMoney"
                    :subsidyMoney="subsidyMoney" :payMoney="payMoney" :parts="parts"></service-result>
    <service-picture></service-picture>
    <div class="p-10" style="margin: 20px 0 40px;text-align:center;">
      <van-button class="btn-primary" size="large" style="width:80%;margin-bottom: 30px;height: 40px;line-height: 40px;"
                  @click="subMit" :disabled="isDisable">确认提交
      </van-button>
    </div>
  </div>
</template>
<script>
  import ServiceInfo from './components/ServiceInfo'
  import ServiceResult from './components/ServiceResult'
  import ServicePicture from './components/ServicePicture'
  import BASE_URL from "../../../constants/index.js";
  export default {
    name: "ServiceDetail",
    data() {
      return {
        img_path: '',
        isDisable: false,
        name: '',
        phone: '',
        address: '',
        startTime: '',
        continueTime: '',
        fulfillTime: '',
        serviceName: '',
        job: '',
        servicePhone: '',
        partsType: '',
        partsName: '',
        maintainMoney: '',
        subsidyMoney: '',
        payMoney: '',
        parts: ''
      }
    },
    components: {
      ServiceInfo,
      ServiceResult,
      ServicePicture
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      localStorage.removeItem('sceaeImg')
      this.$http.post(BASE_URL + '/api/get_card_status', {
        card_id: this.$route.query.card_id,
        open_id: localStorage.getItem('call_open_id')
      }).then(res => {
        this.globalToast.clear();
        if (res.data.code != 500) {
          this.$router.push({
            path: '/client/PersonalCenter',
            query: {
              user_id: res.data.user_id
            }
          })
        }
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
      this.$http
        .post(BASE_URL + "/api/get_not_confirm_finish_card_detail", {
          card_id: this.$route.query.card_id,
          open_id: localStorage.getItem('call_open_id')
        }).then((res) => {
        this.globalToast.clear();
        console.log(res.data)
        this.name = res.data.card.username;
        this.phone = res.data.card.phone;
        this.address = res.data.card.address;
        this.startTime = res.data.card.call_time; //服务开始时间
        this.continueTime = res.data.card.worker_service_start_at; //服务承接时间
        this.fulfillTime = res.data.card.worker_service_end_at; //服务发起时间
        this.serviceName = res.data.card.worker ? res.data.card.worker.name : '工人已离职';
        this.servicePhone = res.data.card.worker ? res.data.card.worker.phone : '';
        this.job = res.data.card.worker ? res.data.card.worker.id : '';
        this.partsType = res.data.card.status;
        this.partsName = res.data.card.parts;
        this.maintainMoney = res.data.card.price;
        this.subsidyMoney = res.data.card.price;
        this.payMoney = this.maintainMoney - this.subsidyMoney;
        this.parts = res.data.card.parts;
        if (res.data.code == -10000) {
          this.$dialog
            .alert({
              message: res.data.message
            }).then(() => {
            this.$router.push({
              path: '/client/PersonalCenter',
              user_id: res.data.user_id
            })
          })
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
      subMit() {
        this.isDisable = true;
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "加载中..."
        });
        if (localStorage.getItem("sceaeImg") == null){
          this.$toast.fail("请上传现场照片！");
          this.isDisable = false;
            return false;
        }
        this.$http
          .post(BASE_URL + "/api/user_confirm_verify", {
            card_id: this.$route.query.card_id,
            verfication_img: localStorage.getItem('sceaeImg'),
            worker_id: localStorage.getItem('workId')
          }).then((res) => {
          this.globalToast.clear();
          if (res.data.code == 10000) {
            this.$dialog.alert({
              title: '温馨提示',
              message: '请对本次服务做出评价！'
            }).then(() => {
              this.$router.push({
                name: 'Rate',
                query: {
                  card_id: this.$route.query.card_id
                }
              })
            })
          }
          if (res.data.code == -10000) {
            this.$dialog.alert({
              title: '温馨提示',
              message: '服务确认中，请勿重复确认！'
            })
          }
        }).catch(err => {
          this.globalToast.clear();
          this.isDisable = false;
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        })
        sessionStorage.removeItem('sceaeImg');
      }
    }
  }
</script>
<style scoped>
</style>
