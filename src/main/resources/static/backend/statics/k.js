var Echarts_K = function () {
    
    const title =  '数据走势图';
    const name1 = '蓝卫通相关';
    const name2 = '知识点相关';
    
    var getDataList = function () {
        return  new Promise(function (resolve, reject) {
            $.ajax({
                url: ctx+'tom/statics/getDataK',
                method: 'POST',
                success: function (response) {
                    if (response) {
                        resolve(response.list);
                    }else{
                        reject(new Error('result null!!!'));
                    }
                },
                error: function (error) {
                    reject(error);
                    console.error(error);
                }
            });
        });
    }
    var initCharts = function () {
        /*基于准备好的dom，初始化echarts实例*/
        var myChart = echarts.init(document.getElementById('main'));

        option = {
            title: {    //标题
                text: title,
                left: 0
            },
            tooltip: {  //提示框
                trigger: 'axis',    //触发类型：坐标轴触发
                axisPointer: {  //坐标轴指示器配置项
                    type: 'cross'   //指示器类型，十字准星
                }
            },
            legend: {   //图例控件，点击图例控制哪些系列不现实
                data: [name1, name2]
            },
            grid: {     //直角坐标系
                show: true,
                left: '10%',    //grid组件离容器左侧的距离
                right: '10%',
                bottom: '15%',
                //backgroundColor:'#ccc'
            },
            xAxis: {
                type: 'category',   //坐标轴类型，类目轴
                data: [],
                //scale: true,  //只在数字轴中有效
                boundaryGap: false,    //刻度作为分割线，标签和数据点会在两个刻度上
                axisLine: {onZero: false},
                splitLine: {show: false},   //是否显示坐标轴轴线
                //splitNumber: 20,    //坐标轴的分割段数，预估值，在类目轴中无效
                min: 'dataMin', //特殊值，数轴上的最小值作为最小刻度
                max: 'dataMax'  //特殊值，数轴上的最大值作为最大刻度
            },
            yAxis: {
                scale: true,    //坐标刻度不强制包含零刻度
                splitArea: {
                    show: true  //显示分割区域
                }
            },
            //下面拖动部分
            dataZoom: [     //用于区域缩放
                {
                    filterMode: 'filter',    //当前数据窗口外的数据被过滤掉来达到数据窗口缩放的效果  默认值filter
                    type: 'inside', //内置型数据区域缩放组件
                    start: 0,      //数据窗口范围的起始百分比
                    end: 100        //数据窗口范围的结束百分比
                },
                {
                    show: true,
                    type: 'slider', //滑动条型数据区域缩放组件
                    y: '90%',
                    start: 0,
                    end: 100
                }
            ],
            series: [   //图表类型
                /*  {
                      name: '日K',
                      type: 'candlestick',    //K线图
                      data: data0.values,     //y轴对应的数据

                      ////////////////////////图标标注/////////////////////////////
                      markPoint: {    //图表标注
                          label: {    //标注的文本
                              normal: {   //默认不显示标注
                                  show: true,
                                  //position:['20%','30%'],
                                  formatter: function (param) {   //标签内容控制器
                                      return param != null ? Math.round(param.value) : '';
                                  }
                              }
                          },
                          data: [     //标注的数据数组
                              {
                                  name: 'XX标点',
                                  coord: ['2013/5/31', 2300], //指定数据的坐标位置
                                  value: 2300,
                                  itemStyle: {    //图形样式
                                      normal: {color: 'rgb(41,60,85)'}
                                  }
                              },
                              {
                                  name: 'highest value',
                                  type: 'max',    //最大值
                                  valueDim: 'highest'     //在highest维度上的最大值 最高价
                              },
                              {
                                  name: 'lowest value',
                                  type: 'min',
                                  valueDim: 'lowest'  //最低价
                              },
                              {
                                  name: 'average value on close',
                                  type: 'average',
                                  valueDim: 'close'   //收盘价
                              }
                          ],
                          tooltip: {      //提示框
                              formatter: function (param) {
                                  return param.name + '<br>' + (param.data.coord || '');
                              }
                          }
                      },
                      markLine: {
                          symbol: ['none', 'none'],   //标线两端的标记类型
                          data: [
                              [
                                  {
                                      name: 'from lowest to highest',
                                      type: 'min',    //设置该标线为最小值的线
                                      valueDim: 'lowest', //指定在哪个维度上的最小值
                                      symbol: 'circle',
                                      symbolSize: 10, //起点标记的大小
                                      label: {    //normal默认，emphasis高亮
                                          normal: {show: false},  //不显示标签
                                          emphasis: {show: false} //不显示标签
                                      }
                                  },
                                  {
                                      type: 'max',
                                      valueDim: 'highest',
                                      symbol: 'circle',
                                      symbolSize: 10,
                                      label: {
                                          normal: {show: false},
                                          emphasis: {show: false}
                                      }
                                  }
                              ],

                              {
                                  name: 'min line on close',
                                  type: 'min',
                                  valueDim: 'close'
                              },
                              {
                                  name: 'max line on close',
                                  type: 'max',
                                  valueDim: 'close'
                              }
                          ]

                      }
                  },*/
            ]
        };

        getDataList().then(function (data) {
            let item =  [{
                name: name1,
                type: 'line',
                data: fomartDataList(data,true),
                smooth: true,
                //画的线的属性
                lineStyle: {
                    normal: {opacity: 2.5}
                },
                //画的线上显示数值
                itemStyle : { normal: {label : {show: true}}}
            },{
                name: name2,
                type: 'line',
                data: fomartDataList(data,false),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 2.5}
                },
                itemStyle : { normal: {label : {show: true}}}
            }];
            //Y轴数据
            option.series = item;
            //X轴数据
            option.xAxis.data = splitData(data);
            // 使用刚指定的配置项和数据显示图表
            myChart.setOption(option);
        }).catch( a => console.log(a));


        //返回数组中的日期
        function splitData(rawData) {
            var categoryData = [];
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].time);
            }
            return categoryData;
        }

        //返回申请和报告
        function fomartDataList(data,flag) {
            var result = [];
            for (var i = 0, len = data.length; i < len; i++) {
                if(flag){
                    result.push(data[i].c1);
                }else{
                    result.push(data[i].c2);
                }
            }
            return result;
        }
    }

    return {
        init: function () {
            initCharts();
        }
    };

}();

jQuery(document).ready(function() {
    Echarts_K.init();
});
