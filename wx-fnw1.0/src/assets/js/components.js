import Vue from 'vue'
import axios from 'axios'
import EXIF from './small-exif'
'use strict';
//图片上传
// capture="camera" 直接跳去相机
Vue.component('my-upload', {
    props: ['img', 'picUp', 'ind', 'txt', 'beforeFn'],
    template: '\n        <!--\u79FB\u52A8\u7AEF\u538B\u7F29\u4E0A\u4F20-->\n        <div class="pic-box"> \n            <input id="imgUpload" type="file" @change="addPic" accept="image/*" name="photo"/>\n            <img v-if="imgage" :src="imgage"/>\n            <div v-else>\n                <van-icon name="add-o"></van-icon>\n                <span>{{txt}}</span>\n            </div>\n        </div>\n\n        <!--pc\u7AEFelement\u63D2\u4EF6\u4E0A\u4F20-->\n        <!--\n        <el-upload\n            capture="camera"\n            accept="image/*"\n            class="pic-box"\n            :action="picInfo.url"\n            :name = "picInfo.name"\n            :show-file-list="false"\n            :on-success="handleAvatarSuccess"\n            :on-error="picUpErr"\n           :before-upload="beforeFn">\n                <img v-if="img" :src="img"/>\n                <div v-else>\n                    <van-icon name="add-o"></van-icon>\n                    <span>{{txt}}</span>\n                </div>\n        </el-upload>\n        -->\n        ',
    data: function data() {
        return {
            globalToast: null,
            myFile: null,
            imgage: this.img,  //默认图片
            picInfo: this.picUp, //上次的链接和格式
            index: this.ind,  //hash 的key
            text: this.txt,  //上传的文字:on-success="handleAvatarSuccess":before-upload="beforeAvatarUpload">
            Orientation: null, //用于图片的旋转

        }
    },
    methods: {

        /////////////////js原生的上传并压缩图片///////////////////////
        addPic: function addPic(e) {
            var _this = this;
            if (typeof FileReader === 'undefined') {
                return alert('你的浏览器不支持上传图片哟！');
            }
            var files = e.target.files || e.dataTransfer.files;
            if (this.myFile !== files[0] && files.length > 0) {
                this.myFile = files[0];
                EXIF.getData(_this.myFile, function () {
                    _this.Orientation = EXIF.getTag(this, 'Orientation');
                });
                this.imgResize(files[0]);
                this.globalToast = this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    mask: true, //背景层
                    forbidClick: true, // 禁用背景点击
                    message: '图片上传中...'
                });
            }
        },

        //压缩图片
        imgResize: function imgResize(file) {
            var fileReader = new FileReader();
            var _that = this;
            fileReader.onload = function () {
                var IMG = new Image();
                IMG.src = this.result;
                IMG.onload = function () {
                    var w = this.naturalWidth,
                        h = this.naturalHeight,
                        resizeW = 0,
                        resizeH = 0;
                    // maxSize 是压缩的设置，设置图片的最大宽度和最大高度，等比缩放，level是报错的质量，数值越小质量越低
                    var maxSize = {
                        width: 768,
                        height: 768,
                        level: 0.8
                    };
                    var multiple = Math.max(w / maxSize.width, h / maxSize.height);
                    resizeW = w / multiple;
                    resizeH = h / multiple;
                    var canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d');
                    if (_that.Orientation && _that.Orientation != 1) {
                        switch (_that.Orientation) {
                            case 6:
                                canvas.width = resizeH;
                                canvas.height = resizeW;
                                ctx.rotate(Math.PI / 2);
                                ctx.drawImage(IMG, 0, -resizeH, resizeW, resizeH);
                                break;
                            case 3:
                                ctx.rotate(Math.PI);
                                ctx.drawImage(IMG, -resizeW, -resizeH, resizeW, resizeH);
                                break;
                            case 8:
                                canvas.width = resizeH;
                                canvas.height = resizeW;
                                ctx.rotate(3 * Math.PI / 2);
                                ctx.drawImage(IMG, -resizeW, 0, resizeW, resizeH);
                                break;
                        }
                    } else {
                        canvas.width = resizeW;
                        canvas.height = resizeH;
                        ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
                        // if (window.navigator.userAgent.indexOf('iPhone') > 0) {
                        //     canvas.width = resizeH;
                        //     canvas.height = resizeW;
                        //     ctx.rotate(90 * Math.PI / 180);
                        //     ctx.drawImage(IMG, 0, -resizeH, resizeW, resizeH);
                        // } else {
                        //     canvas.width = resizeW;
                        //     canvas.height = resizeH;
                        //     ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
                        // }
                    }
                    var base64 = canvas.toDataURL('image/jpeg', maxSize.level);
                    _that.convertBlob(window.atob(base64.split(',')[1]));
                };
            };
            fileReader.readAsDataURL(file);
        },

        // 将base64的数据转换成一个Blob对象
        // 安卓手机不支持Blob构造方法
        convertBlob: function convertBlob(base64) {
            var buffer = new ArrayBuffer(base64.length);
            var ubuffer = new Uint8Array(buffer);
            for (var i = 0; i < base64.length; i++) {
                ubuffer[i] = base64.charCodeAt(i);
            }
            var blob;
            try {
                blob = new Blob([buffer], { type: 'image/jpg' });
            } catch (e) {
                window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                if (e.name === 'TypeError' && window.BlobBuilder) {
                    var blobBuilder = new BlobBuilder();
                    blobBuilder.append(buffer);
                    blob = blobBuilder.getBlob('image/jpg');
                }
            }
            this.callback(blob);
        },

        // 使用HTML5的FormData对象上传数据
        callback: function callback(fileResize) {

            var _this = this;
            var data = new FormData();
            data.append(this.picInfo.name, fileResize);
            var config = {
                headers: { 'Content-Types': 'multipart/form-data' }
            };
            //上传图片给后台
            axios.post(this.picInfo.url, data, config).then(res => {
                this.globalToast.clear();
                this.imgage = "http://testimg.funlifeday.com/" + res.data;
                // this.img = window.location.origin + res.data
                //子组件间数据返回父组件
                this.$emit("childget", this.ind, res.data);
            }).catch(function (err) {
            });
        },

        handleAvatarSuccess(res, file) {
            console.log('上传成功:', file)
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            console.log('文件信息:', file)
            // const isJPG = file.type === 'image/jpeg';
            // const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //     this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // if (!isLt2M) {
            //     this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isJPG && isLt2M;
        }
    }

});
