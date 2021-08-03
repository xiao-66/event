$(function () {
    // 点击去注册
    $("#reg-link").on("click", function () {
        $(".reg-box").show();
        $(".login-box").hide();
    });

    // 点击去登录
    $("#link-login").on("click", function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    // 密码校验规则
    // 自定义layui密码校验规则
    var form = layui.form;

    // 定义layui layer.msg()方法弹出提示
    var layer = layui.layer;
    // form.verify 对象校验密码
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            // 确认密码框添加repwd 后可以通过value获取输入的密码
            // 获取密码框value值，再进行两次密码的判断
            // 两次密码不一致，则弹出密码不一致
            var passwd = $("#form_reg [name = password]").val();
            // 判断确认框和密码框两次密码，不一致return提示
            if(value != passwd) {

                return '两次密码输入不一致！' ;
            }
        }
    })

    // 注册用户请求
    $("#form_reg").on("submit",function (e) {

        //阻止默认提交行为
        e.preventDefault();
        var data = {username:$("#form_reg [name = username]").val(),
        password:$("#form_reg [name = password]").val()}
        // 发起监听表单事件  注册用户ajax post请求
        $.post("/api/reguser", data,
            function (reg) {
                if(reg.status != 0) {
                    return layer.msg(reg.message)
                //    return console.log(reg.message);
                }
                layer.msg('注册成功！')
                //  [0]将jquery中元素转换为原生js dom元素 调用原生js reset()清空表单属性值
                $("#form_reg")[0].reset();                                         
                $("#link-login").click();
            }
            
        );
    })

    // 登录用户注册事件
    $("#form_login").on("submit",function (e) {
        // 阻止默认提交表单
        e.preventDefault();

        // 发起ajax 登录请求
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status != 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                // 将返回的token值存储在本地存储
                localStorage.setItem('token',res.token)
                // console.log(res.token);
                // 跳转到index.html
                location.href= '/index.html';
            }
        });
    })
})