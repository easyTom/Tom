var spaSubRowTimeControl = function() {
	//var ecgPhoto; 假如需要拼接 这样是错误的类型没指定 写在外面不行 每次没清空
	//var ecgPhoto = "";
    var handleAdd = function(rowData) {
    			    var id = rowData.clinicid;
					$("#seriesPics_"+id).empty();
					$("#seriesPics1_"+id).empty();
                    var vb = "";

                    var input = ` <div style="width: 100%;margin: auto">
                                <table class="table table-bordered table-hover"  style="font-size:14px;">
                                    <tr>
                                        <td>
                                            <label class="control-label col-sm-12 text-center" style="text-align: center" >时间安排: <span class="required">*</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="col-sm-12">
                                                <input class="form-control date-picker" readonly="readonly"  value="${rowData.videotime}" id="videotimeLook" name="videotimeLook" type="text" />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
               </div>`;
                    var inputNo = ` <div style="width: 100%;margin: auto">
                                <table class="table table-bordered table-hover"  style="font-size:14px;">
                                    <tr>
                                        <td>
                                            <label class="control-label col-sm-12 text-center" style="text-align: center" >时间安排: <span class="required">*</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="col-sm-12">
                                                <input class="form-control date-picker" readonly="readonly"  value="尚未安排"  type="text" />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
               </div>`;
                    var back = ` <div style="width: 100%;margin: auto">
                                <table class="table table-bordered table-hover"  style="font-size:14px;">
                                    <tr>
                                        <td>
                                            <label class="control-label col-sm-12 text-center" style="text-align: center" >已被退回 
                                            </label>
                                        </td>
                                    </tr>
                                </table>
               </div>`;

					// 专家角色
					if (rowData.currentUserCode == '5') {
                        //待处理
					    if( rowData.status == '01'){
					        vb = '<a  class="btn btn-sm blue" style="text-decoration:none;" href="javascript:spaSubRowTimeControl.backClinic(\'' + rowData.clinicid + '\');"> 退回申请 </a>';
                         vb += '<a  class="btn btn-sm blue" style="text-decoration:none;" href="javascript:spaSubRowTimeControl.videoTimeSetView(\'' + rowData.clinicid + '\');"> 安排时间 </a>';
                        //已经安排了
                        }else if( rowData.status == '03'){
                        vb = '<a  class="btn btn-sm blue" style="text-decoration:none;" href="javascript:spaSubRowTimeControl.videoTimeSetUpdate(\'' + rowData.clinicid + '\');"> 修改安排时间 </a>';
                            vb+= input;
                        }
					}
                if (rowData.currentUserCode == '4'){
                    if( rowData.status == '03'){
                        vb = input;
                  }else {
                        if(rowData.status == '01'){
                            vb = inputNo;
                        }else if(rowData.status == '02') {
                            vb = back;
                        }else{
                            vb = "";
                        }
                    }
                }
             $("#seriesPics1_"+id).append(vb);

				}
    //安排时间
    var videoTimeSetView = function(clinicid) {
        $("#seriesPics1_"+clinicid).empty();
        $("#initTableRow").val(clinicid);
        var input = ` <div style="width: 100%;margin: auto"><form id="videotimeForm" class="form-horizontal"onsubmit="return false" >
                                <table class="table table-bordered table-hover"  style="font-size:14px;">
                                    <tr>
                                        <td>
                                            <label class="control-label col-sm-12 text-center" style="text-align: center" >时间安排: <span class="required">*</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="col-sm-12">
                                                <input class="form-control date-picker" readonly="readonly" data-date-format="yyyy-mm-dd hh:ii" id="videotime" name="videotime" type="text" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="col-sm-12">
                                               <button type="submit" onclick="TableDatatablesManaged.validVideoTime();" class="btn green">确定</button>
                        <button type="button" onclick="spaSubRowTimeControl.quit('${clinicid}')" class="btn dark btn-outline">取消</button>
                                            </div>
                                        </td>
                                    </tr>

                                </table>
                       
                </form></div>`;
        $("#seriesPics1_"+clinicid).append(input);
        validateForm();
    }
    //修改时间
    var videoTimeSetUpdate = function (clinicid) {
        $("#seriesPics1_"+clinicid).empty();
        $("#initTableRow").val(clinicid);
        var videotime = $("#videotime").val();
        var str = "";
        $.ajax({
            type	:	"post",
            url		:	ctx + "ultrasound/spaClinic/getVideoTimeSet/" + clinicid,
            data	:	{videotime:videotime},
            contentType: false,
           
            async:false,
            dataType:	"json",
            success	:	function(data){
                if(data){
                    str = data.videotime;
                }else{
                    alert("安排失败");
                }
            },
            error	:	function(data){
                console.log(data);
            }
        });
        var input = ` <div style="width: 100%;margin: auto"><form id="videotimeForm" class="form-horizontal"onsubmit="return false" >
                                <table class="table table-bordered table-hover"  style="font-size:14px;">
                                    <tr>
                                        <td>
                                            <label class="control-label col-sm-12 text-center" style="text-align: center" >时间安排: <span class="required">*</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="col-sm-12">
                                                <input class="form-control date-picker" readonly="readonly" data-date-format="yyyy-mm-dd hh:ii" value="${str}" id="videotime" name="videotime" type="text" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="col-sm-12">
                                               <button type="submit" onclick="TableDatatablesManaged.validVideoTime();" class="btn green">确定</button>
                        <button type="button"  onclick="spaSubRowTimeControl.quit('${clinicid}')" class="btn dark btn-outline">取消</button>
                                            </div>
                                        </td>
                                    </tr>

                                </table>
                       
                </form></div>`;
        $("#seriesPics1_"+clinicid).append(input);
        validateForm();
    }
    //校验以及ajax
    var validateForm = function(){

        var nowTime = (new Date()).Format("yyyy-M-d h:m:s");
        $('#videotime').datetimepicker({
            container:"#eee",
            rtl : false,
            orientation : "left",
            language : 'zh-CN',
            autoclose : true,
            startDate : nowTime
        });


        $("#videotimeForm").validate({
            errorElement: 'span',
            errorClass: 'validate-error',
            focusInvalid: false,
            ignore: "",
            messages: {
                videotime:{
                    required:'安排时间不能为空'
                },
            },
            rules: {
                videotime: {
                    required: true,
                },
            },
            invalidHandler: function (event, validator) {},
            errorPlacement: function (error, element) {
                element.after(error);
            },
            highlight: function (element) {},
            unhighlight: function (element) {},
            success: function (label) {
                console.log(label);
            },
            submitHandler: function (form) {
                var clinicid = $("#initTableRow").val();
                var videotime = $("#videotime").val();
                $.ajax({
                    type	:	"post",
                    url		:	ctx + "ultrasound/spaClinic/videoTimeSet/?clinicid=" + clinicid + "&videotime="+videotime,
                    contentType: false,
                    dataType:	"json",
                    success	:	function(data){
                        if(data){
                            $('#modalTime').modal('hide');
                            $('#myTable').dataTable().fnClearTable(0);
                            $('#myTable').dataTable().fnDraw();
                        }else{
                            alert("安排失败");
                        }
                    },
                    error	:	function(data){
                        console.log(data);
                    }
                });
            }
        });
    }
    //退出
    var quit = function (clinicid) {
        $("#initTableRow").val(clinicid);
        $('#myTable').dataTable().fnClearTable(0);
        $('#myTable').dataTable().fnDraw();
    }
    var backClinic = function (clinicid) {
        var f = confirm("确定退回此条申请吗?");
        if(f){
        $.ajax({
            type	:	"post",
            url		:	ctx + "ultrasound/spaClinic/backClinic/?clinicid=" + clinicid,
            contentType: false,
            dataType:	"json",
            success	:	function(data){
                if(data){
                    $('#modalTime').modal('hide');
                    $('#myTable').dataTable().fnClearTable(0);
                    $('#myTable').dataTable().fnDraw();
                }else{
                    alert("退回失败");
                }
            },
            error	:	function(data){
                console.log(data);
            }
        });

        }
    }
	return {
		init: function(rowData) {
		    handleAdd(rowData);

		},
        videoTimeSetUpdate: videoTimeSetUpdate,
        videoTimeSetView: videoTimeSetView,
        backClinic,backClinic,
        quit:quit

	};
}();
