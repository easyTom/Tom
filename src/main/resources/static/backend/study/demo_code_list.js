/**
 *  tom/study/demoCode/XXX
 #  modal_demoCode_form
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
            "ordering": false,
            "bFilter": false,
            "bDeferRender":true,
            "bInfo":true,
            "bLengthChange":false,
            "bAutoWidth":false,
            "pageLength": 10,
            "bProcessing": true,
            "bServerSide": true,
            "destroy":true,
            "sAjaxSource": ctx + "/tom/study/demoCode/list",
            "sServerMethod": "POST",
            "fnServerParams": function ( aoData ) {
                var text_code=$('#text_code').val();
                aoData.push(
                    {
                    "name" : "conditions['text']",
                    "value" : text_code
                    }
                  );
            },
            "aoColumns": [
                { "data": "name","bSortable": false,"sClass": "text-left" },
                { "data": "createTime","bSortable": false,"sClass": "text-center" },
                { "data": "lookCount","bSortable": false,"sClass": "text-center" },
                { "data": "codeId","bSortable": false,"sClass": "text-center" }
            ],
            "createdRow": function ( row, data, index ) {
                $('td',row).eq(1).html(datetimeUtils.datetimeToFormatDatetime(new Date(data.createTime)));
                var  str = '<a style="text-decoration:none;" href="javascript:TableDatatablesManaged.del(\'' + data.demoCodeId + '\');">[ 删除 ]</a>';
                     str += '<a style="text-decoration:none;" href="javascript:TableDatatablesManaged.toUpdateCode(\'' + data.demoCodeId + '\');">[ 修改 ]</a>';
                $('td',row).eq(3).html(str);
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

    var toAddCode = function () {
        document.getElementById("modal_code_form").reset();
        $("#code_title").text("新增模板记录");
        type = "doAdd";
        $('#modal_code').modal();
    }

    var toUpdateCode = function (codeId) {
        $("#code_title").text("修改模板记录");
        type = "doUpdate";
        $.ajax({
            type	:	"get",
            url		:	ctx+"/tom/study/demoCode/getOne",
            data	:	{"id":codeId},
            dataType:	"json",
            success	:	function(data){
                if(data){
                    $("#codeId").val(data.codeId);
                    $("#name").val(data.name);
                    $("#level").val(data.level);
                    $('#modal_code').modal();
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
        if(!$("#modal_code_form").valid()){
            return false;
        }else {
            return true;
        }
    }

    // 为表单添加校验
    var validateForm = function(){
        $("#modal_code_form").validate({
            errorElement: 'span',
            errorClass: 'validate-error',
            focusInvalid: false,
            ignore: "",
            messages: {
                name:{
                    required:'模板名称不能为空'
                },
                text:{
                    required:'模板内容不能为空',
                },
                level:{
                    number:'请输入1~9的小写数字'
                }
            },
            rules: {
                text: {
                    required: true,
                },
                name: {
                    required: true
                },
                level:{
                    number:true
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
                $.ajax({
                    type	:	"post",
                    url		:	ctx+"/tom/study/demoCode/"+type,
                    data	:	formData,
                    contentType: false,
                    processData: false,
                    dataType:	"json",
                    success	:	function(data){
                        if(data){
                            $('#modal_code').modal('hide');
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
            url		:	ctx+"/tom/study/demoCode/doDel",
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

    return {
        init: function () {
            if (!jQuery().dataTable) {
                return;
            }
            initTable();
            validateForm();
        },
        toAddCode:toAddCode,
        toUpdateCode:toUpdateCode,
        valid:valid,
        del:del,
    }
}();

if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        TableDatatablesManaged.init();
    });
}