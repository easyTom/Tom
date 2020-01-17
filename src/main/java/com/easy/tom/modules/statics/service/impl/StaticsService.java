package com.easy.tom.modules.statics.service.impl;

import com.easy.tom.modules.statics.mapper.StaticsMapper;
import com.easy.tom.modules.statics.service.IStaticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class StaticsService implements IStaticsService {

    @Autowired
    private StaticsMapper staticsMapper;

    @Override
    public List<Map<String, Object>> getDataK(Map<String, Object> conditions) {
        return staticsMapper.getDataK(conditions);
    }
}
