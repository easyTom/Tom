package com.easy.tom.modules.study.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.easy.tom.modules.study.entity.DemoCode;

import java.util.List;
import java.util.Map;

public interface DemoCodeMapper extends BaseMapper<DemoCode> {
    int findTotal(Map<String, Object> conditions);

    List<DemoCode> findList(Map<String, Object> conditions);
}
