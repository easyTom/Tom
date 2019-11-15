package com.easy.tom.modules.exhibition.model;

import java.io.Serializable;

/**
 * 文件名称： com.bsc.telmed.modules.statistic.model.DateModel.java</br>
 * 初始作者： sjl</br>
 * 创建日期： 2018年7月30日</br>
 * 功能说明： 这里用一句话描述这个类的作用--此句话需删除 <br/> 
 * 
 * =================================================<br/> 
 * 修改记录：<br/> 
 * 修改作者        日期       修改内容<br/> 
 * 
 * 
 * ================================================<br/> 
 *  Copyright (c) 2010-2011 .All rights reserved.<br/> 
 */
public class DateModel implements Serializable{

	/**
	 * 字段描述: [字段功能描述]
	 */
	private static final long serialVersionUID = 1L;
	
	private String sndDate;
	
	private int value;

	public String getSndDate() {
		return sndDate;
	}

	public void setSndDate(String sndDate) {
		this.sndDate = sndDate;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}
	
	

}
