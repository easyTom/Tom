package com.easy.tom.system.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.easy.tom.system.entity.Attachment;
import com.easy.tom.system.mapper.AttachmentMapper;
import com.easy.tom.system.service.IAttachmentService;
import org.springframework.stereotype.Service;

@Service
public class AttachmentService extends ServiceImpl<AttachmentMapper, Attachment> implements IAttachmentService {

}
