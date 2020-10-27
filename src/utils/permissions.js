/**
 * 获取当前ID下的所有权限
 * @param tpye 权限类型
 * @param id 权限id
 */
export function getPermissionsList(tpye,id){
  let permissionsList = JSON.parse(localStorage.getItem("permissionsList"));
  let permissionsArr=[];
  if (id!=null){
    for(var i=0;i<permissionsList.length;i++){
      if (permissionsList[i].type==tpye&&permissionsList[i].parentid==id) {
        permissionsArr.push(permissionsList[i]);
      }
    }
  }else{
    for(var i=0;i<permissionsList.length;i++){
      if (permissionsList[i].type==tpye) {
        permissionsArr.push(permissionsList[i]);
      }
    }
  }
  return permissionsArr;
}