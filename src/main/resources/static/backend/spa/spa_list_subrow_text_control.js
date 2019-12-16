var spaSubRowTextControl = function() {
	//var ecgPhoto; 假如需要拼接 这样是错误的类型没指定 写在外面不行 每次没清空
	//var ecgPhoto = "";
    var handleAdd = function(rowData) {
    			    var id = rowData.id;
				    $("#seriesPics_"+id).html(`<div>${rowData.text}</div>`);
				}
	return {
		init: function(rowData) {
		    handleAdd(rowData);

		}
	};
}();
