package com.easy.tom.modules.study.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.easy.tom.modules.study.entity.DemoCode;
import com.easy.tom.modules.study.mapper.DemoCodeMapper;
import com.easy.tom.modules.study.service.IDemoCodeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DemoCodeService extends ServiceImpl<DemoCodeMapper,DemoCode> implements IDemoCodeService {
    @Override
    public List<DemoCode> findList(Map<String, Object> conditions) {
        return baseMapper.findList(conditions);
    }

    @Override
    public int findTotal(Map<String, Object> conditions) {
        return baseMapper.findTotal(conditions);
    }
}
