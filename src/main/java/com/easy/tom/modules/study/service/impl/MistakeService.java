package com.easy.tom.modules.study.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.easy.tom.modules.study.entity.Mistake;
import com.easy.tom.modules.study.mapper.MistakeMapper;
import com.easy.tom.modules.study.service.IMistakeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MistakeService extends ServiceImpl<MistakeMapper,Mistake> implements IMistakeService {
    @Override
    public List<Mistake> findList(Map<String, Object> conditions) {
        return baseMapper.findList(conditions);
    }

    @Override
    public int findTotal(Map<String, Object> conditions) {
        return baseMapper.findTotal(conditions);
    }
}
