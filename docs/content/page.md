# 模块、页面

## `模块 `  

![vue-web-os](https://s3.ax1x.com/2021/02/24/yODDY9.jpg "vue-web-os")

* 新增模块
```java_holder_method_tree
1.新增权限

在[/src/mock/modules/common.js]中，向【获取权限元素组】中加入一个权限，权限的【parentid】字段应为0。并且请记住页面权限的英文名称也就是【permissionsenglish】的值。


2.注册模块

在[/src/store/modules/control.js]中，向【state】中加入你的【面板展示键】面板展示键为你权限中的英文名称，默认值为【false】


3.创建模块

在[/src/components/Function/template/]中，复制一个【template.vue】的模板文件放到[/src/components/Function/]下。将其名称修改为权限中的英文名称, 也就是【permissionsenglish】字段的值，之后将该页面中[data--return]中的【ItemName】变量属性修改成为你权限中的英文名称。
```
* 可能出现的问题：

1.mock接口模拟器权限中的英文名称是否与模板创建的.vue文件名称一致。

2.[/src/store/modules/control.js]中加入的新的【面板展示键】的英文名称是否与mock接口模拟器权限中的英文名称一致。

## `页面 `

  ![vue-web-os](https://s3.ax1x.com/2021/02/24/yO691A.jpg "vue-web-os")
  
* 新增页面
```java_holder_method_tree
1.新增权限

在[/src/mock/modules/common.js]中，向【获取权限元素组】中加入一个权限，权限的【parentid】字段应为当前模块的【id】。 比如本项目中【系统介绍】模块的id为3，需要在系统模块下创建页面就把【parentid】设置为3.

并且请记住权限的英文名称也就是【permissionsenglish】的值。


2.创建模块包

在[/src/components/Menu/]中，创建一个目录，名称为当前模块的【permissionsenglish】。 比如本项目中：我需要在模块【系统介绍】下，新增一个页面，那么创建的这个目录名称就为【userManagement】。


3.创建页面

在[/src/components/Menu/当前模块的【permissionsenglish】]中，创建一个vue页面，名称为新增权限的【permissionsenglish】字段值。


4.复制index.js文件

在[/src/components/Function/template/]中，复制一个【index.js】的文件放到[/src/components/Menu/你创建的文件夹/]下,也就是第二步骤中创建的模块包。


5.修改模块导入

在[/src/components/Function/]中，找到包含当前页面的模块，修改如下图的引入组件路径。
```
![vue-web-os](https://s3.ax1x.com/2020/12/28/roKKVf.jpg "vue-web-os")

* 可能出现的问题：

1. 因为【页面】是存在于【模块】上的。所以生成的权限中，parentid要填写所在【模块】的id，查看数据是否写对。

2. 在[/src/components/Menu/]中创建的目录名称一定要跟所在【模块】的permissionsenglish一致。

3. 第四步骤是否将index.js放到了指定的文件夹中。
