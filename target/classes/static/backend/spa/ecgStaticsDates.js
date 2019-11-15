//搜索区域
$("#btn_search").on('click',function(){
    TableDatatablesManaged.init();
});
//搜索区域
$("#btn_search_today").on('click',function(){
    var date = (new Date()).Format("yyyy-MM-dd");
    console.log(date)
    $('#from').val(date);
    $('#to').val(date);
    TableDatatablesManaged.init();
});
//搜索区域
$("#btn_search_week").on('click',function(){
    var bdate = (new Date()).Format("yyyy-MM-dd");
    var date = getBeforeDate(-7);
    $('#from').val(date);
    $('#to').val(bdate);
    TableDatatablesManaged.init();
});
//搜索区域
$("#btn_search_month").on('click',function(){
    var bdate = (new Date()).Format("yyyy-MM-dd");
    var date = getBeforeDate(-30);
    $('#from').val(date);
    $('#to').val(bdate);
    TableDatatablesManaged.init();
});
//搜索区域
$("#btn_search_year").on('click',function(){
    var bdate = (new Date()).Format("yyyy-MM-dd");
    var date = getBeforeDate(-365);
    $('#from').val(date);
    $('#to').val(bdate);
    TableDatatablesManaged.init();
});


Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function getBeforeDate(n) {//n为你要传入的参数，当前为0，前一天为-1，后一天为1
    var date = new Date();
    var year, month, day;
    date.setDate(date.getDate() + n);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    var s = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
    return s;
}