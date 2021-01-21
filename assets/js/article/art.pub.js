$(function() {
    initcate()
    var form = layui.form
    var layer = layui.layer

    function initcate() {

        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)

                }
                var htmstr = template('tpl-cate', res)
                $('[name = cate_id]').html(htmstr)
                form.render()


            }


        })





    }
    //初始化富文本
    // 初始化富文本编辑器
    initEditor()

    // 裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 点击按钮选择文件
    $('#btnChooseImage').on('click', function() {
            $('#coverFile').click()



        })
        // 给文件选择框绑定一个change事件
    $('#coverFile').on('change', function(e) {
        var files = e.target.files[0]
        if (files.length == 0) {
            return
        }
        var newImgURL = URL.createObjectURL(files)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域





    })

    //修改状态
    var state = '已发布'
    $('#btnsave2').click(function() {
        state = '草稿'


    })

    //发布文章
    $('#form_pub').on('submit', function(e) {
        e.preventDefault()
            //实例化一个form表单
        var fd = new FormData(this)
            //添加状态
        fd.append('state', state)
            //将图片转化为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                //添加到fd中
                fd.append('cover_img', blob)
                    //下面进行ajax请求
                publishArticle(fd)
                console.log(...fd);



            })






    })

    //定义一个发送文章请求
    function publishArticle(fd) {

        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            //当传输的是formdata格式的数据,必须要有
            //content和process属性
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('发布成功')

                //发布成功跳转到发表文章
                window.parent.document.getElementById('art_list').click()
            }




        })
    }

})