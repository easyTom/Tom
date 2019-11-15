package com.easy.tom.modules.front.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tom")
public class TomController {
	
    @RequestMapping("/index")
    public String index(){
        return "frontend/index";
    }
	
}
