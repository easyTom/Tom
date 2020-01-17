package com.easy.tom.modules.statics.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface StaticsMapper {
    List<Map<String,Object>> getDataK(Map<String, Object> conditions);
}
