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
	  avatarUrl:'http://lhjf-pr.oss-cn-zhangjiakou.aliyuncs.com/img/20260414/152909/5434ce3382da4605a698b931c85b9e63.jpg'
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
        "code": "cloudDisk",
        "permissionsnameen": "Technical Solution",
        "state": true,
        "type": 1,
        "parentid": 0,
        "icon": "el-icon-cpu",
        "image": null,
        "hidden":false,
        "sort": 1,
        "defaultPage": "bigFileUpload"
      }, {
        "id": 2,
        "permissionsname": "弹出框",
        "code": "bigFileUpload",
        "permissionsnameen": "Dialog",
        "state": true,
        "type": 2,
        "parentid": 1,
        "icon": "el-icon-upload",
        "image": null,
        "sort": 1,
        "hidden":false
      }, {
        "id": 3,
        "permissionsname": "系统介绍",
        "code": "userManagement",
        "permissionsnameen": "System Intro",
        "state": true,
        "type": 1,
        "parentid": 0,
        "icon": "el-icon-s-tools",
        "image": null,
        "sort": 2,
        "hidden":false
      }, {
        "id": 4,
        "permissionsname": "安装与启动",
        "code": "personnelList",
        "permissionsnameen": "Install & Start",
        "state": true,
        "type": 2,
        "parentid": 3,
        "icon": "el-icon-position",
        "image": null,
        "sort": 1,
        "hidden":false
      }, {
        "id": 5,
        "permissionsname": "按钮",
        "code": "documentCenter",
        "permissionsnameen": "Buttons",
        "state": true,
        "type": 2,
        "parentid": 1,
        "icon": "el-icon-picture",
        "image": null,
        "sort": 2,
        "hidden":false
      }, {
        "id": 6,
        "permissionsname": "页面跳转",
        "code": "pageJump",
        "permissionsnameen": "Page Jump",
        "state": true,
        "type": 2,
        "parentid": 1,
        "icon": "el-icon-crop",
        "image": null,
        "sort": 3,
        "hidden":false
      }, {
        "id": 7,
        "permissionsname": "新增模块",
        "code": "addModule",
        "permissionsnameen": "Add Module",
        "state": true,
        "type": 2,
        "parentid": 3,
        "icon": "el-icon-menu",
        "image": null,
        "sort": 2,
        "hidden":false
      }, {
        "id": 7,
        "permissionsname": "新增页面",
        "code": "addPage",
        "permissionsnameen": "Add Page",
        "state": true,
        "type": 2,
        "parentid": 3,
        "icon": "el-icon-data-board",
        "image": null,
        "sort": 3,
        "hidden":false
      },{
        "id": 8,
        "permissionsname": "插件展示",
        "code": "plugShow",
        "permissionsnameen": "Plugins",
        "state": true,
        "type": 1,
        "parentid": 0,
        "icon": "el-icon-shopping-cart-2",
        "image": null,
        "sort": 3,
        "hidden":false
      },{
        "id": 9,
        "permissionsname": "拖拽列表",
        "code": "slidingList",
        "permissionsnameen": "Sliding List",
        "state": true,
        "type": 2,
        "parentid": 8,
        "icon": "el-icon-s-grid",
        "image": null,
        "sort": 1,
        "hidden":false
      },{
        "id": 10,
        "permissionsname": "隐藏路由",
        "code": "hiddenRouting",
        "permissionsnameen": "Hidden Routing",
        "state": true,
        "type": 2,
        "parentid": 1,
        "icon": "el-icon-s-grid",
        "image": null,
        "sort": 4,
        "hidden":true
      },{
        "id": 11,
        "permissionsname": "介绍文档",
        "code": "docCenter",
        "permissionsnameen": "Documentation",
        "state": true,
        "type": 1,
        "parentid": 0,
        "icon": "el-icon-document",
        "image": null,
        "sort": 4,
        "hidden":false,
        "defaultPage": "docOverview"
      },{
        "id": 12,
        "permissionsname": "项目总览",
        "code": "docOverview",
        "permissionsnameen": "Overview",
        "state": true,
        "type": 2,
        "parentid": 11,
        "icon": "el-icon-info",
        "image": null,
        "sort": 1,
        "hidden":false
      },{
        "id": 13,
        "permissionsname": "权限体系",
        "code": "docPermissions",
        "permissionsnameen": "Permissions",
        "state": true,
        "type": 2,
        "parentid": 11,
        "icon": "el-icon-lock",
        "image": null,
        "sort": 2,
        "hidden":false
      },{
        "id": 14,
        "permissionsname": "核心功能",
        "code": "docFeatures",
        "permissionsnameen": "Features",
        "state": true,
        "type": 2,
        "parentid": 11,
        "icon": "el-icon-star-on",
        "image": null,
        "sort": 3,
        "hidden":false
      },{
        "id": 15,
        "permissionsname": "开发指南",
        "code": "docGuide",
        "permissionsnameen": "Dev Guide",
        "state": true,
        "type": 2,
        "parentid": 11,
        "icon": "el-icon-guide",
        "image": null,
        "sort": 4,
        "hidden":false
      },{
        "id": 16,
        "permissionsname": "动画特效",
        "code": "docAnimation",
        "permissionsnameen": "Animation",
        "state": true,
        "type": 2,
        "parentid": 11,
        "icon": "el-icon-magic-stick",
        "image": null,
        "sort": 5,
        "hidden":false
      },{
        "id": 17,
        "permissionsname": "右键菜单",
        "code": "docContextMenu",
        "permissionsnameen": "Context Menu",
        "state": true,
        "type": 2,
        "parentid": 11,
        "icon": "el-icon-mouse",
        "image": null,
        "sort": 6,
        "hidden":false
      },{
        "id": 18,
        "permissionsname": "菜单优化",
        "code": "docTabScroll",
        "permissionsnameen": "Tab Scroll",
        "state": true,
        "type": 2,
        "parentid": 11,
        "icon": "el-icon-s-operation",
        "image": null,
        "sort": 7,
        "hidden":false
      },{
        "id": 19,
        "permissionsname": "通知中心",
        "code": "docNotification",
        "permissionsnameen": "Notification",
        "state": true,
        "type": 2,
        "parentid": 11,
        "icon": "el-icon-message-solid",
        "image": null,
        "sort": 8,
        "hidden":false
      }]
    }
  });


}
