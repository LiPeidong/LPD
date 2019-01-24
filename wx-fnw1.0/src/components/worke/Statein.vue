<template>
  <div class="Submit_bg1">
    <!--提交申诉 -->
    	<div class="Submit_header">
            <p>申诉原因</p>
           <textarea name="" id=""  style="margin-bottom:30px;border: solid 1px #333333;width:334px ;height:111px; text-indent:10px;padding-top:4px;" placeholder="请填写申诉原因"></textarea>
            <p>申诉图片</p>
            <div style="padding-bottom:20px;" id="statein">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                >
                <i class="iconfont icon-add_pic"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" >
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
        </div>
        <van-button size="large" @click="stateinto">确认申诉</van-button>
  </div>

</template>

<script>
export default {
  name: "Statein",
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
      stateinto(){
        this.$router.push({
          name:'State'
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
};
</script>
<style >
.Submit_bg1 .Submit_header{background:#fff;text-align: left;padding-left:20px;padding-top: 15px;}
.Submit_bg1 .Submit_header p{font-size: 18px;font-weight:bold;margin-bottom: 15px;}
.Submit_bg1 .van-button--large{width: 80%;border-radius: 10px;}
.Submit_bg1 .van-button--default{background:#5f9dea;color: #fff;font-size: 18px;margin-top: 20px;}
.Submit_bg1 .el-upload--picture-card {border: 1px dashed  #333;width: 95px;height: 95px;line-height: 95px;background: #fff;}
.Submit_bg1 .icon-add_pic{color: #333 !important;}
</style>
