package com.easy.tom.system.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.easy.tom.system.entity.User;

import java.util.List;

public interface UserMapper extends BaseMapper<User>{

	User findUserByUserName(String name);

	List<User> findActionAliasByUserId(String userId);
}