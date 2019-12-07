package com.easy.tom.modules.study.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tom/study")
public class StudyController {

    public static final String VIEW = "backend/pages/study/";

    @RequestMapping("/{simple}")
    public String index(@PathVariable String simple){
        return VIEW+simple+"_index";
    }
}
