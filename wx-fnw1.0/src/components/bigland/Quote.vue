<template>
  <div class="Hxver">
    <!-- 获取报价 -->
    <div class="Hxver_header1">
      <h2 class="active_border">&ensp;房屋信息</h2>
    </div>
    <div>
      <van-cell-group>
        <van-field v-model="listcode" clearable label="房屋区域：" placeholder="请选择已有的房屋区域" @click="handler"
                   icon="arrow-down"
                   readonly
                   type="textarea"
                   rows="1"
                   autosize
        />
      </van-cell-group>
      <div
        v-show="county_show"
        class="adds van-cell van-hairline"
        style="line-height:auto;"
      >
        <van-checkbox-group v-model="list" class="areass">
          <van-checkbox
            v-for="(item, index) in county_list"
            :key="index"
            :name="item"
          >
            {{ item.county }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <van-popup v-model="show" position="bottom" :overlay="false" >
        <van-area :area-list="areaList" @confirm="onConfirm" @cancel="handler2" :columns-num="2"/>
      </van-popup>
    </div>
    <div class="hxinput">
      <div>
        <span style="line-height:24px;">房屋年限：&ensp;</span>
        <input type="text" readonly="readonly" placeholder="请填写房屋年限" @click="houseyear_select = !houseyear_select" v-model="term">
      </div>
      <span class="hxspan" style="line-height:24px;">年</span>
    </div>
    <div class="houseyear_select" v-show = houseyear_select>
      <p @click="term = '0~5';houseyear_select=!houseyear_select">0~5</p>
      <p @click="term = '5~10';houseyear_select=!houseyear_select">5~10</p>
      <p @click="term = '>10';houseyear_select=!houseyear_select">>10</p>
    </div>
    <div class="hxinput">
      <div>
        <span style="line-height:24px;">家电年限：&ensp;</span>
        <input type="text" readonly="readonly" placeholder="请填写房屋内的家电年限" @click="electrical_select = !electrical_select" v-model="electricityTerm">
      </div>
      <span class="hxspan" style="line-height:24px;">年</span>
    </div>
    <div class="houseyear_select" v-show = electrical_select>
      <p @click="electricityTerm = '1~3';electrical_select=!electrical_select">1~3</p>
      <p @click="electricityTerm = '3~5';electrical_select=!electrical_select">3~5</p>
      <p @click="electricityTerm = '>5';electrical_select=!electrical_select">>5</p>
    </div>
    <div class="hxinput">
      <div>
        <span style="line-height:24px;">房屋数量：&ensp;</span>
        <input type="Number" placeholder="请填写房屋数量" v-model="homeNumber">
      </div>
      <span class="hxspan" style="line-height:24px;">套</span>
    </div>
    <div class="hxinput">
      <div>
        <span style="line-height:24px;">联系人：&ensp;&emsp; </span>
        <input type="text" placeholder="请填写联系人姓名" v-model="bigName">
      </div>
    </div>
    <div class="hxinput">
      <div>
        <span style="line-height:24px;">联系电话：&ensp;</span>
        <input type="Number" placeholder="请填写联系电话" v-model="bigPhone">
      </div>
    </div>
    <van-button size="large" @click="btnMoney">提交信息获取报价</van-button>
  </div>
</template>

<script>
  import BASE_URL from "../../constants";

  export default {
    name: "Qoute",
    data() {
      return {
        show: false,
        show_area: false,
        isActive:false,
        region: '',
        current: ' ',
        areaList:{},
        listcode: '',//服务地址确认
        province:'', //省
        city:'', //市
        area:'', //区
        bigName: '',
        bigPhone: '',
        term: '', //房屋年限
        electricityTerm: '',//家电年限
        homeNumber: '', // 房屋数量
        county:Object,
        county_list:[],
        show_county:false,
        county_result:[],
        houseyear_select:false,
        electrical_select:false,
        county_show:false,
        list:[],
        listArea:[]
      };
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.post(BASE_URL + '/api/get_address_list').then(res => {
        this.globalToast.clear()
        this.areaList = res.data
      }).catch(err => {
        this.globalToast.clear();
        this.$dialog
          .alert({
            message: "系统繁忙，请稍后再试!"
          })
      })
    },
    methods: {
      handler() {
        this.show = !this.show;
      },
      onConfirm(value) {
        console.log(value)
        this.listcode = [];
        this.province = value[0].code;
        this.city = value[1].code;
        for (let i = 0; i < value.length; i++) {
          this.listcode.push(value[i].name);
          this.show = false
        }
        this.listcode = this.listcode.join(' ')
        //提取出对应的县、区
        var obj = JSON.stringify(this.areaList)
        var deep_obj = JSON.parse(obj)
        delete deep_obj.city_list
        delete deep_obj.province_list
        var province_city = this.city.substring(0,4)
        var reg = new RegExp("^"+province_city)
        for(var i in deep_obj.county_list){
          if(!reg.test(i)){
            delete deep_obj.county_list[i]
          }
        }
        this.county = deep_obj
        console.log(deep_obj)
        var arr = []
        for (var i in deep_obj.county_list) {
          console.log(i)
          let item = new Object
          item = {
            'code':i,
            'county':deep_obj.county_list[i]
          }
          arr.push(item);
        }
        this.county_list = arr
        this.county_show = true
      },
      handler2() {
        this.show = false
      },
      btnMoney(){
        for (let i = 0; i < this.list.length; i++){
          this.listArea.push(this.list[i].code)
        }
        var regName = /^[\u4e00-\u9fa5]{2,4}$/;
        var regN2 = /某某|女士|先生|师傅|师父|小姐/;
        if (!regName.test(this.bigName)) {
          this.$toast.fail("请输入真实中文姓名！");
          return false;
        } else if (regN2.test(this.bigName)) {
          this.$toast.fail("请输入正确的真实姓名！");
          return false;
        }
        var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!regPhone.test(this.bigPhone)) {
          this.$toast.fail("请填写正确的手机号码!");
          return false;
        }

        this.globalToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          mask: true, //背景层
          forbidClick: true, // 禁用背景点击
          message: "加载中..."
        });
        this.$http.post(BASE_URL+'/api/store_quote_info',{
          uid : localStorage.getItem('big_land_id'),
          name : this.bigName,
          phone : this.bigPhone,
          province : this.province,
          city : this.city,
          area : this.listArea,
          house_life : this.term,
          appliance_life : this.electricityTerm,
          product_id: this.$route.query.id,
          house_num : this.homeNumber
        }).then(res => {
          this.globalToast.clear();
          if (res.data.code == 10000){
            this.$dialog
              .alert({
                message:res.data.message
              }).then(res => {
              this.$router.push({
                path:'/Btnsucceed'
              })
            })
          }
          console.log(res)
        }).catch(err => {
          this.globalToast.clear();
          this.$dialog
            .alert({
              message: "系统繁忙，请稍后再试!"
            })
        })
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .van-hairline--top-bottom::after{border-bottom: 1px solid #c7c7c7;}
  .active {
    color: #499ef0 !important;
  }
  .van-cell{padding-left: 10px !important;text-align: left;line-height: 20px;}
  .Hxver {
    color: #333 !important;
    background: #fff;
  }

  .Hxver_header1 {
    text-align: left;
    background: #f5f5f5;
    padding: 10px;
  }

  .Hxver_header1 h2 {
    font-size: 15px;
    font-weight: bold;
    font-family: PingFangSC-Regular;
  }

  .active_border {
    border-left: 3px solid #499ef0;
  }

  .van-button--large {
    width: 300px;
    border-radius: 10px;
    height: 40px;
    background: #499ef0;
    color: #fff;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    margin-top: 35px;
    margin-bottom: 62px;
  }

  .hxinput {
    font-size: 14px;
    padding: 10px 10px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #c7c7c7;
  }

  .hxinput>div{
    width: 100%;text-align: left;}
  .hxinput input {
    font-size: 12px;
    width: 50%;
    line-height: 24px;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #c7c7c7;
    /* placeholder字体大小  */
    font-size: 14px;
  }
  .houseyear_select p{
    height: 30px;
    line-height: 30px;
    color:#d7d7d7
  }
  .houseyear_select{
    border-bottom: 1px solid #d7d7d7;
  }
  .areass .van-checkbox {
    min-width: 30.33%;
    margin-right: 1%;
    font-size: 0;
  }
  .adds {
    text-align: left;
    border-top: 1px solid #c7c7c7;
    border-bottom: 1px solid #c7c7c7;
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
    line-height: 26px;
  }

  body .van-checkbox__icon--round .van-icon {
    margin-right: 5px !important;
  }

  .van-cell:not(:last-child)::after {
    border-bottom: none;
  }
</style>
