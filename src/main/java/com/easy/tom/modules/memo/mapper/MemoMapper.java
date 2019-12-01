package com.easy.tom.modules.memo.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.easy.tom.modules.memo.entity.Memo;

import java.util.List;
import java.util.Map;

public interface MemoMapper extends BaseMapper<Memo> {
    int findTotal(Map<String, Object> conditions);

    List<Memo> findList(Map<String, Object> conditions);
}
