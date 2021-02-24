# 路由与页面跳转

### ``路由``
> 本项目路由权限字段均由自定义完成，后期也可以根据项目权限模型去拓展调整。
```vue
{
        "id": 1,        --- 权限编号                           
        "permissionsname": "技术解决",      --- 权限名称，用于模块与页面上显示的名称
        "permissionsenglish": "cloudDisk",      --- 权限英文名称，用于实际代码中模块与权限的文件名称
        "state": true,      --- 是否启用，暂无用处，后期拓展使用
        "type": 1,      --- 类型，1：模块 2：页面 3：...（可自由拓展为详细权限）
        "parentid": 0,      --- 父id，所有模块的父id均为0，其他页面则为对应模块id
        "color": "primary",     --- 颜色，模块或页面呈现的颜色（primary：深蓝色。default：白色。info：天蓝色。success：绿色。warning：橘黄色。error：鲜红色。）
        "icon": "ios-cloud",        --- 模块与页面的显示图标，可以使用iview组件中的icon、后期可能会拓展elementui中的icon
        "image": null,      --- 模块与页面的图片图标显示方式（暂无用处，后期拓展使用）
        "hidden":false      --- 是否显示页面在导航中（只针对该权限为页面时有效）true：隐藏。false：显示。
      }
```

> 本项目的获取权限路由方式为登录后调用接口获取路由数据，目前接口使用mock.js接口模拟器，后期各位童鞋可以自行修改为真是后端路径。


### ``页面跳转``

> 本项目暂不支持模块之间的跳转，因为这显得没有意义。页面与页面之间的跳转由固定的方式完成。

* 无参跳转
```vue
//documentCenter为跳转页面的英文名称，必须是同级目录中的页面 
this.$emit("routerTo",{permissionsenglish:"documentCenter"});
```
* 有参跳转

```vue
// documentCenter为跳转页面的英文名称，必须是同级目录中的页面
				// {name:'参数'} 为携带的参数
				this.$emit("routerTo",{permissionsenglish:"documentCenter"},{name:'我是一个参数'});
```
