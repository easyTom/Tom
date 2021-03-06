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
                var type_code=$('#type_code').val();
                aoData.push(
                    {
                    "name" : "conditions['text']",
                    "value" : text_code
                    },
                    {
                        "name" : "conditions['type']",
                        "value" : type_code
                    }
                  );
            },
            "aoColumns": [
                { "data": "name","bSortable": false,"sClass": "text-left" },
                { "data": "codeType","bSortable": false,"sClass": "text-center" },
                { "data": "createTime","bSortable": false,"sClass": "text-center" },
                { "data": "lookCount","bSortable": false,"sClass": "text-center" },
                { "data": "codeId","bSortable": false,"sClass": "text-center" }
            ],
            "createdRow": function ( row, data, index ) {
                $('td',row).eq(2).html(datetimeUtils.datetimeToFormatDatetime(new Date(data.createTime)));
                var  str = '<a style="text-decoration:none;" href="javascript:TableDatatablesManaged.lookUp(\'' + data.codeId + '\');">[ 查看 ]</a>';
                     str += '<a style="text-decoration:none;" href="javascript:TableDatatablesManaged.del(\'' + data.codeId + '\');">[ 删除 ]</a>';
                     str += '<a style="text-decoration:none;" href="javascript:TableDatatablesManaged.toUpdateCode(\'' + data.codeId + '\');">[ 修改 ]</a>';
                $('td',row).eq(4).html(str);
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


    }

    var toAddCode = function () {
        document.getElementById("modal_code_form").reset();
        $("#codeId").val("");
        $("#code_title").text("新增知识点记录");
        type = "doAdd";
        initFroala("add");

    }

    var getByType = function (type) {
        $("#type_code").val(type);
        $('#myTable').dataTable().fnClearTable(0);
        $('#myTable').dataTable().fnDraw();
    }

    var toUpdateCode = function (codeId) {
        $("#code_title").text("修改知识点记录");
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
                    $("#codeType").val(data.codeType);
                    initFroala("update",data.text,data.codeId);
                }else{
                    alert("获取信息失败，暂无法修改");
                }
            },
            error	:	function(data){
                console.log(data);
            }
        });
    }

    var lookUp = function (codeId) {
        $("#code_title").text("查看知识点记录");
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
                    $("#codeType").val(data.codeType);
                    initFroala("look",data.text);
                }else{
                    alert("获取信息失败，暂无法查看");
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
                    required:'知识点名称不能为空'
                },
                text:{
                    required:'知识点内容不能为空',
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
                            showList();
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

    //隐藏显示modal列表
    var showList = function () {
        $('#modal_code').css("display","none");
        $('#bd').css("display","");
        $('#myTable').dataTable().fnClearTable(0);
        $('#myTable').dataTable().fnDraw();
    }

    //隐藏列表显示modal
    var hideList = function () {
        //隐藏确定
        $("#close").css("display","");
        $('#modal_code').css("display","");
        $('#bd').css("display","none");

    }

    //是否是查看
    function initFroala (type,text,codeId){
        hideList();
        //获取froala
        let settings = FroalaManaged.getInitSetting();
        var editor = new FroalaEditor('#froala-editor',settings);
        //正常状态
        editor.edit.on();
        $("#codeId").attr("readonly",false);
        $("#name").attr("readonly",false);
        $("#level").attr("readonly",false);
        $("#codeType").attr("disabled",false);
        $("#ok").css("display","");
        switch(type){
            case "update":
                settings.imageUploadParams.id = codeId;
                editor.html.set(text);
                break;

            case "add":
                settings.imageUploadParams.id = "";
                break;

            case "look":
                $("#codeId").attr("readonly",true);
                $("#name").attr("readonly",true);
                $("#level").attr("readonly",true);
                $("#codeType").attr("disabled","disabled");
                editor.html.set(text);
                //禁止编辑
                editor.edit.off();
                //隐藏确定
                $("#ok").css("display","none");
                break;
            default :
                return ;
                break;
        }
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
        showList:showList,
        hideList:hideList,
        lookUp:lookUp,
        getByType:getByType
    }
}();

if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        TableDatatablesManaged.init();
    });
}