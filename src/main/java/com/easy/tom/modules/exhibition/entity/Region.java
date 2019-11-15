package com.easy.tom.modules.exhibition.entity;

import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;

import java.io.Serializable;

@TableName("u_region")
@Data
public class Region implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private String id;

    private String code;

    private String name;

    private String category;

    private String farthercode;

    private String visible;

    private String regionlevel;

}