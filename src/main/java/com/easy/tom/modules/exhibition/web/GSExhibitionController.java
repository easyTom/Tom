package com.easy.tom.modules.exhibition.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tom/GSexhibition")
public class GSExhibitionController {
    public static final String VIEW = "backend/pages/exhibition/GS/exhibition";
    public static final String FATHERCODE = "620000";

    /*
     * 地市列表
     */
  /*  @RequestMapping("/cityCount")
    @ResponseBody
    public ResultDTO<List<CountDTO>> cityCount(String city, String year){
        EntityWrapper ew=new EntityWrapper();
        ew.eq("name",city);
        List<Region> regionList = regionService.selectList(ew);
        String cityCode = RegionUtils.NameCheckCode(FATHERCODE,regionList);
        List<CountDTO> result = HBExhibitionService.getCityCount(cityCode == null?FATHERCODE:cityCode,cityCode,year);
        return new ResultDTO<>(result);
    }*/


}
