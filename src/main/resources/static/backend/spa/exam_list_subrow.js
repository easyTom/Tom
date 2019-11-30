/***
 *
 */
var subrowControl = function () {

    function subrowFormat(eventData) {
        var row = eventData.row;
        var rowData = row.data();
        var bscId = rowData.bscId;
        var childEle = row.child(`<div class="row">
                       <div class="col-md-12">
                            <!-- BEGIN Portlet PORTLET-->
                            <div class="portlet box ">
                                <div class="portlet-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <!-- BEGIN Portlet PORTLET-->
                                            <div class="portlet box blue">
                                                <div class="portlet-title">
                                                    <div class="caption">
                                                        <i class="fa fa-photo"></i> 相关附件 </div>
                                                </div>
                                                <div class="portlet-body" style="height:230px!important;" >
                                                    <div class="row bottom text-center" id="att_${bscId}" style="margin-bottom: 10px" >
                                                        
                                                    </div>
                                                    <div style="max-height:170px!important;overflow-y: auto" class="spa_subrow pre-scrollable " id="spa_attchments_${bscId}">
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- END Portlet PORTLET-->
                                        </div>
                                        <div class="col-md-6">
                                            <!-- BEGIN Portlet PORTLET-->
                                            <div class="portlet box blue">
                                                <div class="portlet-title">
                                                    <div class="caption">
                                                        <i class="fa fa-text-width"></i> 详细信息 </div>
                                                </div>
                                                <div class="portlet-body" style="height:230px!important;">
                                                        <div style="max-height:220px!important;overflow: hidden" class="spa_subrow pre-scrollable" id="seriesPics_${bscId}">
                                                        
</div>
                                                       <div class="col-md-12 text-center" id="seriesPics1_${bscId}"  style="padding: 0"></div>
                                                        <div style="clear:both;" ></div>
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
        initText(rowData);
        tomMagnifyControl.init(false);
    }
    
    function initText(rowData) {
        spaSubRowTextControl.init(rowData);
    }
    function initAtt(rowData) {
        spaSubRowAttControl.init(rowData);
    }
    return {
        format: subrowFormat
    }
}();
