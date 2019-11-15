package com.easy.tom.modules.bsc.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.easy.tom.modules.bsc.entity.Bsc;
import com.easy.tom.modules.bsc.mapper.BscMapper;
import com.easy.tom.modules.bsc.service.IBscService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BscService extends ServiceImpl<BscMapper,Bsc> implements IBscService {
    @Override
    public List<Bsc> findList(Map<String, Object> conditions) {
        return baseMapper.findList(conditions);
    }

    @Override
    public int findTotal(Map<String, Object> conditions) {
        return baseMapper.findTotal(conditions);
    }
}
