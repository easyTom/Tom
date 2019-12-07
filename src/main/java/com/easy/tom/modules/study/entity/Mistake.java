package com.easy.tom.modules.study.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@TableName("stu_mistake")
@Data
public class Mistake implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 主键
     */
    @TableId
    private String mistakeId;

    private String name;

    private Integer level;

    private Integer count;

    private String text;

    private Date createTime;

    private String createBy;
}
