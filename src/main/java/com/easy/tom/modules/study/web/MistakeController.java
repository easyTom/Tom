package com.easy.tom.modules.study.web;

import com.baomidou.mybatisplus.plugins.Page;
import com.easy.common.model.DataTableRequest;
import com.easy.common.model.DataTableResponse;
import com.easy.common.utils.IdGen;
import com.easy.common.utils.WebUtil;
import com.easy.tom.modules.study.entity.Mistake;
import com.easy.tom.modules.study.service.IMistakeService;
import com.easy.tom.system.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Controller
@RequestMapping("/tom/study/mistake")
public class MistakeController {

    @Autowired
    private IMistakeService iMistakeService;

    @ResponseBody
    @RequestMapping("/list")
    public DataTableResponse List(DataTableRequest dataTableRequest, HttpServletResponse response) {
        Page<Mistake> page = dataTableRequest.currentPage();
        List<Mistake> list = null;
        if(dataTableRequest.getConditions() == null){
            dataTableRequest.setConditions(new HashMap<String,Object>());
        }
        dataTableRequest.getConditions().put("startIndex", dataTableRequest.getIDisplayStart());
        dataTableRequest.getConditions().put("size", dataTableRequest.getIDisplayLength());

        Map<String,Object> conditions = dataTableRequest.getConditions();
        list = iMistakeService.findList(conditions);
        page.setTotal(iMistakeService.findTotal(conditions));
        page.setRecords(list);
        return DataTableResponse.valueOf(page, dataTableRequest.getSEcho());
    }


    @ResponseBody
    @RequestMapping(value="/doAdd",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doAdd(Mistake mistake){
        User user = WebUtil.getCurrentUser();
        mistake.setCreateBy(user.getUserName());
        mistake.setCreateTime(new Date());
        mistake.setMistakeId(IdGen.uuid());
        iMistakeService.insert(mistake);
        return true;
    }
    @ResponseBody
    @RequestMapping(value="/doDel",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doDel(String id){
        return  iMistakeService.deleteById(id);
    }

    @ResponseBody
    @RequestMapping(value="/doUpdate",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doUpdate(Mistake mistake){
        iMistakeService.updateById(mistake);
        return true;
    }

    @ResponseBody
    @RequestMapping(value="/getOne",method= RequestMethod.GET,produces="application/json;charset=utf-8")
    public Mistake getOne(String id){
        return  iMistakeService.selectById(id);
    }
}