//后台接参数 业务id：id   参数：paramName
var froalaSettings = function () {

    const imgUrl =  ctx + 'api/froala/image';

    // 上传图片相关
    var imageSet = {
        // 请求中包含图像文件信息的参数的名称default → file
        imageUploadParam: 'image_param',
        imageUploadURL:imgUrl,
        imageUploadParams: {id: 'froalaEditor',paramName:'image_param'},
        imageUploadMethod: 'POST',
        // 可以上传的最大图像尺寸
        imageMaxSize: 5 * 1024 * 1024,
        imageAllowedTypes: ['jpeg', 'jpg', 'png','bmp'],
        events: {
            'image.beforeUpload': function (images) {
            },
            'image.uploaded': function (response) {
            },
            'image.inserted': function ($img, response) {
               console.log("图像插入编辑器后触发事件");
            },
            'image.replaced': function ($img, response) {
               console.log("图像替换到编辑器后触发事件");
            },
            'image.error': function (error, response) {
                // Bad link.
                if (error.code == 1) { console.log("图片链接错误") }

                // No link in upload response.
                else if (error.code == 2) { console.log("图片响应无链接") }

                // Error during image upload.
                else if (error.code == 3) { console.log("图片上传时出错") }

                // Parsing response failed.
                else if (error.code == 4) { console.log("图片解析响应失败") }

                // Image too text-large.
                else if (error.code == 5) { console.log("图片太大") }

                // Invalid image type.
                else if (error.code == 6) { console.log("图片类型无效") }

                // Image can be uploaded only to same domain in IE 8 and IE 9.
                else if (error.code == 7) { console.log("IE") }

                // Response contains the original server response to the request if available.
            }
        }
    };

    return{
        imageSet:imageSet
    }

}();