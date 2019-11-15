package com.easy.tom.modules.exhibition.model;

public class CountDTO{

    private String city;

    private Integer medCount;

    private Integer dicomCount;

    private Integer ecgCount;

    private Integer eduCount;

    private String code;

    private String realname;
    
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getMedCount() {
        return medCount;
    }

    public void setMedCount(Integer medCount) {
        this.medCount = medCount;
    }

    public Integer getDicomCount() {
        return dicomCount;
    }

    public void setDicomCount(Integer dicomCount) {
        this.dicomCount = dicomCount;
    }

    public Integer getEcgCount() {
        return ecgCount;
    }

    public void setEcgCount(Integer ecgCount) {
        this.ecgCount = ecgCount;
    }

    public Integer getEduCount() {
        return eduCount;
    }

    public void setEduCount(Integer eduCount) {
        this.eduCount = eduCount;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

    
    
}
