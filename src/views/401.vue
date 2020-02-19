<template>
  <div class="wrap">
    <div style="margin-top:-20px;">
      <h1 class="animated swing">401</h1>
      <h4>......</h4>
      <el-button
        type="primary"
        icon="el-icon-back"
        @click="$router.go(-1)"
        size="small"
        style="margin-left:-20px"
      >Come Back</el-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  h1 {
    text-align: center;
    font-size: 10em;
    font-family: fantasy;
    color: #475669;
    letter-spacing: 40px;
    margin: -5vh 0 5vh 1vw;
  }
  h4 {
    color: #666;
  }
}
</style>
