$(function() {
    getuserinfo()
        //实现退出功能化
    $('#close').on('click', function() {

        //  console.log(3425);
        layer.confirm('大哥确定退出?', { icon: 3, title: '警告' }, function(index) {
            //点击确定退出,清空本地的token,然后回到登录
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });

    })


})



//构造一个函数,写在外面,后面要用
function getuserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')

        // },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')

            }
            renderAvatar(res.data)



        },
        complete: function(res) {
            console.log(res);
            if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }



        }



    })


}
//封装一个函数
function renderAvatar(user) {
    //渲染名称,nickname优先
    var name = user.nickname || user.username
    $('#welcome').html('欢迎 ' + name + '大哥')
        //渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }


}