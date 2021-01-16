$.ajaxPrefilter(function(option) {
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url
        //当请求路径里面有my开头的,就有header

    if (option.url.indexOf('/my/') !== -1) {
        option.headers = { Authorization: localStorage.getItem('token') }
    }

})