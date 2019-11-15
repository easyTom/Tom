package com.easy.tom.modules.bsc.service;

import com.baomidou.mybatisplus.service.IService;
import com.easy.tom.modules.bsc.entity.Bsc;

import java.util.List;
import java.util.Map;

public interface IBscService extends IService<Bsc> {
    List<Bsc> findList(Map<String, Object> conditions);

    int findTotal(Map<String, Object> conditions);
}
