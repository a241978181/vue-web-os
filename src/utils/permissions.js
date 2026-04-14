import store from '@/store'

/**
 * 获取当前ID下的所有权限
 * @param {Number} type 权限类型（1=模块, 2=子菜单）
 * @param {Number|null} id 权限父级id
 */
export function getPermissionsList(type, id) {
  return store.getters['permission/getByTypeAndParent'](type, id);
}