package com.easy.tom.modules.study.service;

import com.baomidou.mybatisplus.service.IService;
import com.easy.tom.modules.study.entity.DemoCode;

import java.util.List;
import java.util.Map;

public interface IDemoCodeService extends IService<DemoCode> {
    List<DemoCode> findList(Map<String, Object> conditions);

    int findTotal(Map<String, Object> conditions);
}
