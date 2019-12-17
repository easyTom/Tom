package com.easy.tom.modules.study.web;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.easy.common.model.DataTableRequest;
import com.easy.common.model.DataTableResponse;
import com.easy.common.utils.IdGen;
import com.easy.common.utils.WebUtil;
import com.easy.tom.modules.study.entity.DemoCode;
import com.easy.tom.modules.study.service.IDemoCodeService;
import com.easy.tom.system.entity.Attachment;
import com.easy.tom.system.entity.User;
import com.easy.tom.system.service.IAttachmentService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.*;

@Controller
@RequestMapping("/tom/study/demoCode")
public class DemoCodeController {
    @Value("${tom.files.path}")
    private String path;
    @Autowired
    private IDemoCodeService iDemoCodeService;
    @Autowired
    private IAttachmentService iAttService;

    //从时间中获取路径
    public String getCalendarPath(Calendar c){
        return c.get(Calendar.YEAR) + "/" + (((c.get(Calendar.MONTH) + 1) + "").length() < 2 ? ("0" + (c.get(Calendar.MONTH) + 1)) : (c.get(Calendar.MONTH) + 1)) + "/" + ((c.get(Calendar.DAY_OF_MONTH) + "").length() < 2 ? ("0" + c.get(Calendar.DAY_OF_MONTH)) : c.get(Calendar.DAY_OF_MONTH)) + "/";
    }

    @ResponseBody
    @RequestMapping("/list")
    public DataTableResponse List(DataTableRequest dataTableRequest, HttpServletResponse response) {
        Page<DemoCode> page = dataTableRequest.currentPage();
        List<DemoCode> list = null;
        if(dataTableRequest.getConditions() == null){
            dataTableRequest.setConditions(new HashMap<String,Object>());
        }
        dataTableRequest.getConditions().put("startIndex", dataTableRequest.getIDisplayStart());
        dataTableRequest.getConditions().put("size", dataTableRequest.getIDisplayLength());

        Map<String,Object> conditions = dataTableRequest.getConditions();
        list = iDemoCodeService.findList(conditions);
        page.setTotal(iDemoCodeService.findTotal(conditions));
        page.setRecords(list);
        return DataTableResponse.valueOf(page, dataTableRequest.getSEcho());
    }


    @ResponseBody
    @RequestMapping(value="/doAdd",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doAdd(DemoCode code){
        User user = WebUtil.getCurrentUser();
        code.setCreateBy(user.getUserName());
        code.setCreateTime(new Date());
        if(StringUtils.isEmpty(code.getCodeId())){
            code.setCodeId(IdGen.uuid());
        }
        iDemoCodeService.insert(code);
        return true;
    }
    @ResponseBody
    @RequestMapping(value="/doDel",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doDel(String id){
        Wrapper<Attachment> wrapper = new EntityWrapper();
        wrapper.eq("BUSINESSID",id);
        List<Attachment> attList = iAttService.selectList(wrapper);
        if(attList!=null && attList.size()>=0){
            Calendar c = Calendar.getInstance();
            for (Attachment att : attList) {
                c.setTime(att.getCreateTime());
                String tempPath = getCalendarPath(c)+att.getActualFileName();
                File file = new File(path+tempPath);
                if(file.exists()){
                    file.delete();
                }
                File minFile = new File(tempPath.substring(0,tempPath.lastIndexOf("."))+"_min.png");
                if(minFile.exists()){
                    minFile.delete();
                }
            }
        }
        return  iDemoCodeService.deleteById(id);
    }

    @ResponseBody
    @RequestMapping(value="/doUpdate",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doUpdate(DemoCode code){
        iDemoCodeService.updateById(code);
        return true;
    }

    @ResponseBody
    @RequestMapping(value="/getOne",method= RequestMethod.GET,produces="application/json;charset=utf-8")
    public DemoCode getOne(String id){
        return  iDemoCodeService.selectById(id);
    }
}