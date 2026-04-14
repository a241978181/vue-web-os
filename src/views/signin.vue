<template>
  <div class="bg">

    <div class="login-wrap animated fadeIn">
      <img src="../assets/img/login.png" class="left"/>
      <div class="right">
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 5px; position:relative;">
          <h3 style="margin: 0; display: inline-block;">Vue-Web-OS</h3>
          <el-dropdown @command="handleSetLanguage" trigger="click" style="position: absolute; right: 0;">
            <i class="fa fa-language" style="font-size: 20px; cursor: pointer; color: #7367f0; transition: color 0.3s;" title="Switch Language"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh" :disabled="$i18n.locale === 'zh'">中文</el-dropdown-item>
              <el-dropdown-item command="en" :disabled="$i18n.locale === 'en'">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <p>{{ $t('m.login.introduction') }}</p>
        <el-form ref="form" :model="form" :rules="rules" label-width="0px" size="small">
          <el-form-item prop="name">
            <el-input :placeholder="$t('m.login.name_holder')" v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                :placeholder="$t('m.login.password_holder')"
                v-model="form.password"
                type="password"
                clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" size="small" @click="Login('form')">{{ $t('m.login.button') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  name: "signin",
  data() {
    return {
      loading:false,
      form: {
        name: localStorage.userName || "admin",
        password: localStorage.passwordInfo || "654321"
      },
      isMemery: false
    };
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: this.$t("m.login.name_tip"),
            trigger: "blur"
            // validator: checkone
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("m.login.password_tip"),
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('lang', lang);
    },
    Login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$http.post("login", {
                username: this.form.name,
                password: this.form.password
              }).then(res => {
                // 存储 token
                localStorage.token = res.token;
                // 用户信息存入 localStorage + Vuex
                localStorage.userInfo = JSON.stringify(res);
                this.$store.commit('permission/SET_USER_INFO', res);
                this.getMenu();
              }).catch(() => {
                this.loading = false;
              });
        } else {
          return false;
        }
      });
    },
    //权限模式下
    getMenu() {
      this.$http.post("getMenu", {}).then(res => {
        let permissionsList = res.menu;
        // 持久化到 localStorage（刷新恢复用）
        localStorage.setItem("permissionsList", JSON.stringify(permissionsList));
        // 存入 Vuex
        this.$store.commit('permission/SET_PERMISSIONS', permissionsList);
        this.loading = false;
        this.$router.push("/layout");
      }).catch(() => {
        this.loading = false;
      });
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
