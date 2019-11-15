package com.easy.tom.modules.exhibition.model;

import java.io.Serializable;

public class LectureModel implements Serializable{

    private int siteNum;

    private int doctorNum;

    public int getSiteNum() {
        return siteNum;
    }

    public void setSiteNum(int siteNum) {
        this.siteNum = siteNum;
    }

    public int getDoctorNum() {
        return doctorNum;
    }

    public void setDoctorNum(int doctorNum) {
        this.doctorNum = doctorNum;
    }
}
