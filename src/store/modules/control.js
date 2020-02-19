import axios from 'axios' //如果有action

const control = {
	state: {
		//个人信息面板展示键
		personalInformationViewBool: false,
		//开始菜单面板
		startInformationViewBool:false,
		//one面板展示键
		oneViewBool: false,
		//two面板展示键
		twoViewBool: false,
		threeViewBool:false,
		fourViewBool:false,
		fiveViewBool:false,
		//任务栏任务对象
		taskList: [],
	},
	getters: {

	},
	mutations: {
		
		
		
//***********************************万分注意!!!!!!!*************************************************
	refresh(state){
		state.personalInformationViewBool=false
		state.startInformationViewBool=false
		state.oneViewBool=false
		state.twoViewBool= false
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
		setTrueOneVB(state) {
			state.oneViewBool = true
		},
		setFalseOneVB(state) {
			state.oneViewBool = false
		},
		setTrueTwoVB(state) {
			state.twoViewBool = true
		},
		setFalseTwoVB(state) {
			state.twoViewBool = false
		},
		setTrueThreeVB(state) {
			state.threeViewBool = true
		},
		setFalseThreeVB(state) {
			state.threeViewBool = false
		},
		setTrueFourVB(state) {
			state.fourViewBool = true
		},
		setFalseFourVB(state) {
			state.fourViewBool = false
		},
		setTrueFiveVB(state) {
			state.fiveViewBool = true
		},
		setFalseFiveVB(state) {
			state.fiveViewBool = false
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
