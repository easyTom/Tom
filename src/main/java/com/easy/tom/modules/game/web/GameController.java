package com.easy.tom.modules.game.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tom/game")
public class GameController {

    public static final String VIEW = "backend/pages/game/";

    @RequestMapping("/{simple}")
    public String index(@PathVariable String simple){
        return VIEW+simple;
    }
}
