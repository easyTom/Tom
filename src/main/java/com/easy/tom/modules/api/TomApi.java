package com.easy.tom.modules.api;

import com.easy.common.utils.IdGen;
import com.easy.common.utils.ResizeImageUtils;
import com.easy.tom.system.entity.Attachment;
import com.easy.tom.system.service.impl.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @method:无需验证的方法
 */
@Controller
@RequestMapping("/api")
public class TomApi {

    @Value("${tom.files.path}")
    private String path;
    @Autowired
    private AttachmentService attService;

    //从时间中获取路径
    public String getCalendarPath(Calendar c){
        return c.get(Calendar.YEAR) + "/" + (((c.get(Calendar.MONTH) + 1) + "").length() < 2 ? ("0" + (c.get(Calendar.MONTH) + 1)) : (c.get(Calendar.MONTH) + 1)) + "/" + ((c.get(Calendar.DAY_OF_MONTH) + "").length() < 2 ? ("0" + c.get(Calendar.DAY_OF_MONTH)) : c.get(Calendar.DAY_OF_MONTH)) + "/";
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
                    attService.insert(att);
                    result.put("result", true);
                }
            }
        return ResponseEntity.ok(result);
    }
}

