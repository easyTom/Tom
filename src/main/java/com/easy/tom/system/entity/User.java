package com.easy.tom.system.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

import javax.annotation.security.DenyAll;
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
	private String userid;
    /**
     * 登录账号
     */
	private String username;
    /**
     * 真实姓名
     */
	private String realname;
    /**
     * 密码
     */
	private String password;
    /**
     * 所属单位，外键，引用U_SITE表
     */
	private String siteid;
    /**
     * 用户角色编码
     */
	private String rolecode;
    /**
     * 手机
     */
	private String mobile;
    /**
     * 邮箱
     */
	private String email;
    /**
     * 出生日期
     */
	private Date birthdate;
    /**
     * 记录添加时间
     */
	private Date createtime;
    /**
     * 记录添加者
     */
	private String createuser;
    /**
     * 记录最后一次修改时间
     */
	private Date updatetime;
    /**
     * 记录最后一次修改者
     */
	private String updateuser;
    /**
     * 用户照片
     */
	private String photo;

	private String regionCode;


}