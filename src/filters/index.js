import Vue from 'vue';

/**
 * 格式化时间
 */
Vue.filter('formatDate', function (value, template) {
    if (value == null) {
        return null;
    }
    return dayjs(value).format(!!template ? template : 'YYYY-MM-DD HH:mm:ss')
});
// 数字加千分符
Vue.filter('T', value => Number(value).toLocaleString());
