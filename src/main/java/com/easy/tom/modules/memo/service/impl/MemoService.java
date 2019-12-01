package com.easy.tom.modules.memo.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.easy.tom.modules.memo.entity.Memo;
import com.easy.tom.modules.memo.mapper.MemoMapper;
import com.easy.tom.modules.memo.service.IMemoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MemoService extends ServiceImpl<MemoMapper,Memo> implements IMemoService {
    @Override
    public List<Memo> findList(Map<String, Object> conditions) {
        return baseMapper.findList(conditions);
    }

    @Override
    public int findTotal(Map<String, Object> conditions) {
        return baseMapper.findTotal(conditions);
    }
}
