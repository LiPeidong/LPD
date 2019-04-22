<template>
    <div class="float"></div>
</template>

<script>
    export default {
        name: "Float"
    }
</script>

<style scoped>
  .float{
    display: block;
    background:url("./float.png") no-repeat;
    width: 159px;
    height: 132px;
    position:fixed;
    *position:absolute;
    top:100%;
    right:1%;
    margin:-205.5px 0 0 -205.5px;
    border-radius: 0px;
    z-index: 1000;
  }
  @media only screen and (max-width: 878px){
    .float{
      display: none;
    }
  }

</style>
