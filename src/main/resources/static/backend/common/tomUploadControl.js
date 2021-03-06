/**
 * XXX为传过来的参数
 * 后台路径为/api/XXXFile
 * 参数：
 *    type：XXX
 *    XXXFile:上传文件
 *
 */
var tomUploadControl = function (o) {
    //console.log("括号传过来的参数为:"+o);
    //只上传图片时候可以启用
   /* var prev = "";
    var simplePrev = "";*/
    var xhr = new XMLHttpRequest();

    //初始化前缀参数。 根据此参数拼接
    //只上传图片时候可以启用
   /* var initParams = function (param) {
        prev = "#"+param;
        simplePrev = param;
    }*/

    //补充传参
    var setParams = function (formData) {

    }

    // 打开上传弹窗
    var toUploadFile = function (){
        //只上传图片时候可以启用
       /* switch(simplePrev)
        {
            case "photo":
                $("#UploadImage").attr("accept",".jpg,.png,.gif,.bmp");
                break;
            default:
                $("#UploadImage").attr("accept","*");
        }*/
        $('#UploadImage').val("");
        $('#Procebar').css('width','0%');
        $('#Procebar').empty();
        $("#h4").html("附件上传");
        $("#h5").html("附件上传" + "<span class='required' aria-required='true'> * </span>");
        $('#Modal').modal();
    }

    //上传
    var doUploadFile = function (){
        var fileInput = document.getElementById("UploadImage").files[0];
        if(fileInput == "" || fileInput == null){
            bootbox.alert("请选择上传文件!");
            return false;
        }
        var name = fileInput.name;
        var apiPre = "";
        if(name.endsWith(".bmp")||name.endsWith(".png")||name.endsWith(".gif")||name.endsWith(".jpg")){
            apiPre = "photoFile";
        }else{
            apiPre = "fileFile";
        }
        var formData = new FormData();
        setParams(formData);
        formData.append( "id", tomUploadControl.id);
        formData.append(apiPre,fileInput);
        // 监听事件
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        // 发送文件和表单自定义参数
        xhr.open("POST", ctx+"/api/"+apiPre);
        xhr.send(formData);
    }

    // 上传进度
    function uploadProgress(evt) {
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            $('#Procebar').css('width',percentComplete.toString()+'%');
            $('#Procebar').empty();
            $('#Procebar').html(percentComplete.toString()+'%');
            if(percentComplete == 100){
                $('#Procebar').html("上传成功");
            }
        }
        else {
            $('#Procebar').html("未上传");
        }
    }

    // 上传成功
    function uploadComplete(evt) {
        // 服务断接收完文件返回的结果
        var text = evt.target.responseText;
        console.log(text)
        var data = eval("(" + text + ")");
        if(data.result){
            bootbox.alert("上传成功!");
            // 刷新当前页面
            $("#UploadImage").val('');
            $("#Modal").modal('hide');
            // 刷新当前页面
            $('#myTable').dataTable().fnClearTable(0);
            $('#myTable').dataTable().fnDraw();
        }else{
            bootbox.alert("上传失败!");
        }
    }

    // 上传失败
    function uploadFailed(evt) {
        bootbox.alert("上传失败!");
    }

    // 取消上传
    function uploadCanceled(obj) {
        document.getElementById('progress').innerHTML = "0%";
        console.log(obj);
    }

    //根据id回显缩略图 点击放大   方法,主键,路径,追加选择器前缀
    var lookupMin = function (method,id,url,idNamePre) {
        $("#"+idNamePre+id).html("");
        $.ajax({
            type	:	method,
            url		:	url,
            dataType:   'json',
            async : false,
            success	:	function(data){
                var data = data.result;
                if(data){
                    for (i in data){
                        var url =  ctx + 'data/'+data[i].url.substring(0,data[i].url.lastIndexOf('.'));
                        var downloadUrl =  ctx + 'api/downFileByName?fileName='+data[i].actualFileName;
                        var file ="";
                        if(data[i].url.endsWith("png")){
                             file = ` <a href="${url}.png"  data-magnify >
                                          <img style="max-width: 100%;max-height: 100%;"src="${url}_min.png"/>
                                         </a>`;
                        }else{
                            file = ` <a target="_blank" href="${downloadUrl}">${data[i].actualFileName}</a>`;
                        }

                        var div = `<div class="col-sm-3 col-xs-6" style="margin-bottom: 5px">
                                        <div class="mt-card-item">
                                            <div class="mt-card-avatar mt-overlay-4">
                                                <div class="m-grid m-grid-demo">
                                                    <div class="m-grid-row">
                                                        <div class="m-grid-col m-grid-col-middle m-grid-col-center">
                                                              ${file}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-overlay">
                                                    <div class="mt-info font-white">
                                                        <div class="mt-card-content">
                                                            <div class="mt-card-social text-center">
                                                                <a class="mt-card-btn" href="javascript:;" >
                            <a class="mt-card-btn" href="javascript:;" onclick="tomUploadControl.del('${data[i].actualFileName}')">
                            删除
                        </a>
                            </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                        $("#"+idNamePre+id).append(div);
                    }
                }
            },
            error	:	function(data){
                console.log(data);
            }
        });
    }

    var del = function (fileName) {
        var flag = confirm("确定删除这个附件吗,小阿Giao?");
        if(!flag) return false;
        $.ajax({
            type	:	"delete",
            url		:	ctx + "api/deleteFile?fileName="+fileName,
            dataType:	"json",
            success	:	function(data){
                if(data.result){
                    tomUploadControl.min("GET", tomUploadControl.id ,ctx + "api/getFileListData/" +  tomUploadControl.id ,"spa_attchments_");
                }else{
                    alert("获取信息失败，暂无法修改");
                }
            },
            error	:	function(data){
                console.log(data);
            }
        });
    }

    return{
        upload:doUploadFile,
        init:function (param,id,type) {
            tomUploadControl.id = id;
            tomUploadControl.type = type;
            //需要判断上传文件类型时候可以启用
            //initParams(param);
            toUploadFile(id);
        },
        min:function(method,id,url,idNamePre){
            tomUploadControl.id = id;
            lookupMin(method,id,url,idNamePre);
        },
        del:del,
    }
}(123);
//()内作为参数可以作为参数传入方法
$(function () {

    $(document).mouseup(function(e){
        var _con = $('.magnify-modal');   // 设置目标区域
        if(!_con.is(e.target) && _con.has(e.target).length === 0){
            _con.hide();
            //防止点击关闭 滚动条失效
            $('html').css({ 'overflow': '', 'padding-right': 0 });
        }
    });
})