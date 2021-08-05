$(function() {

    var form = layui.form;
    var layer = layui.layer;
    
    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return '昵称长度必须在1~6个字符之间！';
            }
        }
    })

    initUserInfo();

    // 更新 修改 用户信息
    $(".layui-form").on("submit",function(e) {
        // 阻止默认提交行为
        e.preventDefault();

        // 发起ajax请求修改数据
        $.ajax({
            method:"POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('修改信息失败！');
                }
                layer.msg('修改信息成功');
                // 更新头像名称 调用父页面getUserInfo()方法重新获取
                window.parent.getUserInfo();

            }
        })
    })

    // 获取用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url:'/my/userinfo',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                form.val('user_info',res.data)
            }
        })
    }

})