<template>
  <div class="Hxver_header " id="hxfill1">
    <!-- 核销信息确认无配件 -->
    <!--<div class="Hxver_header">-->
    <!--<h2>&ensp;配件类别</h2>-->
    <!--<div class="xhfill">-->
    <!--<p>请选择配件类别</p>-->
    <!--<ul class="ul-list">-->
    <!--<li v-for="(item,index) in list" :key="index" @click="listfo(index,$event)" :class="{'active':active}">{{item.name}}</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="hxinput">-->
    <!--<span style="font-weight:600">配件金额：&ensp;</span>-->
    <!--<input type="text" placeholder="请填写具体配件金额" v-model="money">-->
    <!--<span class="hxspan">元</span>-->
    <!--</div>-->
    <div class="xhfill_center" id="div" v-for="(item,index) in arr">
      <div>
        <div style="display: flex;justify-content: space-between;align-items: center;">
          <h3>&ensp;配件明细 ({{index+1}})</h3>
          <span style="padding-right: 10px;color:#499ef0;" @click="del(index)" v-show="delShow">删除</span>
        </div>
        <div class="hxinput hxborderBottom" style="justify-content: left;">
          <span>配件名称：&ensp;</span>
          <input type="text" placeholder="请填写具体配件名称" :class="{activeColor:arr[index].activeColor}"
                 v-model="arr[index].name" @focus="changeIndex(index)">
        </div>
        <div style="width: 100%;background: #f5f5f5;" v-show="index == i && showList">
          <div style="width: 95%;background: #fff;margin: 0 auto;font-size: 12px;" class="marginP">
            <p id="margin" v-for="(item,j) in nameList" style="padding: 10px 10px; border-bottom: 1px solid #eee;" @click="changeName(item.name,index,j)" >
              {{item.name}}</p>
          </div>
        </div>
        <div class="hxfill_img">
          <h4 class="hxborderBottom" style="line-height: 22px;padding: 10px 0;">&ensp;请添加配件图片</h4>
          <div class="hxborderBottom" @click="beforeUpload(index)" >
            <div class="m-10" style="margin-top: 12px;">
              <my-upload :img='imgs.service_pic_1?imgs.service_pic_1:""' :pic-up="picUp" ind='service_pic_1' txt='添加配件照片' @childget='getImg'></my-upload>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  style="text-align: center;color:#499ef0;padding: 10px 0;" @click="addDetail">
      <i class="el-icon-plus"></i>
      <span>增加配件明细</span>
    </div>
    <div class="Hxver_header">
      <!--<h2>&ensp;服务总金额</h2>-->
      <!--<div class="hxinput" style="display:flex;justify-content:space-between;">-->
      <!--<span style="font-weight:600">配件金额：&ensp;</span>-->
      <!--<div class="hxfillinp">-->
      <!--<input type="text" placeholder="0" style="text-align:right;color:#499ef0;" v-model="tatal">-->
      <!--<span class="hxspan">&ensp;元</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="hxinput">-->
      <!--<span style="font-weight:600">其他费用：&ensp;</span>-->
      <!--<input type="text" placeholder="请填写其他费用金额" v-model="rest">-->
      <!--<span class="hxspan">元</span>-->
      <!--</div>-->
      <!--服务总金额-->
      <div class="hxinput">
        <span style="position: relative;left:144px;">服务总金额：</span>
        <span class="hxspan">{{price}}.00&ensp;元</span>
      </div>
    </div>
    <!--确认核销-->
    <div style="text-align:center">
      <van-button size="large" style="border:0  !important;margin-bottom: 30px;" type="primary" @click="hxfillbtn"
                  :disabled="disabled">确认核销
      </van-button>
    </div>
    <!--底部我是有底线的-->
    <!--<div-->
      <!--style="border-bottom: 1px solid #c8c8c8;width: 70%;position: absolute;bottom: 10px;left:15%;text-align: center;">-->
      <!--<span-->
        <!--style="position:relative; top: 7px; background: #f5f5f5;z-index: 99; padding: 0px 15px;color: #c8c8c8;font-size: 12px;">我是有底线的</span>-->
    <!--</div>-->
  </div>
</template>

<script>
  import BASE_URL from "../../constants";

  export default {
    name: "Hxfill",
    data() {
      return {
        i: 0,
        delShow: false,
        arr: [
          {name: '', activeColor: true, img_path: ''}
        ],
        picUp: {
          //图片上传的属性
          url: BASE_URL + "/api/upload_qiniu",
          name: "photo"
        },
        imgs: [], //提交的资质照片
        price: 0,
        showList: true,
        money: '',//具体配件金额
        tatal: '',//配件金额
        rest: '',//其他费用
        radio: '1',
        active: false,
        disabled: true,
        list: [
          {name: '电视'},
          {name: '冰箱'},
          {name: '洗衣机'},
          {name: '燃气灶'},
          {name: '热水器'},
          {name: '管道疏通'},
          {name: '家庭开锁'}
        ],
        dialogImageUrl: '',
        dialogVisible: false,
        nameList: [],
        partsList: [],
        lat:'',
        lng:''
      }
    },
    created() {
      this.globalToast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        mask: true, //背景层
        forbidClick: true, // 禁用背景点击
        message: "加载中..."
      });
      this.$http.post(BASE_URL + "/api/get_part_detail", {
        card_id: this.$route.query.card_id
      }).then(res => {
        this.partsList = res.data;
        this.globalToast.clear();
      }).catch(error => {
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
      this.$http.get(BASE_URL+'/wechat/get_admin_location_config').then(res => {
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
    watch: {
      arr: {
        handler(newArr, oldarr) {
          if (newArr.length == 1) {
            this.delShow = false;
          } else {
            this.delShow = true;
          }
          //配件
          this.nameList = []
          var isRight = false
          for (var i = 0; i < this.partsList.length; i++) {
            if (this.partsList[i].name.indexOf(newArr[this.i].name) != -1 && this.arr[this.i].name != '') {
              this.nameList.push(this.partsList[i]);
            }
            if (newArr[this.i].name == this.partsList[i].name) {
              isRight = true
              newArr[this.i].activeColor = false
            }
          }
          if (!isRight) {
            newArr[this.i].activeColor = true
          }
          //价格
          var priceList = [];
          for (var i = 0; i < newArr.length; i++) {
            priceList[i] = false;
            for (var j = 0; j < this.partsList.length; j++) {
              if (newArr[i].name == this.partsList[j].name) {
                priceList[i] = this.partsList[j].price;
              }
            }
          }
          var showPrice = true;
          var price = 0;
          for (var i = 0; i < priceList.length; i++) {
            if (priceList[i] == false) {
              showPrice = false
            } else {
              price += parseFloat(priceList[i])
            }
          }
          this.price = price;
          if (showPrice) {
            this.disabled = false
          } else {
            this.disabled = true
          }
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      getImg(i, url) {
          this.arr[this.i].img_path = 'http://testimg.funlifeday.com/ '+url;
          console.log(this.arr)
      },
      //删除
      del(index) {
        this.arr.splice(index, 1,)
        this.i = 0;
        console.log(this.arr)
      },
      //focus事件
      changeIndex(index) {
        this.i = index;
        this.nameList = [];
        for (var i = 0; i < this.partsList.length; i++) {
          if (this.partsList[i].name.indexOf(this.arr[this.i].name) != -1 && this.arr[this.i].name != '') {
            this.nameList.push(this.partsList[i]);
            this.activeColor = false;
            if (this.nameList.length == 0) {
              this.activeColor = true
            } else {
              this.activeColor = false
            }
          }
        }
        this.showList = true
      },
      //p标签选择事件
      changeName(name, index, j) {
        //console.log(name)
        this.arr[index].name = name;
        this.showList = false;
      },
      addDetail() {
        var json = {name: '', activeColor: true, img_path: ''}
        this.arr.push(json)
      },
      beforeUpload(index) {
        this.i = index;
      },
      listfo(index, e) {
        if (!e.target.className) {
          e.target.className = "active"; //切换按钮样式
        } else {
          e.target.className = ""; //切换按钮样式
        }
      },
      //确认核销
      hxfillbtn() {
        this.disabled = false;
        // 照片上传
        if ( this.arr[this.i].img_path == '') {
          this.$toast.fail("请上传配件照片！");
          return false;
        }
        //开定位提示
        wx.ready(() =>{
          wx.getLocation({
            success: (res) =>{
              this.lat = res.latitude;
              this.lng = res.longitude;
              this.globalToast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                mask: true, //背景层
                forbidClick: true, // 禁用背景点击
                message: "加载中..."
              });
              this.$http.post(BASE_URL + "/api/verify_card_with_parts", {
                parts: this.arr,
                total_price: this.price,
                service_type: this.$route.query.service_type,
                end_at: this.$route.query.service_end_at,
                card_id: this.$route.query.card_id,
                worker_id: localStorage.getItem('workId'),
                lat : this.lat,
                lng : this.lng
              }).then(res => {
                if (res.data.code == 10000) {
                  this.globalToast.clear();
                  this.$dialog
                    .alert({
                      message: res.data.message
                    }).then(res => {
                    this.$router.push({
                      path: '/Menu/Person'
                    })
                  }).catch(err => {
                    console.log(err)
                  })
                }else{
                  this.globalToast.clear();
                  this.$dialog
                    .alert({
                      message: "系统繁忙，请稍后再试!"
                    })
                }
              }).catch(err => {
                this.globalToast.clear();
                this.disabled = true;
                this.$dialog
                  .alert({
                    message: "系统繁忙，请稍后再试!"
                  })
              })
            },
            cancel:(res) => {
              this.$dialog.alert({
                title: '温馨提示',
                message: '接单须先授权获取地理位置！'
              }).then(function () {
               this.hxfillbtn()
              });
            }
          });
        });
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .marginP p:first-child{margin-top: 6px;margin-bottom: 6px;}
  .marginP p:last-child{margin-top: 6px;margin-bottom: 6px;}
  .Hxver_header {
    text-align: left;
  }

  .Hxver_header h2 {
    font-size: 18px;
    margin: 15px 10px;
    border-left: 2px solid #499ef0;
    font-family: PingFangSC-Regular;
  }

  .Hxver_header .activeColor {
    color: #df0000 !important;
  }
  .Hxver_header .van-button--large {
    width: 80%;
    border-radius: 10px;
    height: 40px;
    background: #499ef0;
    color: #fff;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    margin-top: 50px;
  }

  .xhfill {
    background: #fff;
    padding: 0 10px;
  }

  .xhfill .ul-list li {
    width: 19.33%;
  }

  .xhfill > p {
    font-size: 13px;
    padding-top: 10px;
    padding-bottom: 5px;
  }

  .xhfill_center h3 {
    font-size: 16px;
    margin: 15px 0;
  }

  #hxfill1 .hxinput {
    font-size: 14px;
    padding: 10px 10px;
    background: #fff;
    line-height: 22px;
  }

  #hxfill1 {
    height: 100%;
  }

  .hxinput input {
    vertical-align: top;
    font-size: 14px;
  }

  .hxspan {
    float: right;
  }

  .hxborderBottom {
    border-bottom: 1px solid #c7c7c7;
  }

  .hxfillinp input::-webkit-input-placeholder { /* placeholder颜色  */
    color: #499ef0;
  }

  .Hxver_header input::-webkit-input-placeholder { /* placeholder颜色  */
    color: #c8c8c8;
  }

  .hxfill_img {
    background: #fff;
  }

  .hxfill_img .el-upload {
    margin: 15px 0;
  }

  .el-upload .el-upload--picture-card {
    width: 35px;
    height: 35px;
  }

  .Hxver_header .el-upload--picture-card {
    width: 35px;
    height: 35px;
    border: 0;
    background: #c7c7c7;
    line-height: 35px;
    margin-left: 10px !important;
  }

  .el-upload--picture-card .el-icon-plus {
    font-size: 14px !important;
    color: #333 !important;
  }

  .Hxver_header .active {
    background: #489ef0 !important;
    color: #fff !important;
  }
  .el-upload-list--picture-card .el-upload-list__item{
    width: 100px !important;
  height: 100px !important;
    margin-top: 15px !important;}
</style>

