<template>
  <div class="Person">
    <!-- 注册列表 -->
    <div id="app" v-cloak>
      <div class="BOXS">
        <div class="box box1">
          <div class="stit m-10">服务信息</div>
          <div class="box-c bg-white my-field">
            <van-cell-group>
              <van-field v-model="nickName" label="微信昵称：" disabled></van-field>
              <van-field
                v-model="form.user"
                label="真实姓名："
                clearable
                placeholder="请输入您的真实姓名"
              ></van-field>
              <van-field
                v-model="form.IDcard"
                label="身份证号："
                clearable
                placeholder="请输入您的身份证号码"
                pattern="[0-9]*"
              ></van-field>
              <div style="display: flex; justify-content: space-around; align-items: center;">
                <van-field v-model="form.phone" label="电话号码：" placeholder="请输入您的手机号码"  pattern="[0-9]*"></van-field>
                <p v-if="canSave"
                   style="white-space: nowrap;padding-right: 15px;color: #489ef0;padding-left: 10px;border-left: 1px solid #489ef0;"
                   @click="verifiBtn">{{gain}}</p>
                <p v-else disabled
                   style="white-space: nowrap;padding-right: 15px;color: #489ef0;padding-left: 10px;border-left: 1px solid #489ef0;"
                   @click="verifiBtn">{{gainNub}}s</p>
              </div>

              <van-field v-model="form.verification" label="手机验证码：" placeholder="请填写手机验证码"  pattern="[0-9]*"></van-field>
              <van-field
                v-model="form.adds1"
                class="add"
                label="服务地区"
                placeholder="请选择您服务的省、市"
                @focus="addsShow1 = true"
                readonly
                type="textarea"
                rows="1"
                autosize
              ></van-field>
              <div
                class="adds van-cell van-hairline"
                v-show="can_areas.length"
                style="line-height:auto;"
              >
                <van-checkbox-group v-model="form.areas" class="areass">
                  <div @click="select_all" id="select_all" style="width:75px">
                    <van-checkbox  @click="select_all">全选</van-checkbox>
                  </div>
                  <van-checkbox
                    v-for="item in can_areas"
                    :key="item"
                    :name="item"
                    class="font"
                  >{{item}}
                  </van-checkbox>
                </van-checkbox-group>
              </div>
              <div>
                <van-field v-model="form.shop.name" label="所属商家：" disabled></van-field>
                <!--<p class="prompt" style="margin:0 15px; padding: 5px 0 10px;">-->
                <!--* 个体用户请选择-->
                <!--<b>蜂鸟窝平台</b>！-->
                <!--</p>-->
              </div>
            </van-cell-group>
          </div>
          <van-popup v-model="addsShow1" position="bottom" :close-on-click-overlay="false">
            <van-area
              :area-list="addselect1"
              @cancel="onCancel(2)"
              @confirm="onConfirm"
              :columns-num="2"
              title="服务地区"
            ></van-area>
          </van-popup>
        </div>
        <div class="box box2">
          <div class="stit m-10">图片信息</div>
          <div class="box-c m-10">
            <my-upload
              :img="form.upImgs.IDcard_1?form.upImgs.IDcard_1:''"
              :pic-up="picUp"
              ind="IDcard_1"
              txt="身份证正面"
              @childget="getImg"
            ></my-upload>
            <my-upload
              :img="form.upImgs.IDcard_2?form.upImgs.IDcard_2:''"
              :pic-up="picUp"
              ind="IDcard_2"
              txt="身份证反面"
              @childget="getImg"
            ></my-upload>
            <my-upload
              :img="form.upImgs.IDcard_3?form.upImgs.IDcard_3:''"
              :pic-up="picUp"
              ind="IDcard_3"
              txt="手持身份证照"
              @childget="getImg"
            ></my-upload>
            <p class="prompt">* 请上传完整身份证照片！</p>
          </div>
        </div>
        <div class="p-10" style="margin: 20px 0;text-align:center;">
          <van-button class="btn-primary" size="large" @click="register()" style="width: 80%;">下一步</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
  import baseURL from "../../constants/index.js";

  export default {
    name: "Register",
    data() {
      return {
        canSave: true,
        gainNub: 60,
        clear: false,
        globalToast: null, //加载弹窗
        isGet: true, //是否获取验证码
        addsShow1: false, //服务地区显示
        serviceShow: false, //所属服务显示
        add: "",
        picUp: {
          //图片上传的属性
          url: baseURL + "/api/upload_qiniu",
          name: "photo"
        },
        key: "",
        gain: '获取验证码',
        nickName: "", //微信昵称
        form: {
          user: "", //真实姓名
          phone: "",
          verification: "", //验证码
          IDcard: "", //身份证
          areas: [], //服务区域
          shop: {
            id: "", //所属服务商的id
            name: "" //所属服务商的名字
          },
          upImgs: {}, //上传成功后的图片地址
          newAreas: [], //服务城市和服务区域的拼接
          sex: "",
          city: "",
          country: "",
          openid: "",
          avatar: "",
          is_subscribe: "",
          province: "",
          service_provider_id: "",
          is_subscribe: "",
          imgdata: [],
          listcode: [] //服务地址确认
        },
        //服务地区
        addselect1: {},
        //可服务的地区
        can_areas: [],
        //是否是修改
        isEdit: false
      };
    },
    created() {
      let regdata = JSON.parse(localStorage.getItem("temp"));
      this.nickName = regdata.nickname;
      this.addselect1 = regdata.can_areas; //四川省-成都市-区
      this.can_areas = regdata.can_areas.county_list; //区
      this.form.shop.name = regdata.service_provider;
      // 获取居住和服务地址
      if (this.$route.query.data) {
        let data = JSON.parse(this.$route.query.data);
        this.form.user = data.name;
        this.form.phone = data.phone;
      }
    },
    methods: {
      select_all(e){
        this.area_select_all=!this.area_select_all
        if(this.area_select_all){
         document.getElementById('select_all').childNodes[0].classList.add('van-checkbox__icon--checked')
          this.form.areas = this.can_areas
        }
        else{
          document.getElementById('select_all').childNodes[0].classList.remove('van-checkbox__icon--checked')

          this.form.areas=[]
        }
      },
      //从组件获取img数据
      getImg(i, url) {
        this.form.upImgs[i] = url;
        this.form.imgdata.push(url);
        localStorage.setItem('img', this.form.imgdata)
      },
      // //服务地址确认
      onConfirm(value) {
        var add = "";
        this.form.listcode = [];
        for (var i = 0; i < value.length; i++) {
          this.form.listcode.push(value[i].name);
          if (value[i].code == -1) {
            this.$toast("地址选择错误!");
            return false;
          } else {
            add += value[i].name + "";
          }
        }
        var reg = value[1].code.substr(0, 4);
        this.can_areas = []; //清除可以选的区域
        this.form.areas = []; //清除选中的区域

        for (var _i in this.addselect1.county_list) {
          if (_i.substr(0, 4) === reg) {
            this.can_areas.push(this.addselect1.county_list[_i]);
          }
        }
        this.form.adds1 = add;
        this.addsShow1 = false;

      },
      //取消
      onCancel: function onCancel(num) {
        if (num == 1) {
          this.addsShow = false;
        } else if (num == 2) {
          this.addsShow1 = false;
        } else if (num == 3) {
          this.serviceShow = false;
        }
      },
      verifiBtn() {
        var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!regPhone.test(this.form.phone)) {
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
          this.$http.post(BASE_URL + '/api/send_message', {
            phone: this.form.phone
          }).then(res => {
            console.log(res)
            if (res.data.code == -10000) {
              this.$toast.fail(res.data.message);
            }
            if (res.data.code == 10000) {
              this.$toast.fail(res.data.message);
            }
          }).catch(err => {
            console.log(err)
          })
          this.canSave = false;
        }
      },
      // 注册表单提交
      register() {
        var _this6 = this;
        // 姓名
        var regName = /^[\u4e00-\u9fa5]{2,4}$/;
        var regN2 = /某某|女士|先生|师傅|师父|小姐/;
        if (!regName.test(this.form.user)) {
          this.$toast.fail("请输入真实中文姓名！");
          return false;
        } else if (regN2.test(this.form.user)) {
          this.$toast.fail("请输入正确的真实姓名！");
          return false;
        }
        //身份证验证
        var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!regIdCard.test(this.form.IDcard)) {
          this.$toast.fail("请输入正确的身份证号码！");
          return false;
        } else {
          if (!this.form.IDcard) {
            this.$toast.fail("请输入正确的身份证号码！");
            return false;
          }
        }
        var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!regPhone.test(this.form.phone)) {
          this.$toast.fail("请填写正确的手机号码!");
          return false;
        } else if (!this.form.verification) {
          this.$toast.fail('请填写正确的验证码!');
          return false;
        }

        //服务地区
        if (!this.form.adds1) {
          this.$toast.fail("请选择您的服务城市！");
          return false;
        }
        //检验并拼接服务区域
        if (this.can_areas.length == 0 && this.form.adds1 != "") {
          this.form.newAreas = this.form.adds1;
        } else {
          if (!this.form.areas.length) {
            this.$toast.fail("请选择您的服务具体区域！");
            return false;
          }
          this.form.areas.forEach(function (e, i) {
            _this6.form.newAreas.push(_this6.form.adds1 + e);
          });
        }

        // 照片上传
        if (!this.form.upImgs["IDcard_1"]) {
          this.$toast.fail("请上传身份证正面照片！");
          return false;
        }
        if (!this.form.upImgs["IDcard_2"]) {
          this.$toast.fail("请上传身份证反面照片！");
          return false;
        }
        if (!this.form.upImgs["IDcard_3"]) {
          this.$toast.fail("请上传手持身份证照片！");
          return false;
        }
        //验证码
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "加载中..."
        });
        this.$http.post(BASE_URL + '/api/verification_code', {
          phone: this.form.phone
        }).then(res => {
          console.log(res)
          this.globalToast.clear();
          if (res.data.code === 10000) {
            if (this.form.verification != res.data.message) {
              this.$dialog
                .alert({
                  message: '验证码输入错误'
                })
              return false;
            }
            //验证通过，提交数据
            for (var i = 0; i < this.form.areas.length; i++) {
              this.form.listcode.push(this.form.areas[i]);
            }
            var userinfo = {
              name: this.form.user,
              id_card: this.form.IDcard,
              phone: this.form.phone,
              img_data: this.form.imgdata,
              districts: this.form.listcode
            };
            let userinfo2 = JSON.stringify(userinfo);
            localStorage.setItem("user", userinfo2);
            this.$router.push({
              path: "/RegisterServices",
            });
          } else if (res.data.code == -10000) {
            this.$dialog
              .alert({
                message: res.data.message
              })
            return false;
          }
        }).catch(err => {
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        });

      },
    }
  };
</script>
<style scoped>
  .van-toast--default {
    width: 230px !important;
  }

  .step1 {
    background: #fff;
  }

  .banner {
    margin: 0;
  }

  .adds {
    text-align: left;
  }

  .areass .van-checkbox {
    min-width: 30.33%;
    margin-right: 1%;
    font-size: 0;
  }

  .areass .van-checkbox span {
    font-size: 12px;
  }

  .areass .van-checkbox .van-checkbox__icon {
    width: 16px;
    height: 16px;
    line-height: 15px;
  }

  .areass .van-checkbox .van-checkbox__icon::before {
    font-size: 10px;
  }

  .van-checkbox__icon {
    width: 18px;
    height: 18px;
    line-height: 18px;
  }

  .areass .van-checkbox {
    font-size: 14px !important;
    text-align: left;
    margin-right: 0px;
  }

  body .van-checkbox__icon--round .van-icon {
    margin-right: 5px !important;
  }

  .van-cell:not(:last-child)::after {
    border-bottom: none;
  }

</style>
