$(function() {
    initArtCateList()
        //封装一个函数,渲染页面
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {

                var str = template('ww', res)
                $('tbody').html(str)


            }





        })


    }
    //添加类绑定点击事件
    var layer = layui.layer;
    var indexadd = null;
    $('#btnaddcate').on('click', function() {
            indexadd = layer.open({

                type: 1,
                title: '添加文章分类',
                area: ['500px', '260px'],
                content: $('#dialog-add').html()
            });





        })
        //点击提交事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('失败')
                }
                initArtCateList()
                layer.msg('添加成功')
                layer.close(indexadd)


            }


        })





    })

    //4 给编辑绑定点击事件,因为动态,所以绑定body
    var form = layui.form
    var indexedit = null;
    $('tbody').on('click', '.btn-edit', function() {

        indexedit = layer.open({

            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html(),

        });
        // var Id = $(this).attr('data-id')
        // console.log(Id);
        // $.ajax({
        //     method: 'get',
        //     url: '/my/article/cates/' + Id,
        //     success: function(res) {
        //         form.val('form-edit', res.data)
        //     }


        // })
        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })






    })
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexedit)
                initArtCateList()
            }
        })
    })

    //删除事件

    // $('tbody').on('click', '.btn-delete', function() {
    //     var id = $(this).attr('data-id')
    //     layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function(index) {

    //         $.ajax({
    //             url: '/my/article/deletecate/' + id,
    //             data: $(this).serialize(),
    //             success: function(res) {
    //                 console.log(res);
    //                 if (res.status !== 0) {
    //                     return layer.msg(res.message)

    //                 }
    //                 layer.msg('删除成功')
    //                 initArtCateList()
    //                 layer.close(indexedit)
    //             }
    //         })











    //         layer.close(index);
    //     });




    // })
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })



})