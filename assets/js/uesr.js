$(function() {
    //导入layuiform
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度在1-6之间"
            }
        }
    })

    //获取用户信息
    inituserinfo();

    function inituserinfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                //console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取失败')

                }
                console.log(res);
                form.val('formUserInfo', res.data)

            }
        })
    }
    //重置表单数据
    //给form表单绑定reset事件,给button绑定click事件
    $('#reset').on('click', function(e) {
        e.preventDefault()
            // console.log(1111);

        inituserinfo();

    })

    //需求4 修改用户信息

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),

            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg('用户修改信息失败')
                }
                layer.msg(res.message)
                    //获取当前页面的父亲,调用重置信息的函数,次函数必须为全局函数
                    // window.parent.getuserinfo()
                window.parent.getuserinfo()
                console.log(res);
            }


        })
    })

})