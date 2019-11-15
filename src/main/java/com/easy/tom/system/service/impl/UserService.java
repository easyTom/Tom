package com.easy.tom.system.service.impl;


import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.easy.tom.system.entity.User;
import com.easy.tom.system.mapper.UserMapper;
import com.easy.tom.system.service.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserService extends ServiceImpl<UserMapper,User> implements IUserService {


	@Override
	public User findUserByUserName(String name) {
		return baseMapper.findUserByUserName(name);
	}

	@Override
	public List<User> findActionAliasByUserId(String userId) {
		return baseMapper.findActionAliasByUserId(userId);
	}

}
