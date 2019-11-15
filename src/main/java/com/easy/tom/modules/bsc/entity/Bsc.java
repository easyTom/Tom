package com.easy.tom.modules.bsc.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@TableName("stu_bsc")
@Data
public class Bsc implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 主键
     */
    @TableId
    private String bscId;

    private String name;

    private String type;

    private String text;

    private Date createTime;

    private String createBy;
}
