<template>
  <div class="Hasservice">
    <!-- 服务中房屋 -->
    <div class="Hasservice_list">
      <div class="Hasservice_listher">
        <h2>
          <span></span>
          疏通服务
        </h2>
        <h4 style="font-size:16px; color:#ff8431;">服务中</h4>
      </div>
      <div class="Hasservice_listcen">
        <p>姓名：杨信</p>
        <p>电话：15928157446</p>
        <p>地址：成华区建设路</p>
      </div>
    </div>
      <div class="Hasservice_list">
      <div class="Hasservice_listher">
        <h2>
          <span></span>
          疏通服务
        </h2>
        <h4 style="font-size:16px; color:#ff8431;">服务中</h4>
      </div>
      <div class="Hasservice_listcen">
        <p>姓名：杨信</p>
        <p>电话：15928157446</p>
        <p>地址：成华区建设路</p>
      </div>
    </div>
  </div>
</template>

<script>
import BASE_URL from "../../constants";
export default {
  name: "Inservice",
  data() {
    return {
    
    };
  },
 
  methods: {
   
 
  }
};
</script>
<style scoped>
.Hasservice {
  background: #f5f5f5;
}

.Hasservice_list {
  width: 355px;
  background: #fff;
  margin: 10px;
  border-radius: 10px;
}
.Hasservice_listher {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 15px 10px;
}
.Hasservice_listher h2 {
  font-size: 16px;
  color: #499ef0;
  border-left: 3px solid #499ef0;
  padding-left: 13px;
  line-height: 15px;
}
.Hasservice_listcen {
  padding-bottom: 10px;
  text-align: left;
  padding-left: 10px;
}
.Hasservice_listcen p {
  line-height: 23px;
}

</style>
