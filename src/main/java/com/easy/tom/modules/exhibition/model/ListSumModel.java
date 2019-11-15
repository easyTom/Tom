package com.easy.tom.modules.exhibition.model;

import java.io.Serializable;

public class ListSumModel implements Serializable{

    private String siteName;

    private String patientName;

    private String sndDate;

    private String type;

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getSndDate() {
        return sndDate;
    }

    public void setSndDate(String sndDate) {
        this.sndDate = sndDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
