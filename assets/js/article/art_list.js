$(function() {
    var q = {
            pagenum: 1, //页码值
            pagesize: 2, //每页显示多少数据
            cate_id: '', //文章分类的id
            state: ''
        }
        //定义一个函数
    initTable()
    var layer = layui.layer;

    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('获取失败')
                }
                var htmlstr = template('tpl-table', res)
                $('tbody').html(htmlstr)
                renderpage(res.total)
            }


        })


        $('#form-search').on('submit', function(e) {

            e.preventDefault()
            var state = $('[name=state]').val()
            var cate_id = $('[name=cate_id]').val()
            q.state = state;
            q.cate_id = cate_id
            initTable()


        })


    }


    //定义时间过滤器

    template.defaults.imports.dateFormat = function(dtStr) {
            var dt = new Date(dtStr)
            var y = dt.getFullYear()
            var m = zero(dt.getMonth())
            var d = zero(dt.getDate())
            var h = zero(dt.getHours())
            var mm = zero(dt.getMinutes())
            var s = zero(dt.getSeconds())
            return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
        }
        //定义不灵函数
    function zero(n) {
        return n > 9 ? n : '0' + n



    }
    //定义分页函数
    var laypage = layui.laypage;

    function renderpage(total) {



        //执行一个laypage实例
        laypage.render({
            elem: 'pagebox' //注意，这里的 test1 是 ID，不用加 # 号
                ,
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'skip', 'next', ],
            limits: [1, 2, 3, 10, ],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                    //首次不执行
                if (!first) {
                    //do something
                    initTable()
                }
            }





        });

    }
    //通过代理绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {

        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')

                    }
                    layer.msg('删除成功')
                        //判断有几页有几个删除按钮
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--

                        initTable()


                }


            })




            layer.close(index);



        })













    })


})






//初始化分类
var form = layui.form;
initcate()
    //封装
function initcate() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status !== 0) {

                return layer.msg(res.message)
            }
            var htmlstr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlstr)
            form.render()

        }



    })




}