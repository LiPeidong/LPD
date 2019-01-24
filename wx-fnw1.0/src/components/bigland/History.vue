<template>
  <div class="Hasservice">
    <!--历史服务  -->
    <div class="work_list">
      <ul style="display:flex; justify-content:space-around;">
        <li v-for="(item,index) in work_list" :key="index" @click="workList(index,$event)">
          <span ref="content">{{item}}</span>
          <i :class="triangle" ref="icon" style="color:black"></i>
        </li>
      </ul>
       <div class="name" v-show="nameshow">
        <ul>
          <li v-for="(item,index) in datamenu" :key="index"  @click="select_menu(index)" :class="{activeColor:index==current}">{{item.name}}</li>
        </ul>
        <div style="text-align:center; padding:2px 0 10px 0 ;">
          <van-button
            type="default"
            style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
            @click="menu_btn"
          >确定</van-button>
        </div>
      </div>
      <div class="name" v-show="project">
        <ul>
          <li v-for="(item,index) in service" :key="index"  @click="select_type(index)" :class="{activeColor:index==current_type}">{{item.project}}</li>
        </ul>
        <div style="text-align:center; padding:2px 0 10px 0 ;">
          <van-button
            type="default"
            style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
            @click="type_btn"
          >确定</van-button>
        </div>
      </div>
       <div v-show="time">
        <div class="time">
          <div class="time_top">
            <div class="block">
              <el-date-picker v-model="value1" type="date" placeholder="开始日期"></el-date-picker>
            </div>
            <div class="block">
              <el-date-picker v-model="value2" type="date" placeholder="结束日期"></el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Hasservice_list">
      <div class="Hasservice_listher">
        <h2>
          <span></span>疏通服务
        </h2>
        <van-rate v-model="value" :size="14" :count="5" color="#ffa800"/>
      </div>
      <div class="Hasservice_listcen">
        <p>姓名：李某某</p>
        <p>电话：184XXXX9826</p>
        <p>地址：四川省成都市成华区万科华茂1204号</p>
        <p>接单时间：2018年11月16日 15:35:49</p>
        <p>完成时间：2018年11月16日 16:35:49</p>
      </div>
      <div class="Hasservice_listpic">
        <p>服务价格：&emsp;
          <span>&yen;90.00</span>
        </p>
      </div>
    </div>
    <div class="Hasservice_list">
      <div class="Hasservice_listher">
        <h2>
          <span></span>疏通服务
        </h2>
        <van-rate v-model="value" :size="14" :count="5" color="#ffa800"/>
      </div>
      <div class="Hasservice_listcen">
        <p>姓名：李某某</p>
        <p>电话：184XXXX9826</p>
        <p>地址：四川省成都市成华区万科华茂1204号</p>
        <p>接单时间：2018年11月16日 15:35:49</p>
        <p>完成时间：2018年11月16日 16:35:49</p>
      </div>
      <div class="Hasservice_listpic">
        <p>服务价格：&emsp;
          <span>&yen;90.00</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {
      current:'',
      current_type:'',
      nameshow: false,
      project: false,
      work_active: false,
      time:false,
      triangle: "el-icon-caret-bottom",
      work_list: ["服务区域", "服务类型", "服务时间"],
      value: 5,
      value2: "",
      value1: "",
      active: 0, //索引
      datamenu: [
        { name: "全部工人" },
        { name: "杨师傅" },
        { name: "王师傅" },
        { name: "冯师傅" },
        { name: "李师傅" },
        { name: "张师傅" },
        { name: "廖师傅" }
      ],
      service: [
        { project: "全部服务" },
        { project: "开锁服务" },
        { project: "空调维修" },
        { project: "电视维修" },
        { project: "热水器维修" },
        { project: "疏通服务" }
      ]
    };
  },
  methods: {
    showtab(index) {
      this.active = index;
    },
    workList(index, e) {
      for (let i = 0; i < this.$refs.content.length; i++) {
        if (i != index) {
          this.$refs.icon[i].style.color = "black";
          this.$refs.icon[i].className = "el-icon-caret-top";
          this.$refs.content[i].className = "";

        }
      }
      this.$refs.icon[index].style.color =
        this.$refs.icon[index].style.color == "black" ? "#499ef0" : "black";

      this.$refs.content[index].className =
        this.$refs.content[index].className == "work_active"
          ? ""
          : "work_active";

      this.$refs.icon[index].className =
        this.$refs.icon[index].className == "el-icon-caret-top"
          ? "el-icon-caret-bottom"
          : "el-icon-caret-top";
      if (index == 0) {
        this.nameshow = !this.nameshow;
        this.project = false;
        this.time = false;
      }
      if (index == 1) {
        this.project = !this.project;
        this.nameshow = false;
        this.time = false;
      }
      if (index == 2) {
        this.time = !this.time;
        this.project = false;
        this.nameshow = false;
      }
    },
    select_menu(index){
      this.current = index
    },
    select_type(index){
      this.current_type = index
    },
    menu_btn(){
      this.nameshow = false;
      for (var i=0;i<this.datamenu.length;i++){
        if (i == this.current){
          this.work_list[0] = this.datamenu[i].name;
        }
      }
    },
    type_btn(){
      this.project = false;
      for (var i=0;i<this.service.length;i++){
        if (i == this.current_type){
          this.work_list[1] = this.service[i].project;
        }
      }
    }
  }
};
</script>
<style>
.Hasservice .el-picker-panel__footer {
  display: block !important;
}
.Hasservice .el-button--text {
  display: none !important;
}
.Hasservice .el-picker-panel__footer {
  text-align: center;
  padding: 8px 0;
}
.el-button + .el-button {
  margin-left: 0 !important;
}
.Hasservice .el-button {
  width: 225px;
  height: 30px;
  background: rgb(73, 158, 240) !important;
  color: rgb(255, 255, 255) !important;
  border-radius: 15px;
}
.Hasservice .el-popper {
  margin: 0;
}
 .time {
  background: #f5f5f5;
}
.Hasservice .el-date-picker {
  width: 100% !important;
}
 body .el-input__inner {text-align: center;}
body .block{width: 100%;}
.Hasservice .el-picker-panel__body-wrapper {
  background: #f5f5f5;
}
.Hasservice .el-popper[x-placement^="bottom"] {
  margin: 0;
}
.el-date-picker .el-picker-panel__content {
  width: 100%;
}
.Hasservice .el-date-picker__header {
  margin: 0;
}
.Hasservice .popper__arrow {
  display: none !important;
}
 .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.Hasservice .el-input__prefix {
  display: none;
}
 .time_top {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  line-height: 18px;
}
 .name {
  text-align: left;
  line-height: 33px;
}
.name ul {
  background: #f5f5f5;
  height: 201px;
  overflow: scroll;
}
.name ul li {
  border-bottom: 1px solid #c7c7c7;
  padding-left: 28px;
  color: #333;
}
 .name ul li:last-child {
  border: 0;
}
 .work_list {
  background: #fff;
  margin-bottom: 5px;
}
 .work_list ul li i {
  font-size: 12px;
}
 .work_list ul li {
  margin: 8px 0;
}
.Hasservice {
  background: #f5f5f5;
  height: 100%;
}
.Hasservice .Hasservice_header {
  background: #fff;
}
.Hasservice_header > h2 {
  font-weight: bold;
  color: #ff8431;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  padding: 20px 0 13px 0;
}
.Hasservice_header > h2 > span {
  font-size: 12px;
}
.Hasservice_header > p {
  font-size: 14px;
  padding-bottom: 20px;
}
.Hasservice_tab > ul {
  display: flex;
  height: 25px;
  border: 1px solid #499ef0;
  border-radius: 25px;
}
.Hasservice .Hasservice_tab {
  padding: 10px 10px 0 10px;
  background: #fff;
  margin-top: 5px;
}
.Hasservice_tab > ul > li {
  flex-grow: 1;
  line-height: 25px;
  color: #499ef0;
  font-size: 13px;
  font-family: PingFangSC-Regular;
}
.Hasservice_tab > ul > li:nth-child(1) {
  border-radius: 25px 0 0 25px;
}
.Hasservice_tab > ul > li:nth-child(4) {
  border-radius: 0 25px 25px 0;
}
.Hasservice_tab > ul > li:nth-child(2) {
  border-left: 1px solid #499ef0;
  border-right: 1px solid #499ef0;
}
.Hasservice_tab > ul > li:nth-child(3) {
  border-right: 1px solid #499ef0;
}
.Hasservice .Hasservice_fl {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: #333;
  padding: 20px 0;
}
.Hasservice_fl .Hasservice_dat p {
  padding-bottom: 10px;
}
.Hasservice_fl .Hasservice_dat span {
  font-size: 14px;
  color: #499ef0;
}
.Hasservice_list {
  width: 355px;
  background: #fff;
  margin: 5px 10px;
  border-radius: 10px;
}
.Hasservice_listher {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 15px 10px;
}
.Hasservice_listher h2 {
  font-size: 14px;
  color: #499ef0;
  border-left: 3px solid #499ef0;
  padding-left: 13px;
  line-height: 15px;
}
.Hasservice_listcen {
  border-bottom: 1px solid #c7c7c7;
  padding-bottom: 10px;
  text-align: left;
  padding-left: 10px;
}
.Hasservice_listcen p {
  line-height: 20px;
}
.Hasservice_listpic {
  text-align: right;
  padding: 10px 10px 10px 0;
  font-size: 12px;
}
.Hasservice_listpic span {
  font-size: 18px;
  color: #499ef0;
}
.active {
  background: #499ef0;
  color: #fff !important;
}

.Hasservice .work_active {
  color: #499ef0 !important;
}

.el-date-editor.el-input__inner {
  width: 100%;
}
#box .el-select input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #333; /* placeholder字体大小  */
  font-size: 14px; /* placeholder位置  */
  text-align: center;
}
#box .el-select .el-input .el-select__caret {
  color: #333;
}

 .el-select-dropdown {
  width: 100%;
  top: 28px !important;
  left: 0px !important ;
  border: 0;
}
.Hasservice .activeColor{color: #499ef0 !important;}
</style>
