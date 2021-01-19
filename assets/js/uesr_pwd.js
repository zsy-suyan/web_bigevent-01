$(function() {


    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function(value) {
            if (value === $('[name="oldPwd"]').val()) {
                return '新密码不能与就密码一致'
            }
        },
        repwd: function(value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '两次密码输入不一致'
            }
        }







    })

    //修改密码
    //先给表单绑定submit事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: "/my/updatepwd",
            data: $(this).serialize(),

            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)

                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        });



    })





})