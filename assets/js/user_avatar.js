  $(function() {
      var layer = layui.layer
          // 1.1 获取裁剪区域的 DOM 元素
      var $image = $('#image')
          // 1.2 配置选项
      const options = {
          // 纵横比
          aspectRatio: 4 / 5,
          // 指定预览区域
          preview: '.img-preview'
      }

      // 1.3 创建裁剪区域
      $image.cropper(options)



      $('#btnchoose').on('click', function() {
              $('#file').click()



          })
          //给选择文件框绑定一个change事件
      $('#file').on('change', function(e) {
              var file = e.target.files[0]
              if (file == undefined) {
                  return layer.msg('请输入文件')
              }
              var newImgURL = URL.createObjectURL(file)
              $image
                  .cropper('destroy') // 销毁旧的裁剪区域
                  .attr('src', newImgURL) // 重新设置图片路径
                  .cropper(options) // 重新初始化裁剪区域



          })
          //将剪裁好的文件上传到服务器
      $('#btnupload').on('click', function() {
          //得到处理的文件
          //文档要求为64格式的字符串
          var dataURL = $image
              .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                  width: 100,
                  height: 100
              })
              .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
          $.ajax({
              method: 'post',
              url: '/my/update/avatar',
              data: {
                  avatar: dataURL
              },
              success: function(res) {
                  if (res.status !== 0) {
                      return layer.msg('更换失败')
                  }
                  window.parent.getuserinfo()

              }


          })



      })














  })