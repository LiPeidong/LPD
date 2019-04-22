<template>
  <div class="callIndex">
    <!--呼叫地址-->
    <van-cell-group>
      <van-field v-model="listcode" clearable label="所在地区：" placeholder="请选择房屋所在区域" @click="handler" icon="arrow-down"
                 readonly
                 type="textarea"
                 rows="1"
                 autosize/>
    </van-cell-group>
    <van-popup v-model="show" position="bottom" :overlay="false">
      <van-area :area-list="areaList" @confirm="onConfirm" @cancel="handler2"/>
    </van-popup>
    <van-cell-group>
      <van-field v-model="housing" clearable label="小区名称：" icon="arrow-down" placeholder="请填写正确的小区名称"/>
    </van-cell-group>
    <div class='Buy_addlist Buy_addl' style="display: flex;">
      <van-icon style="white-space: nowrap;">详细地址：</van-icon>
      <input type="number" v-model="ridgepole"  placeholder="例：12" pattern="[0-9]*" /><span style="padding-right: 20px;">{{dong}}</span>
      <input type="number" v-model="unit" placeholder="例：5" pattern="[0-9]*"/><span style="position: absolute;right: 10px;">{{danyuan}}</span>
    </div>
    <div class='Buy_addlist Buy_addl' style="display: flex;">
      <van-icon style="white-space: nowrap;">详细地址：</van-icon>
      <input type="number" v-model="tower" placeholder="例：3" pattern="[0-9]*"/><span style="padding-right: 20px;">{{lou}}</span>
      <input type="number" v-model="make" placeholder="例：8"  pattern="[0-9]*"/><span style="position: absolute;right: 10px;">{{hao}}</span>
    </div>
    <div style="padding: 10px;text-align: left;color: #499eef;letter-spacing: 2px;">
      <p>例：12栋5单元3楼8号</p>
    </div>
    <div style="text-align:center;">
      <van-button type="default" :disabled="isCheck" @click="btnCall">下一步</van-button>
    </div>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";
  import axios from "axios";

  export default {
    name: "CallIndex",
    data() {
      return {
        isCheck: false,
        ridgepole: '',
        unit: '',
        dong: '栋',
        danyuan: '单元',
        lou: '楼',
        hao: '号',
        tower: '',
        make: '',
        add: '',
        housing: '',
        show: false,
        areaList: {},
        listcode: '',//服务地址确认
        product_id: '',
        uid: '',
        address: '',
        open_id: '',
      }
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.get(BASE_URL + "/api/get_access_token").then(res => {
        res.data.expires_at = new Date().getTime() + (res.data.expires_in - 20) * 1000;
        localStorage.setItem("tokens", JSON.stringify(res.data));
        this.globalToast.clear();
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "加载中..."
        });
        this.open_id = this.$route.query.open_id;
        localStorage.setItem('call_open_id', this.open_id);
        var _this = this;
        axios.get(BASE_URL + '/api/get_address_list').then(function (res) {
          _this.globalToast.clear();
          _this.areaList = res.data
        }).catch(err => {
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        });
        this.isCheck = false;
        this.product_id = this.getUrlParam("product_id");
        this.uid = this.getUrlParam("uid");
      })
        .catch(err => {
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        });
    },
    methods: {
      //获取传递的数据
      getUrlParam: function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
      },
      handler() {
        this.show = !this.show;
      },
      onConfirm(value) {
        this.listcode = [];
        for (var i = 0; i < value.length; i++) {
          this.listcode.push(value[i].name);
          this.show = false
        }
        this.listcode = this.listcode.join(' ')
      },
      handler2() {
        this.show = false
      },

      btnCall() {
        this.isCheck = true;
        var str;
        var regex=/^[0]+/
        if (this.listcode != '') {
          str = this.listcode.replace(/\s+/g, "")
        }
        if (this.housing != '') {
          str += this.housing.replace(/\s+/g, "")
        }
        if (!this.ridgepole == '') {
          str += this.ridgepole.replace(regex,"")
          str += this.dong
        }
        if (!this.unit == '') {
          str += this.unit.replace(regex,"")
          str += this.danyuan
        }
        if (!this.tower == '') {
          str += this.tower.replace(regex,"")
          str += this.lou
        }
        if (!this.make == '') {
          str += this.make.replace(regex,"")
          str += this.hao
        }
        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "加载中..."
        });
        this.$http.post(BASE_URL + '/api/check_address', {
          address: str,
        })
          .then(res => {
            localStorage.setItem('order_ids',res.data.order_ids);
              this.isCheck = false;
              if (res.data.code == 10000) {
                console.log(res.data)
                this.$router.push({
                  name: 'CallService',
                })
              } else {
                this.$dialog.alert({
                  title: '温馨提示',
                  message: '未找到匹配的地址 <br />请确认地址是否填写正确'
                }).then(() => {
                  console.log(res.data.message)
                });
              }
              this.globalToast.clear();
            }
          ).catch(err => {
          this.isCheck = false;
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        })

      }
    }
  }
</script>

<style >

  .callIndex input::-webkit-input-placeholder{
    color:#c7c7c7 !important;}
  .callIndex {
    background: #fff;
    height: 100%;
  }

  .callIndex .van-cell {
    padding-left: 10px;
    text-align: left;
  }

  .callIndex  .van-field .van-cell__title {
    width: 76px;
  }

  .van-field__control {
    line-height: 25px;
  }

  .Buy_addlist {
    display: flex;
    padding: 12px 10px;
    border-bottom: 1px solid #d1d1d1;
  }

  .callIndex .Buy_addlist > input {
    width: 30%;
    border-left: 1px solid #c7c7c7;
    border-radius: 0;
  }

  .callIndex .Buy_addlist input:nth-child(5) {
    border-left: 0;
  }

  .callIndex .Buy_addl input:nth-child(2) {
    border: 0;
  }

  .callIndex .Buy_addl input {
    width: 30%;
    text-align: center;
  }

  .callIndex .Buy_addl span {
    line-height: 20px;
    color: #d1d1d1;
  }

  .callIndex .van-icon-undefined {
    width: 77px;
  }

  .callIndex  .van-button {
    width: 80%;
    border-radius: 10px;
    background: #499eef;
    color: #fff;
    font-size: 18px;
    height: 44px;
    margin-top: 46px;
  }

  .callIndex [class*=van-hairline]::after {
    border-bottom: 1px solid #d1d1d1;
  }

  .callIndex .van-dialog {
    height: 184px;
    border-radius: 10px;
    color: #333;
  }

  .callIndex .van-dialog__footer {
    text-align: center;
  }

  .callIndex .van-dialog__footer .van-button {
    margin-top: 0px;
    width: 256px;
    height: 33px;
    border-radius: 6px;
    line-height: 33px;
  }

  .callIndex .van-dialog__message--withtitle {
    text-align: center;
    color: #333;
    line-height: 22px;
  }

  .callIndex .van-dialog [class*=van-hairline]::after {
    top: -74px;
  }

  .callIndex .van-dialog__header {
    padding: 15px 0;
  }
</style>
