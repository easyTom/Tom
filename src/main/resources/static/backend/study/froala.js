var FroalaManaged = function () {
    var editor;
    var initSetting = {};
    const apiPath = ctx + 'api/froala/';
    var initEditor = function (){
        initSetting = {
            language: 'zh_cn',
            height: 300,
            heightMin: 200,
            heightMax: 600,
        };
        Object.assign(initSetting,froalaSettings.imageSet);
        console.log(initSetting)
/*
        initSetting = {
            language: 'zh_cn',
            height: 300,
            heightMin: 200,
            heightMax: 600
        };
*/
        if (!editor) {
            editor = new FroalaEditor('#froala-editor',initSetting);
            $("#froala-editor").html(`<p>大声道撒的撒<img src="http://localhost:8821//EasyTom/data/2019/12/15/6f294b050d2d4cfe83bf15ea5289bf61.png" style="width: 300px;" class="fr-fic fr-dib"><strong>大大<u>大多数a<em>打算的撒</em></u></strong></p>`);
        }
    }
    var destory = function (e) {

            e.preventDefault();
            if (editor) {
                editor.destroy();
                editor=null;
            }
    }
    var submitEditor = function () {
        var html = editor.html.get();
        $.ajax({
            type: 'POST',
            url: apiPath+'add',
            dataType: 'json',
            data:{
                "type":$("#initType").val(),
                "param":html,
            },
            success: function(data){
                if(data){
                    location.reload();
                }
            },
            error:function(data) {

            },
        });
    }

    function initType(type) {
        $("#initType").val(type);
    }

    return{
        init:function () {
            if (editor) {
                return;
            }
            initEditor();
        },
        destory:destory,
        submitEditor:submitEditor,
        initType:initType
    }

}();
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        FroalaManaged.init();
    });
}