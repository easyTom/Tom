package com.easy.tom.modules.bsc.web;

import com.baomidou.mybatisplus.plugins.Page;
import com.easy.common.model.DataTableRequest;
import com.easy.common.model.DataTableResponse;
import com.easy.common.utils.IdGen;
import com.easy.common.utils.WebUtil;
import com.easy.tom.modules.bsc.entity.Bsc;
import com.easy.tom.modules.bsc.service.IBscService;
import com.easy.tom.system.entity.User;
import com.fasterxml.jackson.core.JsonProcessingException;
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
@RequestMapping("/tom/bsc")
public class BSCController {
    public static final String VIEW = "backend/pages/bsc/";

    @Autowired
    private IBscService iBscService;
    @RequestMapping("/index")
    public String index(){
        return VIEW+"bsc_index";
    }

    @ResponseBody
    @RequestMapping("/list")
    public DataTableResponse examList(DataTableRequest dataTableRequest, HttpServletResponse response) throws JsonProcessingException {
        Page<Bsc> page = dataTableRequest.currentPage();
        List<Bsc> list = null;
        if(dataTableRequest.getConditions() == null){
            dataTableRequest.setConditions(new HashMap<String,Object>());
        }
        dataTableRequest.getConditions().put("startIndex", dataTableRequest.getIDisplayStart());
        dataTableRequest.getConditions().put("size", dataTableRequest.getIDisplayLength());

        Map<String,Object> conditions = dataTableRequest.getConditions();
        list = iBscService.findList(conditions);
        page.setTotal(iBscService.findTotal(conditions));
        page.setRecords(list);
        return DataTableResponse.valueOf(page, dataTableRequest.getSEcho());
    }

    @ResponseBody
    @RequestMapping(value="/doAdd",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doAdd(Bsc bsc){
        User user = WebUtil.getCurrentUser();
        bsc.setCreateBy(user.getUserName());
        bsc.setCreateTime(new Date());
        bsc.setBscId(IdGen.uuid());
        iBscService.insert(bsc);
        return true;
    }
    @ResponseBody
    @RequestMapping(value="/doDel",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doDel(String id){
        return  iBscService.deleteById(id);
    }
}
