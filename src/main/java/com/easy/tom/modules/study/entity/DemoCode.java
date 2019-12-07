package com.easy.tom.modules.study.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@TableName("stu_demo_code")
@Data
public class DemoCode implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 主键
     */
    @TableId
    private String codeId;

    private String name;

    private String codeType;

    private Integer lookCount;

    private String text;

    private Date createTime;

    private String createBy;
}
