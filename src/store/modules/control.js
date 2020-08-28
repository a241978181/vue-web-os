import axios from 'axios' //如果有action

const control = {
	state: {
		//个人信息面板展示键
		personalInformationViewBool: false,
		//开始菜单面板
		startInformationViewBool:false,
		//云盘面板展示键
		cloudDiskViewBool:false,
		//用户管理面板展示键
		userManagementViewBool:false,
		//任务栏任务对象
		taskList: [],
	},
	getters: {

	},
	mutations: {
		
		
		
//***********************************万分注意!!!!!!!*************************************************
	//退出系统
	outComputer(state){
		state.personalInformationViewBool=false
		state.startInformationViewBool=false
		state.cloudDiskViewBool=false
		state.userManagementViewBool=false
		state.taskList= []
	},
	
	//显示页面
	refresh(state){
		state.personalInformationViewBool=false
		state.startInformationViewBool=false
		state.cloudDiskViewBool=false
		state.userManagementViewBool=false
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
		
		setTruePIVB(state) {
			state.personalInformationViewBool = true
		},
		setFalsePIVB(state) {
			state.personalInformationViewBool = false
		},
		setTrueSIVB(state) {
			state.startInformationViewBool = true
		},
		setFalseSIVB(state) {
			state.startInformationViewBool = false
		},
		setTrueCloudDiskVB(state) {
			state.cloudDiskViewBool=true
		},
		setFalseCloudDiskVB(state) {
			state.cloudDiskViewBool=false
		},
		setTrueUserManagementVB(state) {
			state.userManagementViewBool=true
		},
		setFalseUserManagementVB(state) {
			state.userManagementViewBool=false
		},
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
