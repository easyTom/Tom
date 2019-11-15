var spaSubRowReportControl = function() {
var ff = false;
var arr = new Array();
	function initSubRowHtml(rowData) {
	    console.log(rowData)
	    var clinicid = rowData.clinicid;
        $("#roomId").val(rowData.devicename)
        $("#spa_report_"+clinicid).empty();
        $("#spa_video_"+clinicid).empty();
            var str = "";
            if(rowData.currentUserCode == '5' && rowData.status == '03' && rowData.currentUserId != rowData.createuser ){
                str += '<a style="text-decoration:none;" class="btn btn-sm blue"  href="javascript:spaSubRowReportControl.addReport(\'' + clinicid + '\');"><i class="fa fa-edit"></i> 填写报告 </a>';

            }
            if(rowData.status == '04'){
                    str += '<a style="text-decoration:none;" class="btn btn-sm blue" href="javascript:spaSubRowReportControl.lookupReport(\'' + clinicid + '\',\'' + rowData.reporterId + '\')"><i class="fa fa-print"></i> 查看报告 </a>';

                if(rowData.currentUserId ==  rowData.reporterid  ){
                    str += '<a style="text-decoration:none;" class="btn btn-sm blue" href="javascript:spaSubRowReportControl.returnbackReport(\'' + clinicid + '\',\'' + rowData.reporterId + '\')"><i class="fa fa-reply"></i> 撤销报告 </a>';
                }

            }
            $("#spa_report_"+clinicid).append(str);
        //视频咨询
        if(rowData.status == '03'){
              var name = rowData.videoUrl;
              if(rowData.currentUserCode == '4'){
                  var  videoConsult = `<a style="text-decoration:none;" class="btn btn-sm blue" href="javascript:openUrl('${rowData.clinicid}','${rowData.devicename}','anchor');"><i class="fa fa-phone"></i> 即时咨询</a>`;
              }else if(rowData.currentUserCode == '5'){
                  var  videoConsult = `<a style="text-decoration:none;" class="btn btn-sm blue" href="javascript:openUrl('${rowData.clinicid}','${rowData.devicename}','viewer');"><i class="fa fa-phone"></i> 即时咨询</a>`;
              }


            $("#spa_video_"+clinicid).append(videoConsult);
        }

    }
    // 查看报告
    var htmlPage = "";
    var flag = true;
    var lookupReport =function (clinicid) {
        $("#modalShow").modal();
        $.ajax({
            type: "get",
            url:ctx + "ultrasound/report/getReportInfo/" + clinicid,
            dataType: 'json',
            async:false,
            success: function (data) {
                console.log(data)
                if (data) {
                    var $selectPrefix = "#modalShow #";
                    //var $selectPrefix = "#printModal #";
                    $($selectPrefix + 'name').empty();
                    $($selectPrefix + 'sex').empty();
                    $($selectPrefix + 'age').empty();
                    $($selectPrefix + 'sndsite').empty();
                    $($selectPrefix + 'snddate').empty();
                    $($selectPrefix + 'sj').empty();
                    $($selectPrefix + 'ts').empty();
                    $($selectPrefix + 'rcvdate').empty();
                    $($selectPrefix + 'rcvsite').empty();
                    $($selectPrefix + 'depart').empty();
                    $($selectPrefix + 'reportname').empty();
                    if(data.ur.signature){
                        ff = true;
                        $($selectPrefix + 'reportname').empty();
                    }
                    $($selectPrefix + 'name').append(data.patient.name);
                    $($selectPrefix + 'sex').append(data.patient.gender == '1'? '男':'女');
                    $($selectPrefix + 'age').append(data.clinic.age);
                    $($selectPrefix + 'sndsite').append(data.clinic.sndsitename);
                    $($selectPrefix + 'snddate').append(datetimeUtils.datetimeToFormatDatetime(new Date(data.clinic.createtime)));
                    $($selectPrefix + 'sj').append(` <strong>超声所见：</strong>
                                <br /><br />`+data.ur.description);
                    $($selectPrefix + 'ts').append(` <strong>超声提示：</strong>
                                <br /><br />`+data.ur.opinions);
                    $($selectPrefix + 'rcvdate').append(datetimeUtils.datetimeToFormatDatetime(new Date(data.ur.createtime)));
                    $($selectPrefix + 'rcvsite').append(data.clinic.rcvsitename);
                    $($selectPrefix + 'depart').append(data.ur.departname);
                    $($selectPrefix + 'reportname').append(data.ur.expertname);
                    if(data.ur.signature){
                        ff = true;
                        $($selectPrefix + 'reportname').append(`<img id="reSign" style="max-width: 100px;max-height: 50px" src="data:image/gif;base64,${data.ur.signature}" />`);
                    }
                 var photo = "https://dev.ewisemedical.com/file/picture/scan/";
                    if(data.att){
                        $($selectPrefix + 'att').empty();
                        for( i in data.att){
                  /*          var url = ctx + "/ultrasound/report/getImageDataByAttachmentId/"+data.att[i].attachmentId;*/
                            $($selectPrefix + 'att').append(`<div class="col-md-3" style="float: left"><img src="${data.att[i].url}" style="max-width: 100px;max-height: 100px"/></div>`);
                        }
                    }
                }
            },
            error: function (data) {
                console.log(data);
            }
        });


    }

    var print = function () {
          imgLoad(function(){
                   var iframe = window.frames['frame'];
                   if(flag){
                       var url = ctx+"global/plugins/bootstrap/css/bootstrap.min.css";
                       var head_str = "<html><head><title></title></head><body>"; //先生成头部
                       head_str += `<link href="${url}" rel="stylesheet" type="text/css" />`;
                       var foot_str = "</body></html>"; //生成尾部
                       $("#collection1").css("display","none");
                       $("#collection2").css("display","none");
                       $("#collection3").css("display","none");
                       var new_str = document.getElementById("modalShow").innerHTML; //获取指定查看区域
                       console.log(new_str)
                       $("#collection1").show();
                       $("#collection2").show();
                       $("#collection3").show();
                       var s  = head_str + new_str + foot_str; //构建新网页*!/
                       iframe.document.open();
                       iframe.document.write(s);
                   }else{
                       iframe.document.write(htmlPage);
                   }

                   iframe.document.close();
                   document.getElementById("frame").onload=function(){
                       if(flag){
                           htmlPage = s;
                       }
                       flag = false;
                       iframe.print();
                   }

               })
    }

    var save = function () {
        $("#submit_form_tem").attr('action',ctx + 'usTemplate/insert');
        $("#submit_form_tem").validate().resetForm();
        $("#submit_form_tem")[0].reset();
        var sj = $("#modalShow #sj").text().substring(6).trim();
        var ts = $("#modalShow #ts").text().substring(6).trim();

        $("#teModal #description").val(sj);
        $("#teModal #opinion").val(ts);
        $("#teModal").modal();
    }
    
    var returnbackReport= function (clinicid,reporterId) {
        var  flag = confirm("本操作将删除已经填写的报告内容，请确认!");
        if(!flag){
            return false;
        }
        $.ajax({
            type: "get",
            url: ctx+"/ultrasound/report/returnbackReport/" + clinicid,
            dataType: 'json',
            async: false,
            success: function (data) {
                if(data.resultCode){
                    // 刷新当前页面
                    $("#initTableRow").val(clinicid);
                    $('#myTable').dataTable().fnClearTable(0);
                    $('#myTable').dataTable().fnDraw(false);

                }else {
                    alert("删除失败!");
                }
            }
        });
    }

    var addReport = function (clinicid) {

        var secret_key = "db4139a692060d9416ce2b2ca6156490";
        var tmp = Date.parse(new Date() ).toString();
        tmp = tmp.substr(0,10);
        var roomId = $("#roomId").val();
        var url = "https://dev.ewisemedical.com/photo";
        var photo_url = "https://dev.ewisemedical.com/file/picture/scan/";
        var sign = hex_md5(roomId+clinicid+tmp+secret_key);
        var str = "";
        $("#photo").show();
        $("#ats").empty();
        //window.open("https://dev.ewisemedical.com/file/im/auth.html#"+JSON.stringify(res.data));
        //如果有附件 应该直接显示缩略图
        $.ajax({
            type	:	"get",
            url		:	`${url}?sign=${sign}&check_id=${clinicid}&time=${tmp}&room_id=${roomId}`,
            dataType:   'json',
            async : false,
            success	:	function(data){
                if(data.error != '0'){
                    alert("获取图片失败");
                    return false;
                }
                var res = data.data;
                $(res).each(function (i, e) {
                    if(e.check_id == clinicid){
                        if(arr && arr.indexOf(e.file_name)>-1){
                        var imageUrl = photo_url+e.file_name;
                        var ii ='<img class="pho" style="max-width: 200px;max-height: 200px;border:2px solid red;" src="'+imageUrl+'" id="'+e.file_name+'" />';
                        var img = `<div  onclick="spaSubRowReportControl.che('${e.file_name}')" class="col-md-6 col-sm-6 col-xs-6 " style="padding: 0px 0;text-align: center;margin-top: 5px;margin-bottom: 5px;" >` + ii+
                            '</div>';
                        }
                    else{
                            var imageUrl = photo_url+e.file_name;
                            var ii ='<img class="pho" style="max-width: 200px;max-height: 200px;ma" src="'+imageUrl+'" id="'+e.file_name+'" />';
                            var img = `<div  onclick="spaSubRowReportControl.che('${e.file_name}')" class="col-md-6 col-sm-6 col-xs-6 " style="padding: 0px 0;text-align: center;margin-top: 5px;margin-bottom: 5px;" >` + ii+
                                '</div>';
                        }
                        str += img;
                    }

                });

                $("#ats").append(str);
            },
            error	:	function(data){
                console.log(data);
            }
        });

        //showPhoto();


        $("#initTableRow").val(clinicid);
        $("#reClinicid").val(clinicid);
        //获取下拉框
        $.ajax({
            url: ctx + "ultrasound/report/getDDictitem",
            type: 'GET',
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function (data) {
                var categorySelect = $("#types").html("");//首先清空select的内容
                categorySelect.append('<option value=""></option>');
                if(data){
                    for(var i=0;i<data.length;i++){
                        categorySelect.append('<option value="'+data[i].templatetype+'">'+data[i].templatetype+'</option>');
                    }
                }
            }
        });
        $('#modal').modal();
    }

    //获取下拉框
    $('#types').change(function () {
        var code = this.value;
        $.ajax({
            url : ctx + "ultrasound/report/getDDictitem",
            type : 'GET',
            dataType : 'json',
            data:{"code":code},
            success:function(data){
                var categorySelect = $("#temps").html("");//首先清空select的内容
                categorySelect.append('<option value=""></option>');
                if(data){
                    for(var i=0;i<data.length;i++){
                        categorySelect.append('<option value="'+data[i].templateid+'">'+data[i].templatename+'</option>');
                    }
                }
            },
            error:function(data){
                console.log(data);
            }
        });
    });

    $('#temps').change(function () {
        var id = this.value;
        $.ajax({
            url : ctx + "/configuration/ultrasound/template/item/" + id,
            type : 'GET',
            dataType : 'json',
            contentType : false,
            processData : false,
            success:function(data){
                $('#description').val(data.temp.description);
                $('#opinions').val(data.temp.opinion)
            },
            error:function(data){
                console.log(data);
            }
        });
    });

    var valid = function () {
        if(!$("#modal #form_report").valid()){
            return false;
        }else {
            return true;
        }
    }

    // 为表单添加校验
    var validateForm = function(){
        $("#modal #form_report").validate({
            errorElement: 'span',
            errorClass: 'validate-error',
            focusInvalid: false,
            ignore: "",
            messages: {
                opinions:{
                    rangelength:'超声提示不能超过1000个字符',
                    required:'超声提示不能为空'
                },
                description:{
                    rangelength:'超声所见不能超过1000个字符',
                    required:'超声所见不能为空'
                },
            },
            rules: {
                opinions: {
                    required: true,
                    rangelength: [0, 1000]
                },
                description: {
                    required: true,
                    rangelength: [0, 1000]
                },
            },
            invalidHandler: function (event, validator) {},
            errorPlacement: function (error, element) {
                element.after(error);
            },
            highlight: function (element) {},
            unhighlight: function (element) {},
            success: function (label) {
                console.log(label);
            },
            submitHandler: function (form) {
                var formObj = document.getElementById("form_report");
                var formData = new FormData(formObj);
                var a=new Array();
                $(".pho").each(function () {
                    var s = $(this).attr("style").indexOf("border");
                    if(s>-1){
                        a.push($(this).attr("src"));
                    }

                });
                formData.set("attid",a);
                $.ajax({
                    url : ctx+"/ultrasound/report/addReport",
                    type : 'POST',
                    data : formData,
                    dataType : 'json',
                    contentType : false,
                    processData : false,
                    success:function(data){
                        if(data.msg == "ok"){
                            $('#modal').modal('hide');
                            $('#myTable').dataTable().fnClearTable(0);
                            $('#myTable').dataTable().fnDraw();
                        }
                    },
                    error:function(data){
                        console.log(data);
                    }
                });
            }
            });
    }


    function imgLoad(callback) {

        var timer = setInterval(function() {
            if(ff){
                 var flag = $("#reSign")[0].complete;
            }else{
                var flag = true;
            }
            if (flag) {
                ff = false;
                clearInterval(timer)
                callback();
            }
        }, 50)
    }

    /*var showPhoto = function (arr) {
        var clinicid = $("#initTableRow").val();
        var str = "";
        $("#photo").show();
        $("#ats").empty();
        //如果有附件 应该直接显示缩略图
        $.ajax({
            type	:	"get",
            url		:	ctx + "ultrasound/spaClinic/getFileListData/" + clinicid,
            dataType:   'json',
            async : false,
            success	:	function(data){
                data = data.data;
                var str = "";
                if(data && data.length > 0){
                    $(data).each(function (i, e) {
                        if(arr && arr.indexOf(e.attachid)>-1){
                            var imageUrl =  ctx + 'ultrasound/spaClinic/getFileData?clinicid=' + clinicid + '&fileName=' + e.actualfilename.substr(0,e.actualfilename.lastIndexOf('.')) + '_min.png';
                            var ii ='<img class="pho" style="max-width: 200px;max-height: 200px;border:2px solid red;" src="'+imageUrl+'" id="'+e.attachid+'" />';
                            var img = `<div  onclick="spaSubRowReportControl.che('${e.attachid}')" class="col-md-6 col-sm-6 col-xs-6 " style="padding: 0px 0;text-align: center;margin-top: 5px;margin-bottom: 5px;" >` + ii+
                                '</div>';
                        }else{
                            var imageUrl =  ctx + 'ultrasound/spaClinic/getFileData?clinicid=' + clinicid + '&fileName=' + e.actualfilename.substr(0,e.actualfilename.lastIndexOf('.')) + '_min.png';
                            var ii ='<img class="pho" style="max-width: 200px;max-height: 200px;ma" src="'+imageUrl+'" id="'+e.attachid+'" />';
                            var img = `<div  onclick="spaSubRowReportControl.che('${e.attachid}')" class="col-md-6 col-sm-6 col-xs-6 " style="padding: 0px 0;text-align: center;margin-top: 5px;margin-bottom: 5px;" >` + ii+
                                '</div>';
                        }

                        str += img;
                    });
                }
                $("#ats").append(str);
            },
            error	:	function(data){
                console.log(data);
            }
        });


    }*/
    var showPhoto = function (arr) {
        var secret_key = "db4139a692060d9416ce2b2ca6156490";
        var tmp = Date.parse(new Date() ).toString();
        tmp = tmp.substr(0,10);
        var clinicid = $("#initTableRow").val();
        var roomId = $("#roomId").val();
        var url = "https://dev.ewisemedical.com/photo";
        var photo_url = "https://dev.ewisemedical.com/file/picture/scan/";
        var sign = hex_md5(roomId+clinicid+tmp+secret_key);
        var strr = "";
        $("#photo").show();
        $("#ats").empty();
        //window.open("https://dev.ewisemedical.com/file/im/auth.html#"+JSON.stringify(res.data));
        //如果有附件 应该直接显示缩略图
        $.ajax({
            type	:	"get",
            url		:	`${url}?sign=${sign}&check_id=${clinicid}&time=${tmp}&room_id=${roomId}`,
            dataType:   'json',
            async : false,
            success	:	function(data){
                if(data.error != '0'){
                    alert("获取图片失败");
                    return false;
                }
                var res = data.data;
                $(res).each(function (i, e) {
                    if(e.check_id == clinicid){
                        if(arr && arr.indexOf(e.file_name)>-1){
                            var imageUrl = photo_url+e.file_name;
                            var ii ='<img class="pho" style="max-width: 200px;max-height: 200px;border:2px solid red;" src="'+imageUrl+'" id="'+e.file_name+'" />';
                            var img = `<div  onclick="spaSubRowReportControl.che('${e.file_name}')" class="col-md-6 col-sm-6 col-xs-6 " style="padding: 0px 0;text-align: center;margin-top: 5px;margin-bottom: 5px;" >` + ii+
                                '</div>';
                        }
                        else{
                            var imageUrl = photo_url+e.file_name;
                            var ii ='<img class="pho" style="max-width: 200px;max-height: 200px;ma" src="'+imageUrl+'" id="'+e.file_name+'" />';
                            var img = `<div  onclick="spaSubRowReportControl.che('${e.file_name}')" class="col-md-6 col-sm-6 col-xs-6 " style="padding: 0px 0;text-align: center;margin-top: 5px;margin-bottom: 5px;" >` + ii+
                                '</div>';
                        }
                        strr += img;
                    }

                });

                $("#ats").append(strr);
            },
            error	:	function(data){
                console.log(data);
            }
        });


    }
    function che(o) {
        console.log(arr+"传过来的参数为"+o)
        if(arr.indexOf(o)>-1){
            var index = arr.indexOf(o);
            if (index > -1) {
               arr.splice(index, 1);
            }
        }else{
            arr.push(o);
        }
        console.log("结果"+arr)
        showPhoto(arr);
    }
    return {
		init: function(rowData) {
		    initSubRowHtml(rowData);
            validateForm();
		},
        addReport:addReport,
        lookupReport:lookupReport,
        returnbackReport:returnbackReport,
        valid:valid,
        showPhoto:showPhoto,
        che:che,
        print:print,
        save:save

	};
}();

function openUrl(clinicId,roomId,type) {
    // sign_value = md5(room_id + check_id + time + secret_key)
     var secret_key = "db4139a692060d9416ce2b2ca6156490";
     var tmp = Date.parse(new Date() ).toString();
     tmp = tmp.substr(0,10);
     var url = "https://dev.ewisemedical.com/photo";
     var sign_value = hex_md5(roomId+clinicId+tmp+secret_key);
     $("#roomId").val(roomId);
     $.ajax({
         url:url,
         method:"PUT",
         data:{
             "room_id":roomId,
             "check_id":clinicId,
             "service":"scan",
             "type":type,
             "time":tmp,
             "sign":sign_value
         },
         success:function (res) {
             console.log(res)
             if(res.error == '0'){
                 window.open("https://dev.ewisemedical.com/file/im/auth.html#"+JSON.stringify(res.data));
             }else{
                 console.log(res)
             }


            },
         error:function (data) {
             console.log(data)
         },
         dataType : 'json'
     })

    return false;
}
