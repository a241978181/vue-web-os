import Mock from "mockjs";
let debug = 1;
if (debug) {
  // 登录接口
  Mock.mock(/login/, {
    code: 0,
    msg: "Success",
    data: {
      userId: "@integer(1,10)",
	  userName:'李建',
      token: "@string(30)",
	  department:'开发部',
	  position:'全栈开发',
	  phone:18888888888,
	  avatarUrl:'https://s2.ax1x.com/2020/02/16/3ShASK.jpg'
    }
  });

  // 获取权限元数组
  Mock.mock(/getMenu/, {
    code: 0,
    msg: "Success",
    data: {
      menu: [
        // {
        //   name: "Dashboard",
        //   name_en: "Dashboard",
        //   router: "/dashboard",
        //   icon: "el-icon-menu",
        //   children: []
        // },
      ]
    }
  });

 
}
