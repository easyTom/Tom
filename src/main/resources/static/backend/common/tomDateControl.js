var dateControl = function () {

    //获取上周起始时间结束时间、下周起始时间结束时间开始时间和本周起始时间结束时间;（n为7的倍数上周7本周0下周-7）
    var getWeekByTime = function (n) {
        var now = new Date();
        var day = now.getDay();
        //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
        if (day !== 0) {
            n = n + (day - 1);
        } else {
            n = n + day;
        }
        now.setDate(now.getDate() - n);
        var  year = now.getFullYear();
        var  month = now.getMonth() + 1;
        var  date = now.getDate();
        return year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
    }

    var getDayByTime = function (n) {
        var dd = new Date();
        dd.setDate(dd.getDate() - n);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d ;
    };
    var getMonthByTime = function (n) {
        var dd = new Date();
        dd.setMonth(dd.getMonth()-n)
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1 ) : dd.getMonth() + 1 ;
        return y + "-" + m + "-" + "01" ;
    };
    var getYearByTime = function (n) {
        var dd = new Date();
        dd.setFullYear(dd.getFullYear()-n)
        var y = dd.getFullYear();
        return y + "-" + "01" + "-" + "01" ;
    };

    return {
        getWeek:getWeekByTime,
        getMonth:getMonthByTime,
        getYear:getYearByTime,
        getDay:getDayByTime
    }

}();