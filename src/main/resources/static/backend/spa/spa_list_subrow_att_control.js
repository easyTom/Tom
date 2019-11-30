var spaSubRowAttControl = function() {
	//var ecgPhoto; 假如需要拼接 这样是错误的类型没指定 写在外面不行 每次没清空
	//var ecgPhoto = "";
    var handleAdd = function(result) {
        var bscId = result.bscId;
        $("#spa_attchments_"+bscId).empty();
        tomUploadControl.min("GET",bscId,ctx + "api/getFileListData/" + bscId,"spa_attchments_");

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
