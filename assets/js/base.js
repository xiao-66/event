// 注意调用$.get 或者$.post() 或者$.ajax() 的时候
// 会调用ajaxPrefilter（）这个函数
// 在函数中，可以拿到ajax提供的配置对象

$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    // 需要权限的请求添加headers请求头
    if (options.url.indexOf('/my/') != -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' };
    }

    //给 ajax请求添加complete回调函数
    options.complete = function (res) {
        // responseJSON可以查看登录返回信息
        // 身份认证信息失败并且status值为1 就执行下面操作
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空本地本地token值
            localStorage.removeItem('token');
            // 强制跳转到login页面
            location.href = '/login.html';
        }
    }
})