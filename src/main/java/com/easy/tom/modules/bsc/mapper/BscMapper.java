package com.easy.tom.modules.bsc.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.easy.tom.modules.bsc.entity.Bsc;

import java.util.List;
import java.util.Map;

public interface BscMapper  extends BaseMapper<Bsc> {
    int findTotal(Map<String, Object> conditions);

    List<Bsc> findList(Map<String, Object> conditions);
}
