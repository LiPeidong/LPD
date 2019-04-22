<template>
  <div class="all">
    <div class="title">
      <div class="titleName">
        <p>服务现场照片</p>
      </div>
    </div>
    <div class="box-c m-10">
      <my-upload
        :img="form.upImgs.IDcard_1?form.upImgs.IDcard_1:''"
        :pic-up="picUp"
        ind="IDcard_1"
        txt="添加现场照片"
        @childget="getImg"
      ></my-upload>
      <p class="prompt">提示：请您上传维修师傅与维修家电、配件的合照，以保障后续服务。</p>
    </div>
  </div>
</template>
<script>
  import baseURL from "../../../../constants/index.js";

  export default {
    name: "ServicePicture",
    data() {
      return {
        picUp: {
          //图片上传的属性
          url: baseURL + "/api/upload_qiniu",
          name: "photo"
        },
        form: {
          upImgs: {}, //上传成功后的图片地址
        },
        img_path: '',
      }
    },
    methods: {

      getImg(i, url) {
        // 照片上传
        // if (!this.form.upImgs["IDcard_1"]) {
        //   this.$toast.fail("请上传现场照片！");
        //   return false;
        // }
        this.form.upImgs[i] = url;
        this.img_path = url;
        localStorage.setItem('sceaeImg',this.img_path)
      },
    }
  }
</script>
<style scoped>
  .all {
    text-align: left
  }

  .titleName {
    margin: 15px 0 15px 15px;
    padding-left: 15px;
    border-left: 3px solid #5f9dea
  }

  .titleName p {
    font-size: 15px
  }
</style>
