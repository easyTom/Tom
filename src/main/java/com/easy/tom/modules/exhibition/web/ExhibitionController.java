package com.easy.tom.modules.exhibition.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tom/exhibition")
public class ExhibitionController {

    public static final String EXHIBITION = "backend/pages/exhibition/exhibition_index";

    @RequestMapping("/index")
    public String toExhibition(){
        return EXHIBITION;
    }
}
