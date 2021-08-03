$(function () {

    getUserInfo()
    var layer = layui.layer;
    // 点击退出按钮，退出index页面，跳转到login
    $("#btnout").on('click', function () {
        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' },
            function (index) {
                // 清除localStorage中的token
            localStorage.removeItem('token');
            // 跳转到login登录页面
            location.href = '/login.html';
                // layui 确认询问框
                layer.close(index);
            });
    })
})
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            // 调用渲染用户头像函数
            renderAvAtari(res.data);
        }
        // 不论成功或者失败 都会执行complete回调函数
        // complete: function(res) {
        //     // responseJSON可以查看登录返回信息
        //     // 身份认证信息失败并且status值为1 就执行下面操作
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空本地本地token值
        //     localStorage.removeItem('token');
        //     // 强制跳转到login页面
        //     location.href = '/login.html';
        //     }
        // }
    });
}

function renderAvAtari(user) {
    // 1 获取用户名称
    var name = user.nickname || user.username;
    $(".welcome").html('欢迎&nbsp;&nbsp;' + name);

    // 2.渲染用户图片头像
    if (user.user_pic !== null) {
        // 如果用户有图片头像 显示图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".head_portrait").hide();
    } else {
        // 否则显示文字头像
        $(".layui-nav-img").hide();
        // 获取用户名称第一个字符设置为文字头像
        var userStr = name[0].toUpperCase(); // toUpperCase()转换为大写
        $(".head_portrait").html(userStr).show();
    }
}