<template>
  <div class="CallService">
    <!--呼叫服务-->
    <div class="call_top">
      <div style="display: flex;">
        <p style="white-space: nowrap">微信昵称：</p>
        <p>{{nick_name}}</p>
      </div>
      <div style="display: flex;">
        <p style="white-space: nowrap">服务地址：</p>
        <p>{{full_address}}</p>
      </div>
    </div>
    <div class="CallMessage CallProject">
      <h2>&ensp;服务信息</h2>
      <div>
        <div>
          <span>姓&nbsp;&nbsp;&ensp;&nbsp;&nbsp;名：</span>
          <input type="text" placeholder="请填写您的真实姓名" v-model="name" style="width:176px">
        </div>
        <div>
          <span>电&nbsp;&nbsp;&ensp;&nbsp;&nbsp;话：</span>
          <input type="text" placeholder="请填写您的手机号码" v-model="phone" pattern="[0-9]*" style="width:176px">
        </div>
        <div>
          <span>验&nbsp;证&ensp;码：</span>
          <input type="text" placeholder="请填写验证码" v-model="verification" pattern="[0-9]*" maxlength='5'>
          <p v-if="canSave"
             style="color: #489ef0;position: absolute;right: 30px;top: 250px;font-size: 12px;"
             @click="verifiBtn">{{gain}}</p>
          <p v-else disabled
             style="color: #489ef0;position: absolute;right: 30px;top: 250px;font-size: 12px;"
             @click="verifiBtn">{{gainNub}}s</p>
        </div>
      </div>
    </div>
    <div class="CallProject">
      <h2>&ensp;服务项目&emsp;<span style="color: #c7c7c7; font-size: 13px;">请选择您需要的服务</span></h2>
      <div class="CallProject_list"  id="selectList" >
        <ul style="display: flex; margin-bottom: 10px;" v-for="item in listService">
          <li v-for="j in item" @click="select_id(j.id,$event,j.name,)" :class="{'active':active}">{{j.category_name}}</li>
        </ul>
      </div>
    </div>
    <div class="CallProject">
      <h2>&ensp;故障描述</h2>
      <div>
        <textarea v-model="description" placeholder="请详细描述故障问题" cols="30" rows="10"
                  style="resize:none; text-indent: 10px; padding-top:10px;height: 70px;background:#f5f5f5; width: 100%;border-radius: 5px;"></textarea>
      </div>
      <div class="box-c">
        <my-upload
          :img="upImgs.IDcard_1?upImgs.IDcard_1:''"
          :pic-up="picUp"
          ind="IDcard_1"
          txt="添加故障处照片"
          @childget="getImg"
        ></my-upload>
        <p class="prompt">*上传现场照片，有利于服务人员携带合适的工具进行服务。</p>
      </div>
    </div>
    <div style="color:#7e7e7e; font-size: 12px;margin-top: 14px;line-height: 20px;">
      <div style="display: flex; justify-content:center;">
        <van-checkbox v-model="isCheck"></van-checkbox>&ensp;
        <div style="line-height: 20px;">我已认真阅读并同意 <a style="color: #499ef0">用户协议</a></div>
      </div>
    </div>
    <div style="margin-top: 20px;text-align:center !important;margin-bottom: 18px;text-align: center;">
      <van-button size="large" :disabled="!isCheck" @click="callbtn" style="margin-bottom: 30px;">呼叫服务</van-button>
    </div>
    <div  v-show="submitShow">
      <van-popup class='my-popup' prevent-scroll v-model="submitShow">
        <div class="t">服务信息确认</div>
        <div class="c">
          <ul>
            <li>姓　　名：{{name}}</li>
            <li>电　　话：{{phone}}</li>
            <li style="display: flex;"><p style="white-space: nowrap;">服务地址：</p>
              <p>{{full_address}}</p></li>
            <li>服务类型：{{describe}}</li>
          </ul>
          <p class="prompt" style="margin: 12px 0px 12px 0px !important;color: #499ef0;">注：每次呼叫服务只能修复一处损坏</p>
        </div>
        <div class="b">
          <a class='my-btn back' @click="submitShow = false">返回修改</a>
          <a class='my-btn go'  href="javascript:;" @click="submit" id="btn">发起服务</a>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>

  import BASE_URL from "../../constants";

  export default {
    name: "CallService",
    data() {
      return {
        canSave: true,
        gainNub: 60,
        gain: '获取验证码',
        active: false,
        phone: '',
        name: '',
        description: '', //故障描述
        describe: '',//服务类型
        nick_name: '',
        full_address: '', //服务地址
        submitShow: false, //确认的弹窗
        isCheck: false,
        picUp: {
          //图片上传的属性
          url: BASE_URL + "/api/upload_qiniu",
          name: "photo"
        },
        upImgs: {}, //上传成功后的图片地址
        listService: [],//服务项目
        county_id: '',
        order_id: '',
        basic_product_id: '',
        mapping: '', //关联关系
        verification: null,
        location_time:null,
        lng:'',
        lat:'',
        user_call_img:'',
      }
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      console.log(localStorage.getItem('order_ids').split(',') instanceof Array)
      this.$http.post(BASE_URL + '/api/get_order_detail', {
        open_id: localStorage.getItem('call_open_id'),
        order_ids: localStorage.getItem('order_ids').split(',')
      }).then(res => {
        console.log(res)
        this.county_id = res.data.county_id;
        this.listService = res.data.basic_products;//服务项目
        this.mapping = res.data.mapping;
        this.nick_name = res.data.nick_name;
        this.full_address = res.data.full_address; //服务地址
        this.globalToast.clear();
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

      this.$http.get(BASE_URL+'/wechat/get_index_location_config').then(res => {
        this.globalToast.clear();
        wx.config(res.data);
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      })
    },
    methods: {
      verifiBtn() {
        var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!regPhone.test(this.phone)) {
          this.$toast.fail("请填写正确的手机号码!");
          return false;
        }
        if (!this.canSave) {
          this.canSave = false;
          return false;
        } else {
          this.gainNub = 60;
          var date = setInterval(() => {
            this.gainNub--;
            if (this.gainNub == 0) {
              this.canSave = true;
              clearInterval(date)
            }
          }, 1000);
          this.globalToast = this.$toast.loading({
            duration: 0, // 持续展示 toast
            mask: true, //背景层
            forbidClick: true, // 禁用背景点击
            message: "加载中..."
          });
          this.$http.post(BASE_URL + '/api/send_message', {
            phone: this.phone
          }).then(res => {
            console.log(res)
            this.globalToast.clear();
            if (res.data.code == -10000) {
              this.$toast.fail(res.data.message);
            }
            if (res.data.code == 10000) {
              this.$toast.fail(res.data.message);
            }
          }).catch(err => {
            this.globalToast.clear();
            this.$dialog
              .alert({
                message: "系统繁忙，请稍后再试!"
              })
          })
          this.canSave = false;
        }
      },
      //从组件获取img数据
      getImg(i, url) {
        this.upImgs[i] = url;
        console.log(this.upImgs[i])
        this.user_call_img = url
        localStorage.setItem('img', url)
      },
      //呼叫服务
      callbtn() {
        var regName = /^[\u4e00-\u9fa5]{2,4}$/;
        var regN2 = /某某|女士|先生|师傅|师父|小姐/;
        if (!regName.test(this.name) && this.name == '') {
          this.$toast.fail("请输入真实中文姓名！");
          return false;
        } else if (regN2.test(this.name)) {
          this.$toast.fail("请输入正确的真实姓名！");
          return false;
        }
        var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!regPhone.test(this.phone) && this.phone == '') {
          this.$toast.fail("请填写正确的手机号码!");
          return false;
        } else if (!this.verification) {
          this.$toast.fail('请填写正确的验证码!');
          return false;
        }
        if (this.describe == '') {
          this.$toast.fail("请选择服务类型");
          return false;
        }
        if (this.description == '') {
          this.$toast.fail("描述故障不能为空");
          return false;
        }
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "加载中..."
        });
        this.$http.post(BASE_URL + '/api/verification_code', {
          phone: this.phone
        }).then(res => {
          this.globalToast.clear();
          if (res.data.code === 10000) {
            if (this.verification != res.data.message) {
              this.$dialog
                .alert({
                  message: '验证码输入错误'
                })
              this.submitShow = false;
              return false;
            } else {
              this.submitShow = true;
            }
          } else if (res.data.code == -10000) {
            this.$dialog
              .alert({
                message: res.data.message
              }).then(() => {
              return false;
              this.submitShow = false;
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
      //选择服务项目
      select_id(id, e, name) {
        this.order_id = this.mapping[id];
        this.basic_product_id = id;
        this.describe = name;
        for (var i = 0; i < document.getElementById('selectList').children.length; i++) {
          for (var j = 0 ; j < document.getElementById('selectList').children[i].children.length; j++) {
            document.getElementById('selectList').children[i].children[j].setAttribute('class', '')
          }
        }
        if (!e.target.className) {
          e.target.className = "active"; //切换按钮样式
        } else {
          e.target.className = ""; //切换按钮样式
        }
      },
      //发起服务
      submit() {
        this.submitShow = false;
        wx.ready(() => {
          wx.getLocation({
            success: (res) => {
              this.lat = res.latitude;
              this.lng = res.longitude;
              this.globalToast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                mask: true, //背景层
                forbidClick: true, // 禁用背景点击
                message: "加载中..."
              });
              this.$http.post(BASE_URL + '/api/before_call_service', {
                basic_product_id: this.basic_product_id,
                order_id: this.order_id,
                open_id: localStorage.getItem('call_open_id'),
              }).then(res => {
                this.globalToast.clear();
                console.log(res)
                if (res.data.code == -10000) {
                  this.$dialog.alert({
                    title: '温馨提示',
                    message: res.data.message
                  })
                }
                if(res.data.code == 10000){
                  this.$http.post(BASE_URL + '/api/call_service', {
                    county_id: this.county_id,
                    order_id: this.order_id,
                    basic_product_id: this.basic_product_id,
                    name: this.name,
                    phone: this.phone,
                    open_id: localStorage.getItem('call_open_id'),
                    remark: this.description,
                    lat : this.lat,
                    lng : this.lng,
                    user_call_img : this.user_call_img
                  }).then(res => {
                    if(res.data.code == 10000){
                      this.$dialog.alert({
                        title: '温馨提示',
                        message: res.data.message
                      }).then( () => {
                        this.$router.push({
                          path: '/client/Callsucceed',
                          query: {
                            card_id: res.data.card_id
                          }
                        })
                      })
                    }
                    this.globalToast.clear();
                  }).catch(err => {
                    this.globalToast.clear();
                    this.$dialog
                      .alert({
                        message: "系统繁忙，请稍后再试!"
                      })
                  });
                }
                if (res.data.code == 20000) {
                  this.globalToast = this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    mask: true, //背景层
                    forbidClick: true, // 禁用背景点击
                    message: "加载中..."
                  });
                  this.$http.post(BASE_URL + '/wechat/prepay_for_card_needs_pay', {
                    open_id: localStorage.getItem('call_open_id'),
                    basic_product_id: this.basic_product_id,
                    order_id: this.order_id,
                  }).then(data => {
                    console.log(data);
                    this.globalToast.clear();
                    if (data.data.code == 10000){
                      var that = this;
                      wx.config({
                        appId:data.data.config.appId,
                        nonceStr:data.data.config.nonceStr,
                        timestamp:data.data.config.timestamp,
                        signature:data.data.config.signature,
                        jsApiList:['chooseWXPay']
                      })
                      wx.chooseWXPay({
                        timestamp: data.data.prepay_info.timestamp,
                        nonceStr: data.data.prepay_info.nonceStr,
                        package: data.data.prepay_info.package,
                        signType: data.data.prepay_info.signType,
                        paySign: data.data.prepay_info.paySign, // 支付签名paySign
                        success: res => {
                          if(res.errMsg === 'chooseWXPay:ok'){
                            that.$http.post(BASE_URL + '/api/call_service', {
                              county_id: that.county_id,
                              order_id: that.order_id,
                              basic_product_id: that.basic_product_id,
                              name: that.name,
                              phone: that.phone,
                              open_id: localStorage.getItem('call_open_id'),
                              remark: that.description,
                              lat : this.lat,
                              lng : this.lng,
                              user_call_img : this.user_call_img
                            }).then(res => {
                              if(res.data.code == 10000){
                                that.$dialog.alert({
                                  title: '温馨提示',
                                  message: res.data.message
                                }).then( () => {
                                  that.$router.push({
                                    path: '/client/Callsucceed',
                                    query: {
                                      card_id: res.data.card_id
                                    }
                                  })
                                })
                              }
                              that.globalToast.clear();
                            }).catch(err => {
                              that.globalToast.clear();
                              that.$dialog
                                .alert({
                                  message: "系统繁忙，请稍后再试!"
                                })
                            });
                          }else{
                            that.$dialog.alert({
                              message : "支付失败！"
                            });
                          }
                        },
                        cencel: res => {
                          // 取消
                        },
                        fail: error => {
                          // 支付失败
                        }
                      });
                    }
                    if (data.data.code == -10000){
                      this.$dialog
                        .alert({
                          message: data.data.message
                        })
                    }
                  }).catch(err => {
                    this.globalToast.clear();
                    this.$dialog
                      .alert({
                        message: "系统繁忙，请稍后再试!"
                      })
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
            },
            cancel: (res) => {
              this.$dialog.alert({
                title: '温馨提示',
                message: '接单须先授权获取地理位置！'
              }).then(()=> {
                this.submit()
              });
            }
          });
        });
      }
    }
  }
</script>

<style>
  .CallService .my-popup {
    height: 268px;
    width: 305px
  }

  .CallService .my-popup .t {
    padding: 13px 0 !important;
    line-height: normal;
  }

  .CallService .my-popup .c {
    padding: 14px 13px;
  }

  .CallService .my-popup .b {
    padding: 0px;
    margin-bottom: 25px;
    margin-top: 26px;
  }

  .CallService .my-btn {
    font-size: 15px;
    border-radius: 14px;
  }

  .CallService .my-btn.back {
    height: 27px;
    width: 120px;
    margin-left: -50px;
    margin-right: 22px;
    padding: 0px
  }

  .CallService .my-btn.go {
    height: 27px;
    width: 120px;
    margin-right: -50px;
    margin-left: 0px;
    padding: 0px
  }

  .CallService .c > ul > li {
    font-size: 13px;
    margin-bottom: 12px;
  }

  .CallService {
    background: #f5f5f5;
    height: 100%;
    padding: 10px;
    text-align: left;
    font-size: 15px;
  }

  .CallService .call_top {
    width: 84%;
    margin: 0 auto;
    background: #fff;
    padding: 13px 15px 15px 16px;
    border-radius: 5px;
  }

  .CallService .call_top p {
    line-height: 29px;
  }

  .CallService .CallProject {
    background: #fff;
    padding: 15px 14px;
    margin-top: 10px;
    border-radius: 5px;
  }

  .CallService h2 {
    font-size: 15px;
    border-left: 2px solid #499ef0;
    margin-bottom: 18px;
  }

  .CallService .CallMessage > div > div {
    line-height: 32px;
  }

  .CallService .CallMessage > div > div button {
    background: #fff;
    color: #499ef0;
    position: relative;
    right: -4px;
  }

  .CallService .CallProject_list ul li {
    text-align: center;
    border-radius: 13px;
    border: 1px solid #499ef0;
    color: #499ef0;
    font-size: 13px;
    width: 29%;
    line-height: 20px;
    height: 20px;
    margin: 0 2%;
  }

  .CallService .pic-box {
    background: #f5f5f5;
    margin-top: 10px;
    border-radius: 5px;
    height: 82px;
  }

  .CallService .van-checkbox {
    margin-right: 0px;
    text-align: center;
  }

  .CallService .van-icon-add-o {
    margin: 6px 0px !important;
    font-size: 25px !important;
  }

  .CallService .van-checkbox .van-checkbox__icon {
    width: 20px;
    height: 20px;
  }

  .CallService .van-button--large {
    width: 80%;
    border-radius: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }

  .CallService .van-button--default {
    background: #499ef0;
    color: #fff;
  }

  .CallService input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #c7c7c7;
  }

  .CallService .active {
    background: #499ef0;
    color: #fff !important;
  }

  .CallService .pic-box span {
    font-size: 14px;
  }

  .CallService .prompt {
    font-size: 10px;
  }

  .CallService .van-checkbox__icon .van-icon {
    width: 15px;
    height: 15px;
    line-height: 15px;
  }
</style>
