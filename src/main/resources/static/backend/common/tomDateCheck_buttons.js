    var count = 0;
    var day = 0;
    var week = 0;
    var month = 0;
    var year = 0;
    var ele = ".tab-content button";
    $(ele).click(function () {
        var id = $(this)[0].parentElement.id;
        var name = $(this)[0].name;
        const [from, to] = getDateByEle(id, name);
        console.log(from + "到" + to);
        $("#from").val(from);
        $("#to").val(to);
        uiControl.init();
    });
    $("#daya").click(function () {
        const [from, to] = getDateByEle("day", "btn_search_today");
        $("#from").val(from);
        $("#to").val(to);
        uiControl.init();
    });
    $("#weeka").click(function () {
        const [from, to] = getDateByEle("week", "btn_search_today");
        console.log(from + "到" + to);
        $("#from").val(from);
        $("#to").val(to);
        uiControl.init();
    });
    $("#montha").click(function () {
        const [from, to] = getDateByEle("month", "btn_search_today");
        console.log(from + "到" + to);
        $("#from").val(from);
        $("#to").val(to);
        uiControl.init();
    });
    $("#yeara").click(function () {
        const [from, to] = getDateByEle("year", "btn_search_today");
        console.log(from + "到" + to);
        $("#from").val(from);
        $("#to").val(to);
        uiControl.init();
    });

    var getDateByEle = function (id, name) {
        let fromDate = "";
        let toDate = "";
        switch (id) {
            case "day":
                switch (name) {
                    case "btn_search_before":
                        day += 1;
                        break;
                    case "btn_search_today":
                        day = 0;
                        break;
                    case "btn_search_after":
                        day -= 1;
                        break;
                }
                fromDate = dateControl.getDay(day);
                toDate = dateControl.getDay(day - 1);
                break;
            case "week":
                switch (name) {
                    case "btn_search_before":
                        week += 7;
                        break;
                    case "btn_search_today":
                        week = 0;
                        break;
                    case "btn_search_after":
                        week -= 7;
                        break;
                }
                fromDate = dateControl.getWeek(week);
                toDate = dateControl.getWeek(week - 7);
                break;
            case "month":
                switch (name) {
                    case "btn_search_before":
                        month += 1;
                        break;
                    case "btn_search_today":
                        month = 0;
                        break;
                    case "btn_search_after":
                        month -= 1;
                        break;
                }
                fromDate = dateControl.getMonth(month);
                toDate = dateControl.getMonth(month - 1);
                break;
            case "year":
                switch (name) {
                    case "btn_search_before":
                        year += 1;
                        break;
                    case "btn_search_today":
                        year = 0;
                        break;
                    case "btn_search_after":
                        year -= 1;
                        break;
                }
                fromDate = dateControl.getYear(year);
                toDate = dateControl.getYear(year - 1);
                break;
            default:
                return false;
        }
        return [fromDate, toDate];
    }
    //搜索区域
    $("#btn_search").on('click',function(){
        uiControl.init();
    });