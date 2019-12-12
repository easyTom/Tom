var spaSubRowAttControl = function() {
	//var ecgPhoto; 假如需要拼接 这样是错误的类型没指定 写在外面不行 每次没清空
	//var ecgPhoto = "";
    var handleInit = function(result) {
        var id = result.id;
        $("#spa_attchments_"+id).empty();
        tomUploadControl.min("GET",id,ctx + "api/getFileListData/" + id,"spa_attchments_");

        var att = `<a class="btn btn-sm blue" style="text-decoration:none;" href="javascript:tomUploadControl.init('','${id}','id')"><i class="fa fa-upload"></i> 上传文件 </a>`;
            $("#att_"+id).append(att);
    }
    var handleDel = function(name) {
        tomUploadControl.del(name,ctx + "api/getFileListData/",);
    }


    return {
		init: function(rowData) {
            handleInit(rowData);
		},
        handleDel:handleDel
	};
}();
