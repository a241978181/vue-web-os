<template>
  <footer>
    <span>
      河北金蟾软件
    </span>
    <span>
      <span>金蟾控制中心</span>
      <i class="fa fa-heart"></i>
    </span>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  width: calc(100% - 180px);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 14px;
  i {
    padding-left: 4px;
  }
  a,
  i {
    text-decoration: none;
    color: #7367f0;
  }
  a:hover {
    text-shadow: 3px 3px 20px #7367f0;
  }
}
</style>