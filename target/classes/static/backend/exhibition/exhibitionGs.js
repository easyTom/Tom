var exhibition = function(){
    var regionName;
    var mapData;
    var lineData = [];
    var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';
    const cityData = ["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏回族自治州","甘南藏族自治州"];
    var color = ['red'];
    var geoCoordMap = {
        "兰州市": [103.823305441,36.464225525],
        "嘉峪关市": [98.2816345853,39.8023973267],
        "金昌市": [102.208126263,38.5160717995],
        "白银市": [104.171240904,37.2466817062],
        "天水市": [105.736931623,34.5843194189],
        "武威市": [103.240147343,38.6331721429],
        "张掖市": [100.459891869,38.939320297],
        "平凉市": [106.688911157,35.55011019],
        "酒泉市": [98.5084145062,39.7414737682],
        "庆阳市": [107.644227087,36.5268007545],
        "定西市": [104.626637601,35.5860562418],
        "陇南市": [105.334573406,33.3944799729],
        "临夏回族自治州": [103.215249178,35.5985143488],
        "甘南藏族自治州": [102.917442486,34.9922111784],
        "外省": [0,0]
    };
    var mapMap = [
    {name:"兰州市",cd:620100},
        {name:   "嘉峪关市",cd:620200},
            {name:    "金昌市",cd:620300},
                {name:  "白银市",cd:620400},
                    {name: "天水市",cd:620500},
                        {name:"武威市",cd:620600},
                            {name:"张掖市",cd:620700},
                                {name:"平凉市",cd:620800},
                                    {name:"酒泉市",cd:620900},
                                        {name:"庆阳市",cd:621000},
                                            {name:"定西市",cd:621100},
                                                {name:"陇南市",cd:621200},
                                                    {name:"临夏回族自治州",cd:622900},
                                                        {name:"甘南藏族自治州",cd:623000}
    ];
    var convertData = function (data) {
        var res = [];
        if(data){
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
        }

        return res;
    };

    var convertLineData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord
                }, {
                    coord: toCoord
                }]);
            }
        }
        return res;
    };

    var series22 = [];

    function ListSum(cityName,type) {
        if(!cityName){
            cityName =  $("#ccity").val();
        }
        $.ajax({
            type : "get",
            url : reurl+"/findSum",
            data : {"cityName":cityName},
            dataType : "json", //返回数据形式为json
            success : function(result) {
                var data = result.data;
                if(data){
                    var list_model = $("#list_model").html("");
                    for(var i = 0; i<data.length; i++){
                        var industry = data[i];
                        console.log(industry)
                        var typeName;
                        switch (industry.type){
                            case 'hz':typeName="远程会诊"
                                break;
                            case 'xd':typeName="远程心电"
                                break;
                            case 'yx':typeName="远程影像"
                                break;
                            case 'jy':typeName="远程教育"
                                break;
                        }
                        if(type){
                            if(`${industry.type}` == type){
                                list_model.append(
                                    `<li>
                            <div class="li1"><span style=>${industry.sndDate}</span></div>
                            <div class="li2">
                                <p >${industry.siteName}</p>
                                <p>${industry.rcvSiteName}</p>
                            </div>
                            <div class="li3">
                                <p><span class="${industry.type}">${typeName}</span></p>
                                <p><b>${industry.patientName}</b></p>
                            </div>
                        </li>`
                                );
                            }
                        }
                        else{

                        list_model.append(
                            `<li>
                            <div class="li1"><span style=>${industry.sndDate}</span></div>
                            <div class="li2">
                                <p >${industry.siteName}</p>
                                <p>${industry.rcvSiteName}</p>
                            </div>
                            <div class="li3">
                                <p><span class="${industry.type}">${typeName}</span></p>
                                <p><b>${industry.patientName}</b></p>
                            </div>
                        </li>`
                        );

                        }
                        if(data.length>5){
                        }

                    }
                }
            },
            error : function(errorMsg) {
            }
        })
    }


    //地图渲染位置
    var myChartMap = echarts.init(document.getElementById('map'));
    //地图配置项
    var optionMap={
        title: {
            text: "甘肃省",
            textStyle:{
                color:'#fff'
            },
            left:'70%'
        },
        geo: {
            map: '甘肃省',
            goDown: true,
            label: {
                emphasis: {
                    show:true
                },
                align:'right',
                normal: {
                    show: true,
                    color: "#fff",
                    fontSize:13,
                    //显示地名
                    formatter: function(params, t) {
                        var cityName = params.name;
                        return  cityName ;
                    }
                },
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    //边框颜色
                    borderColor: 'rgba(147, 235, 248, 1)',
                    //阴影效果
                    shadowColor: 'rgba(128, 217, 248, 1)',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                },
                emphasis: {
                    areaColor: '#2B91B7'
                },
            },
        },
        series : []
        ,
        layoutCenter: ['50%', '50%'],
        // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
        layoutSize: 560
    };

    //通过获取json得到地图
    var mapload = function(cityName){
        let cityPinyin = '';
        if(!cityName){
            cityName = '甘肃省';
            cityPinyin = 'gansu';
        }
        for (var o in mapMap){
            if(mapMap[o].name == cityName){
                cityPinyin = mapMap[o].cd;
            }
        }
        var uploadedDataURL = ctx+"backend/echarts/map/json/province/"+cityPinyin+".json";
        $.getJSON(uploadedDataURL, function(geoJson) {
            echarts.registerMap(cityName, geoJson);
            if(cityName!='甘肃省'){
                optionMap.title.text=cityName;
                optionMap.geo.map=cityName;
                optionMap.tooltip=[];

            }else{
                optionMap.title.text='甘肃省';
                optionMap.geo.map='甘肃省';
                optionMap.layoutSize=560;
                optionMap.layoutCenter="['50%', '50%']"
            }

            myChartMap.setOption(optionMap);
        });
    }
    //总计统计
    function modulesCount(cityName,year){

        $.ajax({
            type : "get",
            url : reurl+"/toNumber",
            data : {"cityName":cityName,"year":year},
            dataType : "json", //返回数据形式为json
            success : function(data) {
                if(data){
                    $("#sum_hz").html(data[0]);
                    $("#sum_yx").html(data[1]);
                    $("#sum_xd").html(data[2]);
                    $("#sum_jy").html(data[3]);
                }
            },
            error : function(errorMsg) {
            }
        })

    }

    //地区列表
    function cityCount(regionName,year) {
        console.log('当前选择的地区是'+regionName);
        $.ajax({
            type : "get",
            url : reurl+"/cityCount",
            data : {"city":regionName,"year":year},
            dataType : "json", //返回数据形式为json
            success : function(result) {
                var data = result.data;
                var table = $("#tbodyCount").html("");
                if(data){
                    var cName = "<th></th>";
                    var hz = '<td>远程会诊</td>';
                    var yx = '<td>远程影像</td>';
                    var xd = '<td>远程心电</td>';
                    var jy = '<td>远程教育</td>';
                    for(var i=0;i<data.length;i++){
                        var edu = data[i].eduCount;
                        if(!edu){
                            edu = 0;
                        }
                        cName += `<th>${data[i].city}</th>`;
                        hz += `<td class="zt">${data[i].medCount}</td>`;
                        yx += `<td class="zt">${data[i].dicomCount}</td>`;
                        xd += `<td class="zt">${data[i].ecgCount}</td>`;
                        jy += `<td class="zt">${edu}</td>`;
                    }
                    table.append(`<tr>${cName}</tr>`);
                    table.append(`<tr>${hz}</tr>`);
                    table.append(`<tr>${yx}</tr>`);
                    table.append(`<tr>${xd}</tr>`);
                    table.append(`<tr>${jy}</tr>`);
                }
            },
            error : function(errorMsg) {
            }
        })
    }

    var maploads = function(cityName){
        var hznum=[];
        var yxnum=[];
        var xdnum=[];
        var jynum=[];
        $.ajax({
            type : "get",
            async : false, //同步执行
            url : reurl+"/findMonitor",
            data : {"cityName":cityName},
            dataType : "json", //返回数据形式为json
            success : function(result) {
                if (result.resultCode == '200') {
                    hznum = result.data[0];
                    yxnum = result.data[1];
                    xdnum = result.data[2];
                    jynum = result.data[3];
                    mapData = result.data[4];
                }
            },
            error : function(errorMsg) {
            }
        })
        var toolTipData=[];
        for(var i=0;i<cityData.length;i++){
            var hzshu=0;
            var yxshu=0;
            var xdshu=0;
            var jyshu=0;
            if(hznum){
                for(var k=0;k<hznum.length;k++){
                    if(cityData[i]==hznum[k].name){
                        hzshu = hznum[k].value;
                    }
                }
            }
            if(yxnum){
                for(var k=0;k<yxnum.length;k++){
                    if(cityData[i]==yxnum[k].name){
                        yxshu = yxnum[k].value;
                    }
                }
            }
            if(xdnum){
                for(var k=0;k<xdnum.length;k++){
                    if(cityData[i]==xdnum[k].name){
                        xdshu = xdnum[k].value;
                    }
                }
            }
            if(jynum){
                for(var k=0;k<jynum.length;k++){
                    if(cityData[i]==jynum[k].name){
                        jyshu = jynum[k].value;
                    }
                }
            }
            toolTipData.push({
                name:cityData[i],
                value:[
                    {
                        name:"远程会诊",
                        value:hzshu
                    },
                    {
                        name:"远程影像",
                        value:yxshu
                    },
                    {
                        name:"远程心电",
                        value:xdshu
                    },
                    {
                        name:"远程教育",
                        value:jyshu
                    }
                ]
            });
        }
        var year = $("#da .on").val();
        $.ajax({
            type : "get",
            async : false, //同步执行
            url : reurl+"/findLines",
            data : {"year":year},
            dataType : "json", //返回数据形式为json
            success : function(result) {
                var result = result.data;
                lineData = [];
                if (result) {
                    for(let i in result){
                        lineData.push([{name:result[i].name},{name:result[i].rcv==null?'外省':result[i].rcv,value:result[i].value}]);
                    }
                }
            },
            error : function(errorMsg) {
            }
        })
                if(mapData){
            optionMap.series=[
                {
                    name: '远程影像',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(mapData),
                    // symbolSize:15,
                    symbolSize: function (val) {
                        return val[2] / 1;
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ebe300'
                        }
                    }
                },
                {
                    name: '远程会诊',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(mapData.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 14)),
                     symbolSize: 4,
                   /* symbolSize: function (val) {
                        return val[2] / 1;
                    },*/
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'fill',
                        scale:8,

                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: '#ebe300',
                            shadowBlur: 10,
                            shadowColor: '#05C3F9'
                        }
                    },
                    zlevel: 1
                },
                {
                    name: '远程影像',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(mapData.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 14)),
                     symbolSize: 4,
                    /*symbolSize: function (val) {
                        return val[2] / 1;
                    },*/
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'fill',
                        scale:8,

                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: '#ebe300',
                            shadowBlur: 10,
                            shadowColor: '#05C3F9'
                        }
                    },
                    zlevel: 1
                },
            ]

        }
                if(lineData  && (cityName == ''||cityName == null)){
                     series22 = [];
                    [
                        ['111', lineData],
                    ].forEach(function(item, i) {

                        series22.push({
                            type: 'lines',
                            zlevel: 1,
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0.7,
                                color: '#fff',
                                symbolSize: 3
                            },
                            lineStyle: {
                                normal: {
                                    color: color,
                                    width: 0,
                                    curveness: 0.2
                                }
                            },
                            data: convertLineData(item[1])
                        }, {
                            //name: item[1][i][0].name +' → '+item[1][i][1].name,
                            type: 'lines',
                            zlevel: 2,
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0,
                                symbol: planePath,
                                symbolSize: 15
                            },
                            lineStyle: {
                                normal: {
                                    color: color,
                                    width: 1,
                                    opacity: 0.4,
                                    curveness: 0.2
                                }
                            },
                            data: convertLineData(item[1])
                        }, {
                            //name: item[1][i][0].name +' → '+item[1][i][1].name,
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}'
                                }
                            },
                            symbolSize: function(val) {
                                return val[2] / 80;
                            },
                            itemStyle: {
                                normal: {
                                    color: color
                                }
                            },
                            data: item[1].map(function(dataItem) {

                                return {
                                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
                                    type:'line'
                                };

                            })
                        });
                    });
                    optionMap.series = optionMap.series.concat(series22);
                }
        optionMap.tooltip={
            trigger: 'item',
            formatter: function(params) {
                console.log(params)
                if (typeof(params.value)[2] == "undefined") {
                    var toolTiphtml = ''
                    for (var i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + ':<br>'
                            for (var j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + '：' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    console.log(toolTiphtml)
                    return toolTiphtml;
                } else {
                    var toolTiphtml = ''
                    for (var i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + ':<br>'
                            for (var j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + '：' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    return toolTiphtml;
                }
            }
        }

        myChartMap.setOption(optionMap,true);

    }

    var siteSum = function(cityName){
        $.ajax({
            type : "get",
            url : reurl+"/findSiteLevel",
            data : {"cityName":cityName},
            dataType : "json", //返回数据形式为json
            success : function(result) {
                var sum = 0;
                var sumAll = 0;
                if (result.resultCode == '200') {
                    var data = result.data;
                    console.log(data)
                    if(data){
                        for( let i in data){
                            switch (data[i].name){
                               case "省级":
                                   $(".js").text(data[i].value);
                                   sumAll+=data[i].value;
                                   break;
                               case "地市级":
                                    sum+=data[i].value;
                                   sumAll+=data[i].value;
                                    break;
                               case "区县级":
                                    sum+=data[i].value;
                                   sumAll+=data[i].value;
                                    break;
                               case "乡镇卫生院/社区中心":
                                   $(".xz").text(data[i].value);
                                   sumAll+=data[i].value;
                                    break;
                               case "村卫生室":
                                   $("#cs").text(data[i].value);
                                   sumAll+=data[i].value;
                                    break;
                            }

                        }
                        $(".ej").text(sum);
                        $("#alll").text(sumAll);
                    }
                }
            },
            error : function(errorMsg) {
            }
        })
    }

    myChartMap.on('click', function (params) {
        var cityName = params.name;
        var flag = true;
        for (var o in mapMap){
            if(mapMap[o].name == cityName){
                flag = false;
            }
        }
        if (flag)
            return false;
        myChartMap.setOption({
            title: {
                text:cityName,
                textStyle:{
                    color:'#fff'
                },
                left:'70%'
            }
        });
        regionName = cityName;
        $("#ccity").val(cityName);
        cityCount(regionName);
        var year = $("#da .on").val();
        console.log(year);
        modulesCount(cityName,year);
        mapload(cityName);
        maploads(cityName);
        siteSum(cityName);
        params.event.event.stopPropagation();
    });

    $("#map").click(function (params) {
        regionName=null;
        myChartMap.setOption({
            title: {
                text:"甘肃省",
                textStyle:{
                    color:'#fff'
                },
                left:'70%'
            }
        });
        $("#ccity").val('');
        cityCount();
        modulesCount();
        mapload();
        ListSum();
        maploads();
        params.event.event.stopPropagation();
    });
    return {
        init: function () {
            //滚动 跑马灯(传入city,type)
            ListSum();
            //加载地图json(传入cityName)
            mapload();
            //列表显示下级城市(传入cityName,year判断条件)
            cityCount();
            //闪烁点(无参数)
            maploads();
            //业务统计
            modulesCount();
            //exhibitionPie.doctorLevel();
            $("#ccity").val('');
            siteSum();
        },
        changeByDate:function (date) {
            cityCount($("#ccity").val(),date);
            modulesCount($("#ccity").val(),date);
        },
        ListSum:ListSum,
    }
}();
function fnW(str) {
    var num;
    str >= 10 ? num = str : num = "0" + str;
    return num;
}
//获取当前时间
var timer = setInterval(function () {
    var date = new Date();
    var year = date.getFullYear(); //当前年份
    var month = date.getMonth(); //当前月份
    var data = date.getDate(); //天
    var hours = date.getHours(); //小时
    var minute = date.getMinutes(); //分
    var second = date.getSeconds(); //秒
    var day = date.getDay(); //获取当前星期几
    var ampm = hours < 12 ? 'am' : 'pm';
    $('.head_time').html('<span>' + year + '/' + (month + 1) + '/' + data + '</span>'+'   '+fnW(hours) + ":" + fnW(minute) + ":" + fnW(second));

}, 1000)
jQuery(document).ready(function(){
    exhibition.init();
});