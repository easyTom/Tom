package com.bsc.sum.modules.exhibition.service.impl;

import com.bsc.sum.modules.exhibition.service.IndexNYService;
import com.easy.tom.modules.exhibition.mapper.IndexNYMapper;
import com.easy.tom.modules.exhibition.model.DateModel;
import com.easy.tom.modules.exhibition.model.LectureModel;
import com.easy.tom.modules.exhibition.model.ListSumModel;
import com.easy.tom.modules.exhibition.model.UserModel;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("IndexNYServiceImpl")
public class IndexNYServiceImpl implements IndexNYService {

	@Resource
	private IndexNYMapper indexNYMapper;
	
	@Override
	public List<UserModel> getEcgMonitor(String cityCode) {
		return indexNYMapper.getEcgMonitor(cityCode);
	}

	@Override
	public List<UserModel> getRadiologyMonitor(String cityCode) {
		return indexNYMapper.getRadiologyMonitor(cityCode);
	}

	@Override
	public List<UserModel> getTeleconsultationMonitor(String cityCode) {
		return indexNYMapper.getTeleconsultationMonitor(cityCode);
	}

	@Override
	public List<DateModel> getWeekEcgMonitor(String cityCode) {
		return indexNYMapper.getWeekEcgMonitor(cityCode);
	}

	@Override
	public List<DateModel> getWeekRadiologyMonitor(String cityCode) {
		return indexNYMapper.getWeekRadiologyMonitor(cityCode);
	}

	@Override
	public List<DateModel> getWeekTeleconsultationMonitor(String cityCode) {
		return indexNYMapper.getWeekTeleconsultationMonitor(cityCode);
	}

	@Override
	public Integer getCityEcgMonitor(Map<String,String> map) {
		return indexNYMapper.getCityEcgMonitor(map);
	}

	@Override
	public Integer getCityRadiologyMonitor(Map<String,String> map) {
		return indexNYMapper.getCityRadiologyMonitor(map);
	}

	@Override
	public Integer getCityTeleconsultationMonitor(Map<String,String> map) {
		return indexNYMapper.getCityTeleconsultationMonitor(map);
	}

	@Override
	public List<UserModel> getEcgRanking() {
		return indexNYMapper.getEcgRanking();
	}

	@Override
	public List<UserModel> getRadiologyRanking() {
		return indexNYMapper.getRadiologyRanking();
	}

	@Override
	public List<UserModel> getTeleconsultationRanking() {
		return indexNYMapper.getTeleconsultationRanking();
	}

	@Override
	public LectureModel getEduCount(String cityCode) {
		return indexNYMapper.getEduCount(cityCode);
	}

	@Override
	public List<DateModel> getWeekEduMonitor(String cityCode) {
		return indexNYMapper.getWeekEduMonitor(cityCode);
	}

	@Override
	public Integer getEduAudienceSiteCount() {
		return indexNYMapper.getEduAudienceSiteCount();
	}

	@Override
	public Integer getEduAudienceDoctorCount() {
		return indexNYMapper.getEduAudienceDoctorCount();
	}

	@Override
	public Integer getCityEduMonitor(Map<String,String> map) {
		return indexNYMapper.getCityEduMonitor(map);
	}

	@Override
	public List<UserModel> getOutSite() {
		return indexNYMapper.getOutSite();
	}

	@Override
	public List<UserModel> getDoctor(String itemType) {
		return indexNYMapper.getDoctor(itemType);
	}

    @Override
    public int getEduNum(String cityCode) {
        return indexNYMapper.getEduNum(cityCode);
    }

    @Override
    public Integer[] getSite() {
        return indexNYMapper.getSite();
    }

    @Override
    public List<UserModel> getEduMonitor(String cityCode) {
        return indexNYMapper.getEduMonitor(cityCode);
    }

    @Override
    public List<UserModel> getSiteLevel(String cityCode) {
        return indexNYMapper.getSiteLevel(cityCode);
    }

    @Override
    public List<ListSumModel> findSum(String cityCode) {
        return indexNYMapper.findSum(cityCode);
    }


    @Override
	public Integer getOutScheduleCount() {
		return indexNYMapper.getOutScheduleCount();
	}

	@Override
	public Integer getUltrasoundCount() {
		return indexNYMapper.getUltrasoundCount();
	}

	@Override
	public Integer getRefCount() {
		return indexNYMapper.getRefCount();
	}

	@Override
	public Integer getInspCount() {
		return indexNYMapper.getInspCount();
	}

	@Override
	public Integer getSurgeryCount() {
		return indexNYMapper.getSurgeryCount();
	}
	
}
