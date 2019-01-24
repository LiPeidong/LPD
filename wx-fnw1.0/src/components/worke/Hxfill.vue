<template>
  <div class="Hxver_header " id="hxfill1">
    <!-- 核销信息确认无配件 -->
    <div class="Hxver_header">
        <h2>&ensp;配件类别</h2>
        <div class="xhfill">
          <p>请选择配件类别</p>
          <ul class="ul-list">
            <li v-for="(item,index) in list" :key="index" @click="listfo(index,$event)" :class="{'active':active}">{{item.name}}</li>
          </ul>
        </div>
    </div>
    <div class="xhfill_center">
      <h3>&ensp;配件明细(1)</h3>
      <div class="hxinput">
          <span style="font-weight:600">配件名称：&ensp;</span>
              <input type="text" placeholder="请填写具体配件名称" v-model="name">
       </div>
      <div class="hxinput">
            <span style="font-weight:600">配件金额：&ensp;</span>
            <input type="text" placeholder="请填写具体配件金额" v-model="money">
            <span class="hxspan">元</span>
      </div>
      <div class="hxfill_img">
        <h4>&ensp;请添加配件图片</h4>
        <div>
          <!-- 上传的地址  文件列表的类型 已上传文件时的钩子  文件列表移除文件时的钩子 -->
          <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                 <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
        </div>
         <div class="hxinput" style="text-align: center;color:#499ef0;">
           <i class="el-icon-plus"></i>
            <span>增加配件明细</span>
          </div>
      </div>
    </div>
    <div class="Hxver_header">
        <h2>&ensp;服务总金额</h2>
        <div class="hxinput" style="display:flex;justify-content:space-between;">
            <span style="font-weight:600">配件金额：&ensp;</span>
            <div class="hxfillinp">
              <input type="text" placeholder="0" style="text-align:right;color:#499ef0;" v-model="tatal">
              <span class="hxspan">&ensp;元</span>
            </div>
      </div>
      <div class="hxinput">
            <span style="font-weight:600">其他费用：&ensp;</span>
            <input type="text" placeholder="请填写其他费用金额" v-model="rest">
            <span class="hxspan">元</span>
      </div>
       <div class="hxinput" style="margin-top:9px">
            <span style="font-weight:600;position: relative;left:115px;">服务总金额：</span>
            <span class="hxspan">元</span>
      </div>
    </div>
    <div style="text-align:center">
       <van-button size="large" style="border:0  !important; !important; font-weight:600"  type="primary" @click="hxfillbtn">下一步</van-button>
       <!-- <van-button size="large">确认核销</van-button> -->
    </div>
    <p class="hxborder"><span>我是有底线的</span></p>
  </div>
</template>

<script>
export default {
  name: "Hxfill",
  data() {
    return {
      name:'',//具体配件名称
      money:'',//具体配件金额
      tatal:'',//配件金额
      rest:'',//其他费用
      active:false,
      radio: '1',
      list:[
       { name:'电视'},
       { name:'冰箱'},
       { name:'洗衣机'},
       { name:'燃气灶'},
       { name:'热水器'},
       { name:'管道疏通'},
       { name:'家庭开锁'}
      ],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },

  methods: {
      listfo(index,e){
       if (!e.target.className) {
          e.target.className = "active"; //切换按钮样式
          //写逻辑
          // this.dataid.push(this.list_info[index].id)
          // this.prevdata.basic_products = this.dataid
          // console.log(this.dataid)
        } else {
          e.target.className = ""; //切换按钮样式
          // this.dataid.splice(this.dataid.indexOf(this.list_info[index].id),1)
          // this.prevdata.basic_products = this.dataid
          //写逻辑
        }
      },
      handleRemove(file, fileList) {

        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(this.dialogImageUrl)
        this.dialogVisible = true;
        console.log( this.dialogVisible)

      },
      hxfillbtn(){

    console.log(this.name)

      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Hxver_header{text-align: left;}
.Hxver_header h2{font-size: 18px;font-weight: 600;margin: 15px 10px;border-left: 2px solid #499ef0;font-family: PingFangSC-Regular;}
.Hxver_header .van-button--large{width: 300px;border-radius: 10px;height: 40px;background: #499ef0;color: #fff;line-height: 40px;font-size: 18px;text-align: center;margin-top: 50px;}
.xhfill{background:#fff;padding: 0 10px;}
.xhfill .ul-list li{width: 19.33%;}
.xhfill>p{font-size: 13px;padding-top: 10px ;padding-bottom: 5px;}
.xhfill_center h3{font-size: 10px;margin: 15px 0;}
#hxfill1 .hxinput{font-size:14px;padding: 10px 10px;background: #fff;margin-top: 1px;line-height: 22px;}
.hxinput input{vertical-align: top;font-size: 14px;}
.hxspan{float: right;}
.hxfillinp input::-webkit-input-placeholder { /* placeholder颜色  */ color: #499ef0;  }
.Hxver_header input::-webkit-input-placeholder { /* placeholder颜色  */ color: #c8c8c8;  }
.hxfill_img h4{margin-top: 16px;}
.hxfill_img .el-upload{margin:15px 0;}
.el-upload .el-upload--picture-card{width: 35px;height: 35px;}
.hxborder{border-bottom: 1px solid #c8c8c8;margin:0 59px;position: relative;bottom: -40px;}
.hxborder span{position: relative;top: 6px; left: 70px; background: #f5f5f5;padding: 0 10px;	color: #c8c8c8;}
.Hxver_header .el-upload--picture-card{width: 50px;height: 50px;border: 0;background: #c7c7c7;line-height: 50px;margin-left: 10px  !important;}
 .el-upload--picture-card .el-icon-plus{font-size:14px !important;color: #333  !important;}
 .Hxver_header .active {
  background: #489ef0 !important;
  color: #fff !important;
}
</style>
