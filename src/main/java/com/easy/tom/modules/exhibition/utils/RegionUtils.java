package com.easy.tom.modules.exhibition.utils;

import com.alibaba.druid.util.StringUtils;
import com.easy.tom.modules.exhibition.entity.Region;

import java.util.List;

/**
 * @method:接收前台传过来的cityCode转化成合理的格式返回
 */
public class RegionUtils {
    public static final String ERROR_CITY_CODE = "999999";

    public static String fomartCode(String code,String cityName){

        if (!StringUtils.isEmpty(cityName) && StringUtils.isEmpty(code)) {
            code = ERROR_CITY_CODE;
        }
        if (StringUtils.isEmpty(code)) {
            //code = WebUtil.getCurrentUser().getRegionCode();
        }
        if (StringUtils.isEmpty(code)) {
            code = "620000";
        }
        if (code.endsWith("0000") && code.length()<11) {
            code = code.substring(0, 2);
        } else if (code.endsWith("00")&& code.length()<11) {
            code = code.substring(0, 4);
        }
        return code;
    }
    public static String fomartCode(String code){
        if (StringUtils.isEmpty(code)) {
            code = "620000";
        }
        if (code.endsWith("0000") && code.length()<11) {
            code = code.substring(0, 2);
        } else if (code.endsWith("00")&& code.length()<11) {
            code = code.substring(0, 4);
        }
        return code;
    }

    public static String NameCheckCode(String fatherCode,List<Region> regionList){

        if(regionList ==null || regionList.size()==0)
            return null;

            for(Region r : regionList){
                if(fatherCode.equals(r.getFarthercode()))
                    return fomartCode(r.getCode());
            }
            return ERROR_CITY_CODE;
    }
}
