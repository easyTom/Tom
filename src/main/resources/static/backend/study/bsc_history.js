var uiControl = function () {
    var typeList = ["修改BUG","新增功能","部署更新","远程相关"];
    //参数：value数组中的当前项, index当前项的索引, array原始数组；
    var getAllByType = function (type,text,from,to) {
        return  new Promise(function (resolve, reject) {
            $.ajax({
                url: ctx+'tom/bsc/getAllByType',
                method: 'POST',
                data: {"type":type,"text":text,"from":from,"to":to},
                success: function (response) {
                    if (response.data) {
                        resolve(response.data);
                    }else{
                        reject(new Error('result null!!!'));
                    }
                },
                error: function (error) {
                    reject(error);
                    console.error(error);
                }
            });
        })
    }
    var init = function (text,from,to) {
        $("#uiDom").html("");
        typeList.map(function (item,index,array ) {
            getAllByType(item,text,from,to)
                .then(function (result) {
                    var list = "";
                    result.map(function (result) {
                        list+=` <div class="timeline-item">
                                            <div class="timeline-badge" style="height: 80px;line-height:20px;text-align: center;padding-right: 0px;border:  1px solid red;background-color: #f5f6fa">${result.name}</div>
                                            <div class="timeline-body">
                                                <div class="timeline-body-arrow">
                                                </div>
                                                <div class="timeline-body-head">
                                                    <div class="timeline-body-head-caption">
                                                        <a href="javascript:;" class="timeline-body-title font-blue-madison">${result.createBy}</a>
                                                        <span class="timeline-body-time font-grey-cascade">${datetimeUtils.datetimeToFormatDatetime(new Date(result.createTime))}</span>
                                                    </div>
                                                </div>
                                                <div class="timeline-body-content">
                                                    <span class="font-grey-cascade">
                                                     ${result.text}
                                                </div>
                                            </div>
									    </div>`;
                    });
                    var ui=`<div class="col-lg-3 col-md-3 col-sm-3 col-xs-6" style="max-height: 600px;overflow-y:auto ">
								<div class="portlet blue box">
									<div class="portlet-title">
										<div class="caption">
											<i class="fa fa-cogs"></i>${item}
										</div>
										<div class="tools">
											<a href="javascript:;" class="collapse" data-original-title="" title="">
											</a>
										</div>
									</div>
									<div class="portlet-body" ${item === '远程相关'?'style="display: none;"':''}  >
									<div class="timeline" id="list">
									   ${list}
									</div>
								</div>
							</div>`;
                    $("#uiDom").append(ui);
                })
                .catch(function (result) {
                    console.log(result)
                });
            return true;
        });
    };

    var getBy = function (obj) {
        var text = $("#text_bsc").val();
        var from = "";
        var to = "";
        if(obj){
            from = dateControl.getWeekStartDate();
            to = dateControl.getWeekEndDate();
        }
        init(text,from,to);
    };

    return {
        init:init,
        getBy:getBy
    }
}();
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        uiControl.init();
    });
}