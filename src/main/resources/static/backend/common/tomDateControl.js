var dateControl = function () {

    function formatDate(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();

        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday + " 00:00:00");
    }

    var now = new Date(); //当前日期
    var nowDayOfWeek = now.getDay() -1; //今天本周的第几天
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth(); //当前月
    var nowYear = now.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0; //

    //获得本周的周一
    function getWeekStartDate() {
        var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        return formatDate(weekStartDate);
    }

    //获得本周的周日
    function getWeekEndDate() {
        var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
        return formatDate(weekEndDate);
    }

    return{
        getWeekEndDate:getWeekEndDate,
        getWeekStartDate:getWeekStartDate
    }
}();