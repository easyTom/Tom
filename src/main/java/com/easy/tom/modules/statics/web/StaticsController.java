package com.easy.tom.modules.statics.web;

import com.easy.tom.modules.statics.service.IStaticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/tom/statics")
public class StaticsController {
    public static final String VIEW = "backend/pages/statics/";

    @Autowired
    private IStaticsService iStaticsService;

    @RequestMapping("/{simple}")
    public String index(@PathVariable String simple ){
        return VIEW+"statics_"+simple;
    }
    //获取业务量走势折线图的数据
    @RequestMapping("/getDataK")
    public ResponseEntity<?> getTJFXData() {
        Map<String,Object> conditions = new HashMap<>();
        HashMap<String, Object> map = new HashMap<>();
        List<Map<String, Object>> list = iStaticsService.getDataK(conditions);
        map.put("list",list);
        return ResponseEntity.ok(map);
    }
}
