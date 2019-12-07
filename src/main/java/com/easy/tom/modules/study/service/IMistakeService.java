package com.easy.tom.modules.study.service;

import com.baomidou.mybatisplus.service.IService;
import com.easy.tom.modules.study.entity.Mistake;

import java.util.List;
import java.util.Map;

public interface IMistakeService extends IService<Mistake> {
    List<Mistake> findList(Map<String, Object> conditions);

    int findTotal(Map<String, Object> conditions);
}
