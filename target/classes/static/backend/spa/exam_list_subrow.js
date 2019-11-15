/***
 *
 */
var subrowControl = function () {

    function subrowFormat(eventData) {
        var row = eventData.row;
        var rowData = row.data();
        var clinicid = rowData.clinicid;
        var childEle = row.child(`<div class="row">
                       <div class="col-md-12">
                            <!-- BEGIN Portlet PORTLET-->
                            <div class="portlet box ">
                                <div class="portlet-body">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <!-- BEGIN Portlet PORTLET-->
                                            <div class="portlet box blue">
                                                <div class="portlet-title">
                                                    <div class="caption">
                                                        <i class="fa fa-files-o"></i> 超声附件 </div>
                                                </div>
                                                <div class="portlet-body" style="height:230px!important;" >
                                                    <div class="row bottom text-center" id="att_${clinicid}" style="margin-bottom: 10px" >
                                                        
                                                    </div>
                                                    <div style="max-height:170px!important;overflow-y: auto" class="spa_subrow pre-scrollable " id="spa_attchments_${clinicid}">
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- END Portlet PORTLET-->
                                        </div>
                                        <div class="col-md-3">
                                            <!-- BEGIN Portlet PORTLET-->
                                            <div class="portlet box blue">
                                                <div class="portlet-title">
                                                    <div class="caption">
                                                        <i class="fa fa-calendar-check-o"></i> 时间安排 </div>
                                                </div>
                                                <div class="portlet-body" style="height:230px!important;">
                                                        <div style="max-height:220px!important;overflow: hidden" class="spa_subrow pre-scrollable" id="seriesPics_${clinicid}">
                                                        
</div>
                                                        <div class="col-md-12 text-center" id="seriesPics1_${clinicid}"  style="padding: 0"></div>
                                                        <div style="clear:both;" ></div>
                                                </div>
                                            </div>
                                            <!-- END Portlet PORTLET-->
                                        </div>
                                        <div class="col-md-3">
                                            <!-- BEGIN Portlet PORTLET-->                                            <div class="portlet box blue">
                                                <div class="portlet-title">
                                                    <div class="caption">
                                                        <i class="fa fa-video-camera"></i> 视频咨询 </div>
                                                </div>
                                                <div class="portlet-body" style="height:230px!important;">
                                                    <div style="max-height:220px!important;"  class="row bottom text-center" id="spa_video_${clinicid}">
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- END Portlet PORTLET-->
                                        </div>
                                        <div class="col-md-3">
                                            <!-- BEGIN Portlet PORTLET-->
                                            <div class="portlet box blue">
                                                <div class="portlet-title">
                                                    <div class="caption">
                                                        <i class="fa fa-file-text-o"></i> 超声报告 </div>
                                                </div>
                                                <div class="portlet-body" style="height:230px!important;">
                                                    <div style="max-height:220px!important;"class="row bottom text-center" id="spa_report_${clinicid}">
                                                        
                                                    </div>
                                                     <div class="row bottom text-center" id="report_${clinicid}" style="margin-top: 10px" >
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- END Portlet PORTLET-->
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <!-- END Portlet PORTLET-->
                        </div>
                    </div>`);
        childEle.show();
        initAtt(rowData);
        initReport(rowData);
        initTime(rowData);
    }
    
    function initTime(rowData) {
        spaSubRowTimeControl.init(rowData);
    }
    function initAtt(rowData) {
        spaSubRowAttControl.init(rowData);
    }
    function initReport(rowData) {
        spaSubRowReportControl.init(rowData);
    }

    return {
        format: subrowFormat
    }
}();
