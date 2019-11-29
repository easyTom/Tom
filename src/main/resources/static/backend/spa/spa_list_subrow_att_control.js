var spaSubRowAttControl = function() {
	//var ecgPhoto; 假如需要拼接 这样是错误的类型没指定 写在外面不行 每次没清空
	//var ecgPhoto = "";
    var handleAdd = function(result) {
        var bscId = result.bscId;
        $("#spa_attchments_"+bscId).empty();
        if(result.haveAtt){
            //如果有附件 应该直接显示缩略图
            $.ajax({
                type	:	"get",
                url		:	ctx + "ultrasound/spaClinic/getFileListData/" + bscId,
                dataType:   'json',
                async : false,
                success	:	function(data){
                    data = data.data;
                    var str = "";
                    if(data && data.length > 0){
                        $(data).each(function (i, e) {
                            var url = ctx + "ultrasound/spaClinic/getFileData?bscId=" + bscId + "&fileName=" + e.actualfilename;
                            var imageUrl =  ctx + 'ultrasound/spaClinic/getFileData?bscId=' + bscId + '&fileName=' + e.actualfilename.substr(0,e.actualfilename.lastIndexOf('.')) + '_min.png';
                            var ii ='<img onload="ecgMagnifyControl.AutoSize(this,100,100)" src="'+imageUrl+'" />';
                            var img = '<div class="col-md-6 col-sm-6 col-xs-6 " style="padding: 0px 0;height: 130px" >' +
                                    '<a style="max-height:120px;padding: 0px 0;display:block; width:100px; height:100px"  data-magnify  href="' + url + '"   class="thumbnail">' +
                                ii+
                                '</a>' +
                                '</div>';

                            str += img;
                        });
                    }
                    $("#spa_attchments_"+bscId).append(str);
                    ecgMagnifyControl.init(true);
                },
                error	:	function(data){
                    console.log(data);
                }
            });


        }
            var att = `<a class="btn btn-sm blue" style="text-decoration:none;" href="javascript:tomUploadControl.init('photo','${bscId}','bscId')"><i class="fa fa-upload"></i> 上传附件 </a>`;
            $("#att_"+bscId).append(att);
          /*  $(".magnify-button magnify-button-close").click();
            $(".magnify-modal").modal({backdrop: true, keyboard: true});*/
    }


    return {
		init: function(rowData) {
		    handleAdd(rowData);
		},
	};
}();
