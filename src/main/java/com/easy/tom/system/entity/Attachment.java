package com.easy.tom.system.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
@Data
@TableName("u_attachment")
public class Attachment implements Serializable {
    private String attId;

    private String businessId;
    
    private String originalFileName;
    
    private String actualFileName;
    
    private Long fileSize;
    
    private String fileType;
    
    private Date createTime = new Date();
    @TableField(exist=false)
    private String url;
    
	private static final long serialVersionUID = 1L;

}