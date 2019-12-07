package com.easy.tom.modules.study.web;

import com.baomidou.mybatisplus.plugins.Page;
import com.easy.common.model.DataTableRequest;
import com.easy.common.model.DataTableResponse;
import com.easy.common.utils.IdGen;
import com.easy.common.utils.WebUtil;
import com.easy.tom.modules.study.entity.DemoCode;
import com.easy.tom.modules.study.service.IDemoCodeService;
import com.easy.tom.system.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/tom/study/demoCode")
public class DemoCodeController {

    @Autowired
    private IDemoCodeService iDemoCodeService;

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
    public boolean doAdd(DemoCode mistake){
        User user = WebUtil.getCurrentUser();
        mistake.setCreateBy(user.getUserName());
        mistake.setCreateTime(new Date());
        mistake.setCodeId(IdGen.uuid());
        iDemoCodeService.insert(mistake);
        return true;
    }
    @ResponseBody
    @RequestMapping(value="/doDel",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doDel(String id){
        return  iDemoCodeService.deleteById(id);
    }

    @ResponseBody
    @RequestMapping(value="/doUpdate",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doUpdate(DemoCode mistake){
        iDemoCodeService.updateById(mistake);
        return true;
    }

    @ResponseBody
    @RequestMapping(value="/getOne",method= RequestMethod.GET,produces="application/json;charset=utf-8")
    public DemoCode getOne(String id){
        return  iDemoCodeService.selectById(id);
    }
}