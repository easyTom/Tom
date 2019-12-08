package com.easy.tom.modules.api;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.easy.common.utils.IdGen;
import com.easy.common.utils.ResizeImageUtils;
import com.easy.tom.system.entity.Attachment;
import com.easy.tom.system.service.IAttachmentService;
import com.easy.tom.system.service.impl.AttachmentService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * @method:无需验证的方法
 */
@RestController
@RequestMapping("/api")
public class TomApi {

    @Value("${tom.files.path}")
    private String path;
    @Autowired
    private IAttachmentService iAttService;

    //从时间中获取路径
    public String getCalendarPath(Calendar c){
        return c.get(Calendar.YEAR) + "/" + (((c.get(Calendar.MONTH) + 1) + "").length() < 2 ? ("0" + (c.get(Calendar.MONTH) + 1)) : (c.get(Calendar.MONTH) + 1)) + "/" + ((c.get(Calendar.DAY_OF_MONTH) + "").length() < 2 ? ("0" + c.get(Calendar.DAY_OF_MONTH)) : c.get(Calendar.DAY_OF_MONTH)) + "/";
    }
    public String getFileRealPathByCreateTime(Date time,String name){
        Calendar c = Calendar.getInstance();
            c.setTime(time);
            String tempPath = path+getCalendarPath(c);
            return tempPath + name;
    }

    // 上传附件
    @PostMapping("/photoFile")
    public ResponseEntity uploadFiles(String id, HttpServletRequest request) throws IOException {
        Map<String, Object> result = new HashMap<>();
        result.put("result", false);
            MultipartHttpServletRequest multipartRequest = WebUtils.getNativeRequest(request, MultipartHttpServletRequest.class);
            // 获取上传的文件
            List<MultipartFile> fileList = multipartRequest.getFiles("photoFile");
            if(fileList != null){
                if(path.lastIndexOf("/") == -1 && path.lastIndexOf("\\\\") == -1){
                    path += "/";
                }
                for (MultipartFile multipartFile : fileList) {
                    Calendar c = Calendar.getInstance();
                    String tempPath = path + getCalendarPath(c);
                    // 将tempPath字符串中所有的\\替换成/
                    tempPath = tempPath.replaceAll("\\\\\\\\", "/");
                    // 将tempPath字符串中所有的\替换成/
                    tempPath = tempPath.replaceAll("\\\\", "/");
                    //用本来的名不安全
                   // String fileName =  IdGen.uuid() + multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf('.')) ;
                    String fileName =  IdGen.uuid() + ".png" ;
                    tempPath += fileName;
                    // 判断tempPath字符串是绝对路径还是相对路径
                    if (!(tempPath.startsWith("/") || tempPath.contains(":"))) {
                        tempPath = request.getServletContext().getRealPath("/") + tempPath;
                    }
                    File f = new File(tempPath);
                    // 如果用于保存上传文件的目录不存在则创建该目录
                    if(!f.getParentFile().exists()){
                        f.getParentFile().mkdirs();
                    }
                    multipartFile.transferTo(f);
                    Map<String, Object> imageMap = ResizeImageUtils.getImage(f.getPath());
                    ResizeImageUtils.writeThumbnails(((String) imageMap.get("imageName")).substring(0, ((String) imageMap.get("imageName")).lastIndexOf(".")),ResizeImageUtils.zoomImage((BufferedImage) imageMap.get("imageData")), f.getParent());
                    //处理逻辑
                    Attachment att = new Attachment();
                    att.setAttId(IdGen.uuid());
                    att.setBusinessId(id);
                    att.setActualFileName(f.getName());
                    att.setOriginalFileName(multipartFile.getOriginalFilename());
                    att.setFileSize(multipartFile.getSize());
                    att.setFileType(multipartFile.getContentType());
                    iAttService.insert(att);
                    result.put("result", true);
                }
            }
        return ResponseEntity.ok(result);
    }

    //获取附件
    @GetMapping("/getFileListData/{id}")
    public ResponseEntity getFileListData(@PathVariable String id, HttpServletRequest request){
        Wrapper<Attachment> wrapper = new EntityWrapper();
        wrapper.eq("BUSINESSID",id);
        List<Attachment> attList = iAttService.selectList(wrapper);
        if(attList!=null && attList.size()>=0){
            Calendar c = Calendar.getInstance();
            for (Attachment att : attList) {
                c.setTime(att.getCreateTime());
                String tempPath = getCalendarPath(c);
                att.setUrl(tempPath + att.getActualFileName());
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("result", attList);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteFile")
    public ResponseEntity deleteFile(String fileName){
        Map<String, Object> result = new HashMap<>();
        result.put("result", false);
        Wrapper<Attachment> wrapper = new EntityWrapper();
        wrapper.eq("ACTUALFILENAME",fileName);
        Attachment att = iAttService.selectOne(wrapper);
        String filePath = "";
        if(att!=null){
             filePath = getFileRealPathByCreateTime(att.getCreateTime(),fileName);
            result.put("result", true);
        }
        if(StringUtils.isEmpty(filePath)){
            return  ResponseEntity.ok(result);
        }
        File file = new File(filePath);
        if(file.exists()){
            file.delete();
        }
        File minFile = new File(filePath.substring(0,filePath.lastIndexOf("."))+"_min.png");
        if(minFile.exists()){
            minFile.delete();
        }
        iAttService.deleteById(att.getAttId());
        return ResponseEntity.ok(result);
    }
}

