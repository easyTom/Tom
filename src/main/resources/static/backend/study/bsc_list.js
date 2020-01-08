/**
 *  tom/bsc/XXX
 #  modal_bsc_form
 */
var TableDatatablesManaged = function (){
    var oTable;
    var type;
    var initTable = function () {
        var table = $('#myTable');
        oTable = table.DataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "无",
                "info": "显示 _START_ - _END_ 共 _TOTAL_ 条记录",
                "infoEmpty": "无记录",
                "infoFiltered": "(filtered1 from _MAX_ total records)",
                "lengthMenu": "Show _MENU_",
                "search": "查找:",
                "zeroRecords": "无记录",
                "paginate": {
                    "previous":"上一页",
                    "next": "下一页",
                    "last": "最后",
                    "first": "首页"
                }
            },
            "bStateSave": true,
            "bFilter": false,
            "bDeferRender":true,
            "bInfo":true,
            "bLengthChange":false,
            "bAutoWidth":false,
            "pageLength": 10,
            "bProcessing": true,
            "bServerSide": true,
            "destroy":true,
            "sAjaxSource": ctx + "/tom/bsc/list",
            "sServerMethod": "POST",
            "fnServerParams": function ( aoData ) {
                var order=$('#order').val();
                var type_bsc=$('#type_bsc').val();
                var text_bsc=$('#text_bsc').val();
                aoData.push(
                    {
                    "name" : "conditions['order']",
                    "value" : order
                    },{
                    "name" : "conditions['type']",
                    "value" : type_bsc
                     },{
                    "name" : "conditions['text']",
                    "value" : text_bsc
                    }
                  );
            },
            "aoColumns": [
                { "data": "name","sClass": "text-left" },
                { "data": "createTime","sClass": "text-center" },
                { "data": "type","sClass": "text-center" },
                { "data": "bscId","bSortable": false,"sClass": "text-center" }
            ],
            "createdRow": function ( row, data, index ) {
                $('td',row).eq(1).html(datetimeUtils.datetimeToFormatDatetime(new Date(data.createTime)));
                var  str = '<a style="text-decoration:none;" href="javascript:TableDatatablesManaged.del(\'' + data.bscId + '\');">[ 删除 ]</a>';
                     str += '<a style="text-decoration:none;" href="javascript:TableDatatablesManaged.toUpdateBsc(\'' + data.bscId + '\');">[ 修改 ]</a>';
                $('td',row).eq(3).html(str);
                $('#type_bsc').val("");
                $('#text_bsc').val("");
                /*if( $("#initTableRow").val() == data.examId){
                    var open = setInterval(function() {
                        $(`#myTable`).find('tbody').find(`tr:eq(${index})`).find('td:eq(2)').click();
                        clearInterval(open)
                    }, 500)
                }*/
            }
        });

        // 搜索区域
        $("#btn_search").on('click',function(){
            $('#myTable').dataTable().fnClearTable(0);
            $('#myTable').dataTable().fnDraw();
            /*  oTable.fnClearTable(0);
              oTable.fnDraw();*/

        });

        // 状态
        $('a[name="btn_status"]').on('click',function(){
            status = $(this).attr("value");
            $('#status').val(status);
            $('#myTable').dataTable().fnClearTable(0);
            $('#myTable').dataTable().fnDraw();
        });

        // 为表格添加单击事件
        /* $('#myTable tbody').on('click', 'td', function () {
             //最后一行不下拉
             if(("test"+$(this).html()).indexOf("查看检查单")==-1) {

                 var tr = $(this).closest('tr');
                 var row = oTable.row(tr);
                 if (row.child.isShown()) {
                     // 对已经展开的行进行折叠
                     row.child.hide();
                     tr.removeClass('shown');
                 }
                 else {
                     row.child(format(row.data())).show();
                     tr.addClass('shown');
                     // resizeImage();
                 }
             }
         } );*/
        //新版
        $('#myTable tbody').on('click', 'td', function (event) {
            if (this != event.target) return;
            var tr = $(this).closest('tr');
            var row = oTable.row(tr);
            if (row.length == 0) {
                return;
            }
            var eventData = {
                row: row,
                eventEle: this,
                oTable: oTable
            };
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                subrowControl.format(eventData);
                tr.addClass('shown');
            }
        });


    }

    var toAddBsc = function () {
        document.getElementById("modal_bsc_form").reset();
        $('#modal_bsc').modal();
        $("#bsc_title").text("新增Bsc记录");
        type = "doAdd";
        $('#modal_bsc').modal();
    }

    var toUpdateBsc = function (bscId) {
        $("#bsc_title").text("修改Bsc记录");
        type = "doUpdate";
        $.ajax({
            type	:	"get",
            url		:	ctx+"/tom/bsc/getOne",
            data	:	{"id":bscId},
            dataType:	"json",
            success	:	function(data){
                if(data){
                    $("#bscId").val(data.bscId);
                    $("#name").val(data.name);
                    $("#text").val(data.text);
                    $("#createTimeString").val(datetimeUtils.datetimeToFormatDatetime(new Date(data.createTime)));
                    $(`#type option[value='${data.type}']`).attr("selected","selected");
                    $('#modal_bsc').modal();
                }else{
                    alert("获取信息失败，暂无法修改");
                }
            },
            error	:	function(data){
                console.log(data);
            }
        });
    }

    var valid = function () {
        if(!$("#modal_bsc_form").valid()){
            return false;
        }else {
            return true;
        }
    }

    // 为表单添加校验
    var validateForm = function(){
        $("#modal_bsc_form").validate({
            errorElement: 'span',
            errorClass: 'validate-error',
            focusInvalid: false,
            ignore: "",
            messages: {
                name:{
                    required:'任务名称不能为空'
                },
                text:{
                    required:'任务内容不能为空',
                    rangelength:'任务内容不能超过200个字符'
                }
            },
            rules: {
                text: {
                    required: true,
                    rangelength:[0,200]
                },
                name: {
                    required: true
                }
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
                var formData = new FormData(form);
                var createDate = $("#createTimeString").val();
                formData.append("createTime",new Date(createDate));
                $.ajax({
                    type	:	"post",
                    url		:	ctx+"/tom/bsc/"+type,
                    data	:	formData,
                    contentType: false,
                    processData: false,
                    dataType:	"json",
                    success	:	function(data){
                        if(data){
                            $('#modal_bsc').modal('hide');
                            $('#myTable').dataTable().fnClearTable(0);
                            $('#myTable').dataTable().fnDraw();
                        }else{
                            alert("操作失败");
                        }
                    },
                    error	:	function(data){
                        console.log(data);
                    }
                });
            }
        });
    }

    var del = function (id) {
        var flag = confirm("确定删除本条数据吗?");
        if (!flag) return false;

        $.ajax({
            type	:	"post",
            url		:	ctx+"/tom/bsc/doDel",
            data	:	{"id":id},
            dataType:	"json",
            success	:	function(data){
                if(data){
                    $('#myTable').dataTable().fnClearTable(0);
                    $('#myTable').dataTable().fnDraw();
                }else{
                    alert("删除失败");
                }
            },
            error	:	function(data){
                console.log(data);
            }
        });
    }

    var getByType = function (type) {
        $("#type_bsc").val(type);
        $('#myTable').dataTable().fnClearTable(0);
        $('#myTable').dataTable().fnDraw();
    }

    return {
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }
            initTable();
            validateForm();
        },
        toAddBsc:toAddBsc,
        toUpdateBsc:toUpdateBsc,
        valid:valid,
        del:del,
        getByType:getByType
    }
}();

if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        TableDatatablesManaged.init();
    });
}