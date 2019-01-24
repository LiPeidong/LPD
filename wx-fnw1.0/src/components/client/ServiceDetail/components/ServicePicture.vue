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
  name:"ServicePicture",
  data () {
    return {
      picUp: {
        //图片上传的属性
        url: baseURL + "/api/upload_qiniu",
        name: "photo"
      },
      form: {
        user: "", //真实姓名
        phone: "",
        yzm: "", //验证码
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
    }
  },
  methods : {
    getImg(i, url) {
      this.form.upImgs[i] = url;
      //this.form.upImgs = url
      this.form.imgdata.push(url);
      localStorage.setItem('img',this.form.imgdata)
      this.$emit('picsubmit','777777777')
    }
  }
}
</script>
<style scoped>
.all{
  text-align: left
}
.titleName{
  margin:22px 0 22px 15px;
  padding-left:15px;
  border-left:3px solid #5f9dea
}
.titleName p{
  font-size: 15px
}
</style>
