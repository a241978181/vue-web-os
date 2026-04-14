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
      menu: [{
        "id": 1,
        "permissionsname": "技术解决",
        "permissionsenglish": "cloudDisk",
        "state": true,
        "type": 1,
        "parentid": 0,
        "color": "primary",
        "icon": "el-icon-cpu",
        "image": null,
        "hidden":false,
        "defaultPage": "bigFileUpload"
      }, {
        "id": 2,
        "permissionsname": "弹出框",
        "permissionsenglish": "bigFileUpload",
        "state": true,
        "type": 2,
        "parentid": 1,
        "color": "primary",
        "icon": "el-icon-upload",
        "image": null,
        "hidden":false
      }, {
        "id": 3,
        "permissionsname": "系统介绍",
        "permissionsenglish": "userManagement",
        "state": true,
        "type": 1,
        "parentid": 0,
        "color": "success",
        "icon": "el-icon-s-tools",
        "image": null,
        "hidden":false
      }, {
        "id": 4,
        "permissionsname": "安装与启动",
        "permissionsenglish": "personnelList",
        "state": true,
        "type": 2,
        "parentid": 3,
        "color": "success",
        "icon": "el-icon-position",
        "image": null,
        "hidden":false
      }, {
        "id": 5,
        "permissionsname": "按钮",
        "permissionsenglish": "documentCenter",
        "state": true,
        "type": 2,
        "parentid": 1,
        "color": "primary",
        "icon": "el-icon-picture",
        "image": null,
        "hidden":false
      }, {
        "id": 6,
        "permissionsname": "页面跳转",
        "permissionsenglish": "pageJump",
        "state": true,
        "type": 2,
        "parentid": 1,
        "color": "primary",
        "icon": "el-icon-crop",
        "image": null,
        "hidden":false
      }, {
        "id": 7,
        "permissionsname": "新增模块",
        "permissionsenglish": "addModule",
        "state": true,
        "type": 2,
        "parentid": 3,
        "color": "success",
        "icon": "el-icon-menu",
        "image": null,
        "hidden":false
      }, {
        "id": 7,
        "permissionsname": "新增页面",
        "permissionsenglish": "addPage",
        "state": true,
        "type": 2,
        "parentid": 3,
        "color": "success",
        "icon": "el-icon-data-board",
        "image": null,
        "hidden":false
      },{
        "id": 8,
        "permissionsname": "插件展示",
        "permissionsenglish": "plugShow",
        "state": true,
        "type": 1,
        "parentid": 0,
        "color": "info",
        "icon": "el-icon-shopping-cart-2",
        "image": null,
        "hidden":false
      },{
        "id": 9,
        "permissionsname": "拖拽列表",
        "permissionsenglish": "slidingList",
        "state": true,
        "type": 2,
        "parentid": 8,
        "color": "info",
        "icon": "el-icon-s-grid",
        "image": null,
        "hidden":false
      },{
        "id": 10,
        "permissionsname": "隐藏路由",
        "permissionsenglish": "hiddenRouting",
        "state": true,
        "type": 2,
        "parentid": 1,
        "color": "success",
        "icon": "el-icon-s-grid",
        "image": null,
        "hidden":true
      },{
        "id": 11,
        "permissionsname": "介绍文档",
        "permissionsenglish": "docCenter",
        "state": true,
        "type": 1,
        "parentid": 0,
        "color": "warning",
        "icon": "el-icon-document",
        "image": null,
        "hidden":false,
        "defaultPage": "docOverview"
      },{
        "id": 12,
        "permissionsname": "项目总览",
        "permissionsenglish": "docOverview",
        "state": true,
        "type": 2,
        "parentid": 11,
        "color": "warning",
        "icon": "el-icon-info",
        "image": null,
        "hidden":false
      },{
        "id": 13,
        "permissionsname": "权限体系",
        "permissionsenglish": "docPermissions",
        "state": true,
        "type": 2,
        "parentid": 11,
        "color": "warning",
        "icon": "el-icon-lock",
        "image": null,
        "hidden":false
      },{
        "id": 14,
        "permissionsname": "核心功能",
        "permissionsenglish": "docFeatures",
        "state": true,
        "type": 2,
        "parentid": 11,
        "color": "warning",
        "icon": "el-icon-star-on",
        "image": null,
        "hidden":false
      },{
        "id": 15,
        "permissionsname": "开发指南",
        "permissionsenglish": "docGuide",
        "state": true,
        "type": 2,
        "parentid": 11,
        "color": "warning",
        "icon": "el-icon-guide",
        "image": null,
        "hidden":false
      },]
    }
  });


}
