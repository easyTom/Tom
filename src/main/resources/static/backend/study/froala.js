var FroalaManaged = function () {
    var editor;
    var initSetting = {};
    var initEditor = function (){
        getInitSetting();
        if (!editor) {
            editor = new FroalaEditor('#froala-editor',initSetting);
        }
    }
    var destory = function (e) {
            //e.preventDefault();
            if (editor) {
                editor.destroy();
                editor=null;
            }
    }

    var getInitSetting = function () {
        initSetting = {
            language: 'zh_cn',
            height: 400,
            heightMin: 400,
            heightMax: 600,
            placeholderText:'',
            imageEditButtons: ['imageReplace', 'imageAlign', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'],

        };
        Object.assign(initSetting,froalaSettings.imageSet);
        console.log(initSetting)
        return initSetting;
    }
    return{
        init:function () {
            if (editor) {
                return;
            }
            initEditor();
        },
        destory:destory,
        getInitSetting:getInitSetting
    }

}();
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        FroalaManaged.init();
    });
}