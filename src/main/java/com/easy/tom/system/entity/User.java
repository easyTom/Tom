package com.easy.tom.system.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@TableName("u_user")
@Data
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId
	private String userId;
    /**
     * 登录账号
     */
	private String userName;
    /**
     * 真实姓名
     */
	private String realName;
    /**
     * 密码
     */
	private String password;
    /**
     * 所属单位，外键，引用U_SITE表
     */
	private String siteId;
    /**
     * 用户角色编码
     */
	private String roleCode;
    /**
     * 手机
     */
	private String mobile;
    /**
     * 性别
     */
	private String sex;
    /**
     * 邮箱
     */
	private String email;
    /**
     * 出生日期
     */
	private Date birthday;
    /**
     * 记录添加时间
     */
	private Date createTime;
    /**
     * 记录添加者
     */
	private String createUser;
    /**
     * 记录最后一次修改时间
     */
	private Date updateTime;
    /**
     * 记录最后一次修改者
     */
	private String updateUser;
    /**
     * 用户照片
     */
	private String photo;
    /**
     * 用户位置
     */
	private String regionCode;
    /**
     * 用户锁定
     */
	private Integer status;
    /**
     * 用户盐值
     */
	private String salt;


}