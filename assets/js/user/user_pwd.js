$(function () {
    // 定义layui form 
    var form = layui.form;

    // 定义表单验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        newPwd: function(value){
            if(value === $('[name =oldPwd]').val()) {
                return '新旧密码一致！';
            }
        },
        rePwd: function(value) {
            if(value !== $("[name=newPwd]").val()) {
                return '两次密码不一致！';
            }
        }
    })

    // ajax 修改密码
    $(".layui-form").on('submit',function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起修改密码请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功！')
                $(".layui-form")[0].reset();
            }
        })
    })



})