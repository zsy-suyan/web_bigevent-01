$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()


    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()


    })

    //表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({

            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            repwd: function(value) {

                var pwd = $('.reg-box [name=password]').val()

                if (pwd !== value) {
                    return "两次密码输入不一致"
                }

            }

        })
        //监听表单提交时间
    $('.form_reg').on('submit', function(e) {
            console.log(111);
            e.preventDefault();
            $.ajax({
                method: 'post',
                url: '/api/reguser',
                data: {
                    username: $('.reg-box [name=username]').val(),
                    password: $('.reg-box [name=password]').val()

                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('注册成功,赶快登录');
                    //模拟点击事件,注册成功自动跳转登录页面
                    $('#link_login').click()
                        //注册成功,清空里面的值
                    $('.form_reg')[0].reset()
                    console.log($('#link_login'));


                }
            })


        })
        // 登录功能
    $('.form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            //获取表单的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('res.message')

                }
                layer.msg('登录成功')
                    //登录成功会返回一个值,保存在本地
                localStorage.setItem('token', res.token)
                    //登录成功跳转到主页
                location.href = '/index.html'


            }





        })


    })

})