var datetimeUtils = function () {
	var addZero = function (data) {
		data += "";
		if(data != ''){
			if(data.length < 2){
				data = "0" + data;
			}
		}
		return data;
	}
	return {
		'strToDate' : function (str) {
			strArr = str.split(/-| |:/g);
			return new Date(strArr[0],strArr[1] - 1,strArr[2],strArr[3],strArr[4],strArr[5]);
		},
		'datetimeToDate' : function (datetime) {
			return datetime.getFullYear() + '-' + addZero(datetime.getMonth() + 1) + '-' + addZero(datetime.getDate());
		},
		'datetimeToChineseDate' : function (datetime) {
			return datetime.getFullYear() + '年' + addZero(datetime.getMonth() + 1) + '月' + addZero(datetime.getDate()) + '日';
		},
		'datetimeToChineseDatetime' : function (datetime) {
			return datetime.getFullYear() + '年' + addZero(datetime.getMonth() + 1) + '月' + addZero(datetime.getDate()) + '日' + addZero(datetime.getHours()) + ":" + addZero(datetime.getMinutes());
		},
		'datetimeToFormatDatetime' : function(datetime) {
		    return datetime.getFullYear() + "-" + addZero(datetime.getMonth()+1) + "-" + addZero(datetime.getDate()) + " " + addZero(datetime.getHours()) + ":" + addZero(datetime.getMinutes()) + ":" + addZero(datetime.getSeconds());
		}
	};
}();