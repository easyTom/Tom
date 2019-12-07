package com.easy.tom.modules.study.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.easy.tom.modules.study.entity.Mistake;

import java.util.List;
import java.util.Map;

public interface MistakeMapper extends BaseMapper<Mistake> {
    int findTotal(Map<String, Object> conditions);

    List<Mistake> findList(Map<String, Object> conditions);
}
