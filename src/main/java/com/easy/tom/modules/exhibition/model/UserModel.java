package com.easy.tom.modules.exhibition.model;


import java.io.Serializable;

public class UserModel implements Serializable{


    /**
	 * 系列化id 
	 */
	private static final long serialVersionUID = 1L;

	private  String name;

    private int value;


    public int getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserModel() {};

    public UserModel(String name, int value) {
        this.value = value;
        this.name = name;

    }
}
