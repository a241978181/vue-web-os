import axios from 'axios' //如果有action

const control = {
	state: {
		//个人信息
		personalInformationViewBool: false,
		//壁纸
		wallpaperViewBool:false,
		//开始菜单
		startInformationViewBool:false,
		//任务栏任务对象
		taskList: [],
		//------------------------------------------面板展示键--------------------------------------
		//功能介绍面板展示键
		cloudDisk:false,
		//系统介绍面板展示键
		userManagement:false,
		//插件展示面板展示键
		plugShow:false,
		//新增模块时的其他面板展示键......
	},
	getters: {

	},
	mutations: {

	//退出系统
	outComputer(state){
		for(let key in state){
			if(key=='taskList'){
				state[key]=[];
			}else{
				state[key]=false;
			}
		}
	},

	//显示页面
	refresh(state){
		for(let key in state){
			if(!(key=='taskList')){
				state[key]=false;
			}
		}
	},

//***********************************基本增删改*************************************************
		//添加一个任务
		addTaskList(state, task) {
			state.taskList.push(task)
		},
		//删除一个任务
		deleteTaskList(state, task) {
			var length = state.taskList.length;
			for (var i = 0; i < length; i++) {
				if (JSON.stringify(state.taskList[i])==JSON.stringify(task)) {
					if (i == 0) {
						state.taskList.shift(); //删除并返回数组的第一个元素
						return;
					} else if (i == length - 1) {
						state.taskList.pop(); //删除并返回数组的最后一个元素
						return;
					} else {
						state.taskList.splice(i, 1); //删除下标为i的元素
						return;
					}
				}
			}
		},


		//****************************************所有展示界面键************************************************

		setTrueSIVB(state) {
			state.startInformationViewBool = true
		},
		setFalseSIVB(state) {
			state.startInformationViewBool = false
		},
		setTrueVB(state,key){
			state[key]=true;
		},
		setFalseVB(state,key){
			state[key]=false;
		}

	},
	actions: {
		//动态获取键
		 getVB(context,str){
			for (let key in context.state) {
				if (key==str) {
					return context.state[key]
				}
			}
			return false;
		},
	}
}

export default control
