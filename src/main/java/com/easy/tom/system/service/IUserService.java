package com.easy.tom.system.service;


import com.baomidou.mybatisplus.service.IService;
import com.easy.tom.system.entity.User;

import java.util.List;

public interface IUserService extends IService<User> {

    User findUserByUserName(String name);

    List<User> findActionAliasByUserId (String userId);

}