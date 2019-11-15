package com.bsc.sum.modules.exhibition.service;


import com.easy.tom.modules.exhibition.model.DateModel;
import com.easy.tom.modules.exhibition.model.LectureModel;
import com.easy.tom.modules.exhibition.model.ListSumModel;
import com.easy.tom.modules.exhibition.model.UserModel;

import java.util.List;
import java.util.Map;

public interface IndexNYService {

	 List<UserModel> getEcgMonitor(String cityCode);
	 
	 List<UserModel> getRadiologyMonitor(String cityCode);
	 
	 List<UserModel> getTeleconsultationMonitor(String cityCode);
	 
	 List<DateModel> getWeekEcgMonitor(String cityCode);
	 
	 List<DateModel> getWeekRadiologyMonitor(String cityCode);
	 
	 List<DateModel> getWeekTeleconsultationMonitor(String cityCode);
	 
	 Integer 	getCityEcgMonitor(Map<String, String> map);

	 Integer getCityRadiologyMonitor(Map<String, String> map);

	 Integer getCityTeleconsultationMonitor(Map<String, String> map);

	 Integer 	getCityEduMonitor(Map<String, String> map);
	 
	 List<UserModel> getEcgRanking();
	 
	 List<UserModel> getRadiologyRanking();
	 
	 List<UserModel> getTeleconsultationRanking();
	 
	 LectureModel getEduCount(String cityCode);
	 
	 Integer getEduAudienceSiteCount();
	 
	 Integer getEduAudienceDoctorCount();
	 
	 Integer getOutScheduleCount();
	 
	 Integer getUltrasoundCount();
	 
	 Integer getRefCount();
	 
	 Integer getInspCount();
	 
	 Integer getSurgeryCount();
	 
	 List<DateModel> getWeekEduMonitor(String cityCode);
	 
	 List<UserModel> getOutSite();
	 
	 List<UserModel> getDoctor(String itemType);


    int getEduNum(String cityCode);

    Integer[] getSite();

    List<UserModel> getEduMonitor(String cityCode);

    List<UserModel> getSiteLevel(String cityCode);

    List<ListSumModel> findSum(String cityCode);
}
