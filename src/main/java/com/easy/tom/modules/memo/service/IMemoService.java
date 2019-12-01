package com.easy.tom.modules.memo.service;

import com.baomidou.mybatisplus.service.IService;
import com.easy.tom.modules.memo.entity.Memo;

import java.util.List;
import java.util.Map;

public interface IMemoService extends IService<Memo> {
    List<Memo> findList(Map<String, Object> conditions);

    int findTotal(Map<String, Object> conditions);
}
