<template>
  <div class="workvice buy">
    <!-- 已购买服务 -->
    <div class="work_list">
      <ul style="display:flex; justify-content:space-around;">
        <li v-for="(item,index) in work_list" :key="index" @click="workList(index,$event)">
          <span ref="content">{{item}}</span>
          <i :class="triangle" ref="icon" style="color:black"></i>
        </li>
      </ul>
      <div class="name" v-show="show_area">
        <ul>
          <li v-for="(item,index) in datamenu" :key="index" @click="select_menu(index)" :class="{active:index==current}">{{item.name}}</li>
        </ul>
        <div style="text-align:center; padding:2px 0 10px 0 ;">
          <van-button
            type="default"
            style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
            @click="menu_btn"
          >确定</van-button>
        </div>
      </div>
      <div class="name" v-show="show_type">
        <ul>
          <li v-for="(item,index) in type" :key="index" @click="select_type(index)" :class="{active:index==current_type}">{{item.genre}}</li>
        </ul>
        <div style="text-align:center; padding:2px 0 10px 0 ;">
          <van-button
            type="default"
            style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
            @click="type_btn"
          >确定</van-button>
        </div>
      </div>
      <div class="name" v-show="show_buy_count">
        <ul>
          <li v-for="(item,index) in service" :key="index">{{item.project}}</li>
        </ul>
        <div style="text-align:center; padding:2px 0 10px 0 ;">
          <van-button
            type="default"
            style="width:225px;height:30px;background:#499ef0;color:#fff;line-height:30px;border-radius: 15px;"
          >确定</van-button>
        </div>
      </div>
    </div>
    <div class="closelist">
      <div class="closeflex">
        <div class="closetext">
          <div style="display:flex;justify-content:space-between;">
            <h3>疏通服务</h3>
            <p>2018.11.16</p>
          </div>
          <p>四川省成都市成华区万科华茂1204号</p>
          <span>已服务3次</span>
        </div>
      </div>
    </div>
    <div class="closelist">
      <div class="closeflex">
        <div class="closetext">
          <div style="display:flex;justify-content:space-between;">
            <h3>疏通服务</h3>
            <p>2018.11.16</p>
          </div>
          <p>四川省成都市成华区万科华茂1204号</p>
          <span>已服务3次</span>
        </div>
      </div>
    </div>
    <div class="closelist">
      <div class="closeflex">
        <div class="closetext">
          <div style="display:flex;justify-content:space-between;">
            <h3>疏通服务</h3>
            <p>2018.11.16</p>
          </div>
          <p>四川省成都市成华区万科华茂1204号</p>
          <span>已服务3次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Buy",
  data() {
    return {
      current: ' ',
      current_type:'',
      triangle: "el-icon-caret-bottom",
      work_active: false,
      show_area: false,
      show_type: false,
      show_buy_count: false,
      value: "",
      value2: "",
      value1: "",
      activeIndex2: "1",
      work_list: ["购买区域", "购买类型", "服务次数"],
      datamenu: [
        { name: "全部工人" },
        { name: "杨师傅" },
        { name: "王师傅" },
        { name: "冯师傅" },
        { name: "李师傅" },
        { name: "张师傅" },
        { name: "廖师傅" }
      ],
      type:[{genre:'包租无忧A'},{genre:'包租无忧B'},{genre:'包租无忧C'}],
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
        this.show_area = !this.show_area;
        this.show_type = false;
        this.show_buy_count = false;
      }
      if (index == 1) {
        this.show_type = !this.show_type;
        this.show_area = false;
        this.show_buy_count = false;
      }
      if (index == 2) {
        this.show_buy_count = !this.show_buy_count;
        this.show_area = false;
        this.show_type = false;
      }
    },
    select_menu(index,event){
      this.current = index
    },
    select_type(index){
      this.current_type = index
    },
    menu_btn(){
      this.show_area = false;
      for (var i=0;i<this.datamenu.length;i++){
        if (i == this.current){
          this.work_list[0] = this.datamenu[i].name;
        }
      }
    },
    type_btn(){
      this.show_type = false;
      for (var i=0;i<this.type.length;i++){
        if (i == this.current_type){
          this.work_list[1] = this.type[i].genre;
        }
      }
    }
  }
};
</script>
<style>
.buy .el-picker-panel__footer {
  display: block !important;
}
.buy .el-button--text {
  display: none !important;
}
.buy .el-picker-panel__footer {
  text-align: center;
  padding: 8px 0;
}
.el-button + .el-button {
  margin-left: 0 !important;
}
.buy .el-button {
  width: 225px;
  height: 30px;
  background: rgb(73, 158, 240) !important;
  color: rgb(255, 255, 255) !important;
  border-radius: 15px;
}
body .el-date-picker{
  width: 100% ;
}
body .el-picker-panel{
  border-top: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}
.buy .el-picker-panel__body-wrapper {
  background: #f5f5f5;
}
.el-popper[x-placement^="bottom"] {
  margin: 0;
}
.el-date-picker .el-picker-panel__content {
  width: 100%;
}
.buy .el-date-picker__header {
  margin: 0;
}
.buy .popper__arrow {
  display: none !important;
}

.buy .el-input__prefix {
  display: none;
}
.workvice .time_top {
  display: flex;
  font-size: 12px;
  line-height: 18px;
}
.workvice .name {
  text-align: left;
  line-height: 33px;
}
.workvice .name ul {
  background: #f5f5f5;
  height: 201px;
  overflow: scroll;
}
.workvice .name ul li {
  border-bottom: 1px solid #c7c7c7;
  padding-left: 28px;
  color: #333;
}
.workvice .name ul li:last-child {
  border: 0;
}
.workvice {
  background: #f5f5f5;
  height: 100%;
}
.buy .closelist:nth-child(2) {
  margin-top: 10px;
}
.buy .closelist {
  background: #fff;
  margin: 5px 10px 0 10px;
  border-radius: 10px;
}
.workvice .closeflex {
  display: flex;
  padding: 10px;
}
.buy .closetext {
  text-align: left;
  line-height: 20px;
  font-size: 12px;
  width: 100%;
}
.buy .closetext h3 {
  font-size: 14px;
  font-weight: bold;
}
.buy .closetext span {
  border-radius: 8px;
  background: #61c161;
  color: #fff;
  text-align: center;
  display: inline-block;
  padding: 0 15px;
  height: 15px;
  line-height: 17px;
}
.workvice .work_active {
  color: #499ef0 !important;
}
.workvice .work_list {
  background: #fff;
  margin-bottom: 5px;
}
.workvice .work_list ul li i {
  font-size: 12px;
}
.workvice .work_list ul li {
  margin: 8px 0;
}
.workvice .name ul li:nth-child(1) {
  margin-top: 0;
}
.buy .popper__arrow {
  display: none;
}
.buy .active{color:#499ef0 !important;}
</style>
