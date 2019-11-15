//格式化日期
function formatDate(time){
	var date = new Date(time);
	return date.getFullYear() + "-" + doFormat(date.getMonth()+1) + "-" + doFormat(date.getDate()) + " " + doFormat(date.getHours()) + ":" + doFormat(date.getMinutes()) + ":" + doFormat(date.getSeconds());
}

// 不足两位则前面补0
function doFormat(data){
	data += "";
	if(data.length == 1){
		data = "0" + data;
	}
	return data;
}