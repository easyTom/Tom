package com.easy.tom.modules.memo.web;

import com.baomidou.mybatisplus.plugins.Page;
import com.easy.common.model.DataTableRequest;
import com.easy.common.model.DataTableResponse;
import com.easy.common.utils.IdGen;
import com.easy.common.utils.WebUtil;
import com.easy.tom.modules.memo.entity.Memo;
import com.easy.tom.modules.memo.service.IMemoService;
import com.easy.tom.system.entity.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/tom/memo")
public class MemoController {
    public static final String VIEW = "backend/pages/memo/";

    @Autowired
    private IMemoService iMemoService;
    @RequestMapping("/index")
    public String index(){
        return VIEW+"memo_index";
    }

    @ResponseBody
    @RequestMapping("/list")
    public DataTableResponse examList(DataTableRequest dataTableRequest, HttpServletResponse response) throws JsonProcessingException {
        Page<Memo> page = dataTableRequest.currentPage();
        List<Memo> list = null;
        if(dataTableRequest.getConditions() == null){
            dataTableRequest.setConditions(new HashMap<String,Object>());
        }
        dataTableRequest.getConditions().put("startIndex", dataTableRequest.getIDisplayStart());
        dataTableRequest.getConditions().put("size", dataTableRequest.getIDisplayLength());

        Map<String,Object> conditions = dataTableRequest.getConditions();
        list = iMemoService.findList(conditions);
        page.setTotal(iMemoService.findTotal(conditions));
        page.setRecords(list);
        return DataTableResponse.valueOf(page, dataTableRequest.getSEcho());
    }


    @ResponseBody
    @RequestMapping(value="/doAdd",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doAdd(Memo memo){
        User user = WebUtil.getCurrentUser();
        memo.setCreateBy(user.getUserName());
        memo.setCreateTime(new Date());
        memo.setMemoId(IdGen.uuid());
        iMemoService.insert(memo);
        return true;
    }
    @ResponseBody
    @RequestMapping(value="/doDel",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean doDel(String id){
        return  iMemoService.deleteById(id);
    }
    @ResponseBody
    @RequestMapping(value="/updateStatus",method= RequestMethod.POST,produces="application/json;charset=utf-8")
    public boolean updateStatus(String memoId,Integer finished){
        Memo memo = iMemoService.selectById(memoId);
        if(memo != null){
            memo.setFinished(finished);
            return  iMemoService.updateById(memo);
        }
        return false;
    }
}
