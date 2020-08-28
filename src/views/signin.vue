<template>
  <div class="bg">
    <div class="login-wrap animated fadeIn">
      <img src="../assets/img/login.png" class="left"/>
      <div class="right">
        <h3>Vue-Web-OS</h3>
        <p>一款云桌面平台的基础模板</p>
        <el-form ref="form" :model="form" :rules="rules" label-width="0px" size="small">
          <el-form-item prop="name">
            <el-input placeholder="请输入账号" v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                placeholder="请输入密码"
                v-model="form.password"
                type="password"
                clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="Login('form')">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import router from "../router/index";
import generateRoutes from "../router/parser";

export default {
  name: "signin",
  data() {
    return {
      form: {
        name: localStorage.userName || "admin",
        password: localStorage.passwordInfo || "654321"
      },
      isMemery: false,
      rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
            // validator: checkone
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    Login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
              .post("login", {
                username: this.form.name,
                password: this.form.password
              })
              .then(res => {
                let userInfo = JSON.stringify(res)
                localStorage.userInfo = userInfo;
                localStorage.token = res.token;
                this.getMenu();
              });
        } else {
          return false;
        }
      });
    },
    //权限模式下
    getMenu() {
      let permissionsList = [{
        "id": 1,
        "permissionsname": "导航栏",
        "permissionsenglish": "cloudDisk",
        "state": true,
        "type": 1,
        "parentid": 0,
        "color": "primary",
        "icon": "ios-cloud",
        "image": null
      }, {
        "id": 2,
        "permissionsname": "弹出框",
        "permissionsenglish": "bigFileUpload",
        "state": true,
        "type": 2,
        "parentid": 1,
        "color": "primary",
        "icon": "ios-cloud-upload",
        "image": null
      }, {
        "id": 3,
        "permissionsname": "用户管理",
        "permissionsenglish": "userManagement",
        "state": true,
        "type": 1,
        "parentid": 0,
        "color": "success",
        "icon": "ios-body",
        "image": null
      }, {
        "id": 4,
        "permissionsname": "人员列表",
        "permissionsenglish": "personnelList",
        "state": true,
        "type": 2,
        "parentid": 3,
        "color": "success",
        "icon": "ios-body",
        "image": null
      }, {
        "id": 5,
        "permissionsname": "按钮",
        "permissionsenglish": "documentCenter",
        "state": true,
        "type": 2,
        "parentid": 1,
        "color": "primary",
        "icon": "ios-albums",
        "image": null
      }];
      let JsonPermissionsList = JSON.stringify(permissionsList)
      localStorage.setItem("permissionsList", JsonPermissionsList);
      this.$router.push("/layout");
    }

  },
  watch: {
    isMemery(n, o) {
      if (n) {
        localStorage.userName = this.form.name;
        localStorage.passwordInfo = this.form.password;
      } else {
        localStorage.removeItem("userName");
        localStorage.removeItem("passwordInfo");
      }
    }
  }
};
</script>
<style scoped lang="scss">
.bg {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
}

.login-wrap {
  margin-top: -3vh;
  padding: 0px;
  display: flex;
  align-items: center;
  background: #eff2f7;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);

  .left {
    width: 24vw;
    padding: 3vw;
  }

  .right {
    background: #fff;
    padding: 2vw;
    padding-top: 3vw;
    width: 16vw;

    .el-form-item {
      margin-bottom: 25px !important;
    }

    h3 {
      text-align: center;
      margin-top: 0px;
      margin-bottom: 5px;
      font-size: 22px;
      color: #2c2c2c;
      font-weight: 600;
    }

    p {
      text-align: center;
      margin: 0;
      letter-spacing: 1px;
    }

    form {
      margin-top: 25px;

      .el-form-item {
        margin-bottom: 15px;
      }
    }

    a {
      text-decoration: none;
      color: #1f2d3d;
    }

    button {
      width: 100%;
      font-weight: 600;
      border: none;
      margin-top: 20px;
      background-color: #7367f0;
      transition: all .2s ease;
    }
  }
}
</style>
