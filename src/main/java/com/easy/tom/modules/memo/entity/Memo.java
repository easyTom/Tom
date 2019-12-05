package com.easy.tom.modules.memo.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@TableName("stu_memo")
@Data
public class Memo implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 主键
     */
    @TableId
    private String memoId;

    private String name;

    private String text;

    private Date createTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date hopeTime;
    private String createBy;

    private int finished;
}
