/*
Navicat MySQL Data Transfer

Source Server         : bsctelmed
Source Server Version : 50557
Source Host           : 127.0.0.1:3306
Source Database       : easytom

Target Server Type    : MYSQL
Target Server Version : 50557
File Encoding         : 65001

Date: 2019-12-17 17:40:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for stu_bsc
-- ----------------------------
DROP TABLE IF EXISTS `stu_bsc`;
CREATE TABLE `stu_bsc` (
  `BSCID` varchar(36) NOT NULL COMMENT '主键',
  `NAME` varchar(50) NOT NULL COMMENT '名称',
  `TYPE` varchar(50) NOT NULL COMMENT '类别',
  `TEXT` longtext NOT NULL COMMENT '内容',
  `CREATETIME` datetime NOT NULL COMMENT '创建时间',
  `CREATEBY` varchar(100) NOT NULL COMMENT '创建人',
  PRIMARY KEY (`BSCID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of stu_bsc
-- ----------------------------
INSERT INTO `stu_bsc` VALUES ('06394f29c0da4c5883e8bc1d16cc2572', '甘肃Sum', '修改BUG', '教育统计加上日期条件  kettle启动', '2019-12-13 10:48:56', 'tom');
INSERT INTO `stu_bsc` VALUES ('087b0391a0ce45b291caa41adcbc7628', '甘肃会诊BUG', '修改BUG', '会诊 登陆 甘肃中医药大学附属医院 报错 JSON valid  network都是200  所以是json解析错误\r\n是多了一个制表符 ‘\\t’', '2019-12-02 11:00:21', 'tom');
INSERT INTO `stu_bsc` VALUES ('0abc66e2b4c24a04bee02fcb283c8cc2', '甘肃服务器远程方式', '远程相关', '先让甘肃人员开启frpc\r\n\r\n密码：     GSwjw@1234!\r\nmstsc：     218.247.6.82:38966', '2019-12-17 16:51:26', 'tom');
INSERT INTO `stu_bsc` VALUES ('0d639a90bec54299aa1e6fbb4880de64', '超声更新', '新增功能', '超声跟外厂对接结束。新增统计图，样式调整以及BUG修改，首页，导出功能。', '2019-11-22 17:17:00', 'tom');
INSERT INTO `stu_bsc` VALUES ('1508b35c0ea2407993c227634953e344', 'bsc1&湖南', '远程相关', '本地开启frpc\r\n\r\n密码：Chinabsc123!@#\r\nmstsc：127.0.0.1:10289', '2019-12-17 16:59:35', 'tom');
INSERT INTO `stu_bsc` VALUES ('2ba6cdec5b124d0599e39ba7d29f17e3', '襄阳远程', '远程相关', 'mstsc：219.139.176.171:10086\r\n密码：Chinabsc123', '2019-12-17 17:07:52', 'tom');
INSERT INTO `stu_bsc` VALUES ('2bb4cdfa5f1f42dfb7e986a2c3834825', '襄阳教育', '部署更新', '更新襄阳教育。 linux服务器', '2019-11-13 17:29:53', 'tom');
INSERT INTO `stu_bsc` VALUES ('2d694bd6227444fb9162766531dffa42', '超声修改', '新增功能', '111', '2019-12-05 17:28:20', 'tom');
INSERT INTO `stu_bsc` VALUES ('4f93e2c0039f487ea7e12db1fcee91ad', '心电BUG', '修改BUG', 'sql分组 。\r\n错误改成 examid分组 \r\n之前错误原因是错误数据。', '2019-11-25 15:24:01', 'tom');
INSERT INTO `stu_bsc` VALUES ('588cf975d0354bdb8a92b3555bd30030', '心电BUG', '修改BUG', '卫健委角色的sql有问题 ', '2019-12-11 15:38:06', 'tom');
INSERT INTO `stu_bsc` VALUES ('624de2741f6e42078fb07e32ae5eecf0', '超声修改', '部署更新', '地址提取为变量  业务地址对接方改变  配合申家龙测试', '2019-12-17 17:31:47', 'tom');
INSERT INTO `stu_bsc` VALUES ('64fb33d0d2dd49079115fa3eb2e50c03', '湖南心电', '修改BUG', 'admin通过医院名搜索和上医院搜索结果不一样，原因是left join 和 inner join 或者说查到了俩表关联 但是未曾报告的数据', '2019-11-22 17:13:42', 'tom');
INSERT INTO `stu_bsc` VALUES ('6baa6e4f6642481f8d414d09c3ce1107', '心电BUG', '修改BUG', '回收站和列表sidebar显示错误。 回收站有新增按钮错误，接收列表查询从left join变成join', '2019-12-12 15:56:37', 'tom');
INSERT INTO `stu_bsc` VALUES ('9caa8f01eeaf4d2dae0b219cf792ac0c', '甘肃sum', '修改BUG', '大屏统计教育从听课人数改成课程总数', '2019-12-11 15:33:06', 'tom');
INSERT INTO `stu_bsc` VALUES ('a526623941614302a47f7ba4c06119e4', '襄阳超声部署', '部署更新', 'BUG 是 LoginFilter错', '2019-12-06 18:26:24', 'tom');
INSERT INTO `stu_bsc` VALUES ('b19e9795dbe74191869623d3b99188f8', 'Git教育', '新增功能', '教育前端直播样式调整，查询条件改为只查询今日后的直播。状态跟后台保持一致。', '2019-11-13 17:31:08', 'tom');
INSERT INTO `stu_bsc` VALUES ('b2b267dd2ae94379ba6d33598bbf85c6', '心电统计查看具体列表', '新增功能', '1', '2019-12-17 16:47:46', 'tom');
INSERT INTO `stu_bsc` VALUES ('c538daa3774548c5a0a0696911faed9c', '修改超声部分问题', '修改BUG', '修改BUG以及更改样式 ', '2019-11-29 10:28:35', 'tom');
INSERT INTO `stu_bsc` VALUES ('cb3309c040664a5cba1e570cd94b4f0f', '甘肃Sum', '修改BUG', '右侧滚动出不来 是因为kettle没抓取数据 申 说有人给kettle脚本关了', '2019-12-16 10:56:55', 'tom');
INSERT INTO `stu_bsc` VALUES ('ce906d5c345a463c85568a43f54b98cd', '心电提醒功能', '新增功能', '心电增加提醒功能', '2019-12-17 16:47:08', 'tom');
INSERT INTO `stu_bsc` VALUES ('d75d1e2f90be4f6e825f0c29780c6a55', '甘肃心电', '部署更新', '68服务器', '2019-12-12 15:55:42', 'tom');
INSERT INTO `stu_bsc` VALUES ('e1a76dfc76744ecd899fba31413a1eec', '甘肃会诊', '修改BUG', '甘谷县中医医院 这个医院存在2个  解决方法:删除了一个，并在该表加上了唯一索引。', '2019-12-04 17:26:25', 'tom');
INSERT INTO `stu_bsc` VALUES ('ed3d58bddbca4956b7493f114395339e', '超声状态背景颜色随着鼠标滑过而变化', '修改BUG', ' $(\'td\', row).eq(7).css(\"background-color\", \"yellow\");\r\n改为\r\n   $(\'td\',row).eq(7).css(\"cssText\", \"background-color: yellow !important\").html(\"待处理\");\r\n上面的不支持!important', '2019-11-26 17:20:15', 'tom');
INSERT INTO `stu_bsc` VALUES ('f53f7907193041f68d24aa47d7ab9a69', '心电更新', '新增功能', '心电增加卫计局角色 查看一些统计', '2019-11-22 17:15:30', 'tom');

-- ----------------------------
-- Table structure for stu_demo_code
-- ----------------------------
DROP TABLE IF EXISTS `stu_demo_code`;
CREATE TABLE `stu_demo_code` (
  `CODEID` varchar(36) NOT NULL COMMENT '主键',
  `NAME` varchar(50) NOT NULL COMMENT '名称',
  `CODETYPE` varchar(50) DEFAULT NULL COMMENT '标签',
  `LOOKCOUNT` int(10) DEFAULT '0' COMMENT '热度',
  `TEXT` longtext NOT NULL COMMENT '内容',
  `CREATETIME` datetime NOT NULL COMMENT '创建时间',
  `CREATEBY` varchar(100) NOT NULL COMMENT '创建人',
  `LEVEL` int(10) DEFAULT '1' COMMENT '等级',
  PRIMARY KEY (`CODEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of stu_demo_code
-- ----------------------------
INSERT INTO `stu_demo_code` VALUES ('064f50daa00c45a39780f5647d1932cb', 'expect identifier；gitbash右键不能全局使用', null, '0', '<p><br></p><p>1.</p><p><img src=\"http://localhost:8821//EasyTom/data/2019/12/16/f9b75c234cd9452ab31b694b9e6f7b92.png\" style=\"width: 500px; height: 300px;\" class=\"fr-fic fr-dib fr-fil\"></p><p><br></p><p>2.</p><p><img data-fr-image-pasted=\"true\" src=\"http://localhost:8821//EasyTom/data/2019/12/16/d052abf9d52a4aec8840d6956e05e598.png\" style=\"box-sizing: border-box; border: 0px; cursor: pointer; max-width: 100%; text-align: left; color: rgb(65, 65, 65); font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; width: 700px; height: 400px; border-radius: 0px !important;\" class=\"fr-fil fr-dib\"></p><p><img src=\"http://localhost:8821//EasyTom/data/2019/12/16/34a320d2eb6441fcb1a0e28f9967ad46.png\" style=\"width: 719px; height: 410.857px;\" class=\"fr-fic fr-dib fr-fil\"><img src=\"http://localhost:8821//EasyTom/data/2019/12/16/f31c2bc497cf432fa6854e090a62f5b6.png\" style=\"width: 799px; height: 399.5px;\" class=\"fr-fic fr-dib fr-fil\"><img src=\"http://localhost:8821//EasyTom/data/2019/12/16/e94b80861aa3488ebe9700b4e04d8846.png\" style=\"width: 646px;\" class=\"fr-fic fr-fil fr-dib\"></p>', '2019-12-16 17:09:04', 'tom', '1');

-- ----------------------------
-- Table structure for stu_memo
-- ----------------------------
DROP TABLE IF EXISTS `stu_memo`;
CREATE TABLE `stu_memo` (
  `MEMOID` varchar(36) NOT NULL COMMENT '主键',
  `NAME` varchar(50) NOT NULL COMMENT '名称',
  `TEXT` longtext NOT NULL COMMENT '内容',
  `CREATETIME` datetime NOT NULL COMMENT '创建时间',
  `HOPETIME` datetime DEFAULT NULL COMMENT '期望完成时间',
  `CREATEBY` varchar(100) NOT NULL COMMENT '创建人',
  `FINISHED` int(10) DEFAULT '0' COMMENT '0未完成 1已完成',
  PRIMARY KEY (`MEMOID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of stu_memo
-- ----------------------------
INSERT INTO `stu_memo` VALUES ('124bba6beacc4df5b6e85322f5812a62', '甘肃大屏修改', '王总先设计表  ', '2019-12-17 16:48:40', '2019-12-22 00:00:00', 'tom', '0');
INSERT INTO `stu_memo` VALUES ('33d9e71a86c5472c996f1f1ab43b9249', '让附件加上删除功能', '附件下面加个按钮删除或者其他实现方法', '2019-12-06 14:57:28', '2019-12-09 00:00:00', 'tom', '1');
INSERT INTO `stu_memo` VALUES ('570048f5b97042ee87e9f00856fc7c7a', '心电提醒功能', '等索做好的', '2019-12-09 14:24:14', '2019-12-10 00:00:00', 'tom', '1');
INSERT INTO `stu_memo` VALUES ('aeb5b0027e744a4d865f90c906f55668', '心电手写板', '1', '2019-12-13 10:49:26', '2019-12-16 00:00:00', 'tom', '0');
INSERT INTO `stu_memo` VALUES ('beeb15bf586542aa976aee5225263e2d', '将修改和添加通用', '将修改和添加通用', '2019-12-05 15:47:30', '2019-12-12 00:00:00', 'tom', '1');
INSERT INTO `stu_memo` VALUES ('d1d2774c16ac4b7ebaa10bb82978c494', '阿里云打折', '123', '2019-12-05 09:50:13', null, 'tom', '0');

-- ----------------------------
-- Table structure for stu_mistake
-- ----------------------------
DROP TABLE IF EXISTS `stu_mistake`;
CREATE TABLE `stu_mistake` (
  `MISTAKEID` varchar(36) NOT NULL COMMENT '主键',
  `NAME` varchar(50) NOT NULL COMMENT '名称',
  `LEVEL` int(10) DEFAULT '1' COMMENT '等级',
  `COUNT` int(10) DEFAULT '0' COMMENT '关注次数',
  `TEXT` longtext NOT NULL COMMENT '内容',
  `CREATETIME` datetime NOT NULL COMMENT '创建时间',
  `CREATEBY` varchar(100) NOT NULL COMMENT '创建人',
  PRIMARY KEY (`MISTAKEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of stu_mistake
-- ----------------------------

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `ROLEID` varchar(36) NOT NULL COMMENT '主键',
  `USERID` varchar(36) NOT NULL COMMENT '用户ID',
  `roles` varchar(100) NOT NULL COMMENT '权限',
  PRIMARY KEY (`ROLEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------

-- ----------------------------
-- Table structure for u_attachment
-- ----------------------------
DROP TABLE IF EXISTS `u_attachment`;
CREATE TABLE `u_attachment` (
  `ATTID` varchar(36) NOT NULL COMMENT '主键',
  `BUSINESSID` varchar(50) NOT NULL COMMENT '名称',
  `ORIGINALFILENAME` varchar(50) NOT NULL COMMENT '名称',
  `ACTUALFILENAME` varchar(50) NOT NULL COMMENT '名称',
  `FILESIZE` varchar(50) NOT NULL COMMENT '名称',
  `FILETYPE` varchar(200) DEFAULT NULL COMMENT '类别',
  `CREATETIME` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`ATTID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of u_attachment
-- ----------------------------
INSERT INTO `u_attachment` VALUES ('035a141e9b484d5485b4a6552d158bdc', 'froalaEditor', '1576563961369.png', '565230f23eb44b0fa553a8c2ff2a58f7.png', '5813', 'image/png', '2019-12-17 14:26:01');
INSERT INTO `u_attachment` VALUES ('195b0b1008b24ef9a75e03e97ec46d97', 'b19e9795dbe74191869623d3b99188f8', '忍3的id.txt', '忍3的id.txt', '39', 'text/plain', '2019-12-12 17:39:14');
INSERT INTO `u_attachment` VALUES ('1c23b871486447d3aecc483cab78b091', 'dc5203d3e4274e10b3d296ce6dc245c3', '1576565104202.png', 'ac2c398d1bf449389277a87a6865ecf0.png', '1120', 'image/png', '2019-12-17 14:45:04');
INSERT INTO `u_attachment` VALUES ('1e0e65ef5cff4e33b982243aa5433b53', 'froalaEditor', '1576487308802.png', '34a320d2eb6441fcb1a0e28f9967ad46.png', '29995', 'image/png', '2019-12-16 17:08:28');
INSERT INTO `u_attachment` VALUES ('1f145c6862554372a814274b9a0c7d4f', '895b822d7d80457eba4abce20b14c8df', '1576565042264.png', '149de607fc63483d9c33c1df72661482.png', '2782', 'image/png', '2019-12-17 14:44:02');
INSERT INTO `u_attachment` VALUES ('27bfcdce2c9a4409a244829f3e7656f9', 'froalaEditor', '1576487323320.png', 'd052abf9d52a4aec8840d6956e05e598.png', '48380', 'image/png', '2019-12-16 17:08:43');
INSERT INTO `u_attachment` VALUES ('2a029b0fbe2349cfa5b2f61481622ef9', '7f2e23ee8ab243b1ada85d3356154ab8', '1576564895809.png', 'e69705cdebc045f99aba041539a5cccc.png', '4733', 'image/png', '2019-12-17 14:41:35');
INSERT INTO `u_attachment` VALUES ('2ba8625a98c64eb384d954584b744ed3', 'dbdd5462bc3942548a93b0bd62d86b02', '1576566998254.png', 'a8ce094351e142edacf9a475c9427b98.png', '1397', 'image/png', '2019-12-17 15:16:43');
INSERT INTO `u_attachment` VALUES ('2c967b39c03c4d71be703542728cfd79', 'froalaEditor', '1576489050399.png', 'b18793b2c6754f5d95899eea4e03b4a1.png', '7138', 'image/png', '2019-12-16 17:37:30');
INSERT INTO `u_attachment` VALUES ('2d8b68b0d9a24b7d9b6c8a3d7ce92013', '588cf975d0354bdb8a92b3555bd30030', '22222825.bmp', '19d37277f7e249d0b20fe335b608076d.png', '1553122', 'image/bmp', '2019-12-11 15:38:37');
INSERT INTO `u_attachment` VALUES ('3384cabdf04e4bcfaefa72eb0ab688e1', '087b0391a0ce45b291caa41adcbc7628', '微信图片_20191202110220.png', 'd495126fc5224ee0b31ecba15dd2c9c7.png', '2217', 'image/png', '2019-12-02 11:02:46');
INSERT INTO `u_attachment` VALUES ('390682f8f75c4c8eaf18a4bcce63b52f', 'froalaEditor', '1576487335250.png', 'e94b80861aa3488ebe9700b4e04d8846.png', '78986', 'image/png', '2019-12-16 17:08:55');
INSERT INTO `u_attachment` VALUES ('3921b68efd784c2cbbde9a811488cc31', 'froalaEditor', '1576487607174.png', 'd67fbe3dcee446e0b9cf80ac43172063.png', '8731', 'image/png', '2019-12-16 17:13:27');
INSERT INTO `u_attachment` VALUES ('4d40f68dd4f64c86b9f048c98e91b28c', 'b19e9795dbe74191869623d3b99188f8', '111.bmp', '9b839f69d54b4578bf06a22a9256be93.png', '416294', 'image/bmp', '2019-12-12 17:38:54');
INSERT INTO `u_attachment` VALUES ('52299e648b8b450d9ddefe34f391ab8e', 'b19e9795dbe74191869623d3b99188f8', 'QQ截图20191118145742.bmp', 'facdbeef795a4c54a404734e8b8e128e.png', '135734', 'image/bmp', '2019-12-06 16:50:55');
INSERT INTO `u_attachment` VALUES ('5b64b3724de0489fa0281bfca0b0a864', 'froalaEditor', 'editor.jpg', 'e560c3e28d2a42de87177dd4522ff790.png', '133152', 'image/jpeg', '2019-12-16 16:59:29');
INSERT INTO `u_attachment` VALUES ('5dd5540c34c941e98f0be70304d457fe', 'froalaEditor', '1576563769532.png', '3fd642c9d38a4230bb763ed4b9080dde.png', '69296', 'image/png', '2019-12-17 14:22:49');
INSERT INTO `u_attachment` VALUES ('5f5f0eed59d84adda881c83ec720b081', 'froalaEditor', 'editor.jpg', '160e24ed54ec4835b15d82a2c545bcfc.png', '133152', 'image/jpeg', '2019-12-16 16:46:35');
INSERT INTO `u_attachment` VALUES ('638d9eb369d84ff38c241550e23fca94', 'froalaEditor', '1576487454559.png', '4c9897b1b8a74b6092d0ed5a6efe8816.png', '11347', 'image/png', '2019-12-16 17:10:54');
INSERT INTO `u_attachment` VALUES ('68945ac4dbcb4032992d1db161089309', 'de03017f340147fa86563716f3da0baf', '1576565755948.png', '42960a62d99947cdb4ad5cce15e39617.png', '2114', 'image/png', '2019-12-17 14:56:02');
INSERT INTO `u_attachment` VALUES ('6c8c09f4fb614526895cdee0099e460e', '1508b35c0ea2407993c227634953e344', 'frpc-bsc1.rar', 'frpc-bsc1.rar', '2121942', 'application/octet-stream', '2019-12-17 17:00:36');
INSERT INTO `u_attachment` VALUES ('6eb2243dee944ca296592af3d0ced006', 'froalaEditor', 'editor.jpg', 'd3fdac3432604441abe826f5dab28c3e.png', '133152', 'image/jpeg', '2019-12-16 16:54:34');
INSERT INTO `u_attachment` VALUES ('6f64ba8732c94a3281e753294f388d03', '0abc66e2b4c24a04bee02fcb283c8cc2', '微信图片_20191217165534.jpg', '484f5f1236ff41349b425d6774db4ec2.png', '146950', 'image/jpeg', '2019-12-17 16:55:54');
INSERT INTO `u_attachment` VALUES ('75bc290a46f44b18a3c59ef952dfae79', 'eaa444a573324ce3a61fb3628c241acb', '1576566069831.png', '08c4fdce1f5b4bceb22044f4b8704520.png', '5873', 'image/png', '2019-12-17 15:01:13');
INSERT INTO `u_attachment` VALUES ('79e57f95153b42f6b48a68aa6b27e8d2', 'froalaEditor', 'editor.jpg', '38a0069779a848f8919616df589d4124.png', '133152', 'image/jpeg', '2019-12-16 17:06:10');
INSERT INTO `u_attachment` VALUES ('7b5cc65ec1154f0cb0824866839de8ee', '0d639a90bec54299aa1e6fbb4880de64', '远程超声修改意见20191129.docx', '远程超声修改意见20191129.docx', '382627', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2019-12-17 17:27:56');
INSERT INTO `u_attachment` VALUES ('7ff49e101bf74bc2a27609ae2161f970', 'froalaEditor', 'editor.jpg', 'b49e7040b67d400ca502b56bd68ea2f2.png', '133152', 'image/jpeg', '2019-12-16 15:22:46');
INSERT INTO `u_attachment` VALUES ('80ddc2a07dc846b0b7244a004690ab55', 'froalaEditor', '1576481551734.png', '81ebcaed335e417ebdc17b97adbb42da.png', '10687', 'image/png', '2019-12-16 15:32:31');
INSERT INTO `u_attachment` VALUES ('8322037fd7a54828a03a73a84d4adc84', 'b19e9795dbe74191869623d3b99188f8', '33A621C8-5247-4FB9-AA54-8FD5350DE5FE.jpeg', '33cb88fe579748a6a842b4270c3e64a5.png', '2394882', 'image/jpeg', '2019-12-09 15:50:37');
INSERT INTO `u_attachment` VALUES ('84be9b8f00c9400cb228b07590627f00', 'b19e9795dbe74191869623d3b99188f8', 'ecg_template.sql', 'ecg_template.sql', '823', 'application/octet-stream', '2019-12-12 16:42:26');
INSERT INTO `u_attachment` VALUES ('8644192aa22e43fdb4f7ee8ba6d03b23', '674370e189ef42769fbe31037e2775f3', '1576567017963.png', '3e4b727838694d838310897c772b678d.png', '1475', 'image/png', '2019-12-17 15:16:58');
INSERT INTO `u_attachment` VALUES ('8e60840f9ce64fe3a83369a61ee1f0c2', 'froalaEditor', '1576489053701.png', '33104d21e8004f4e99912cfca94d5845.png', '7138', 'image/png', '2019-12-16 17:37:33');
INSERT INTO `u_attachment` VALUES ('937b5341adb64cbeb29d56314861f0ba', 'froalaEditor', '1576488590496.png', '7584877273194447a8716fb1d89482bd.png', '7606', 'image/png', '2019-12-16 17:29:50');
INSERT INTO `u_attachment` VALUES ('9906314068294ce0beb011cf0e95b23b', 'e1a76dfc76744ecd899fba31413a1eec', '微信图片_20191204172722.png', 'bffce9fd3d81478787eb0cffe9e19d36.png', '13428', 'image/png', '2019-12-04 17:28:11');
INSERT INTO `u_attachment` VALUES ('9a7a42df96d744f5a1298d8bb6281016', 'ed3d58bddbca4956b7493f114395339e', 'QQ截图20191118145742.bmp', 'badeff5d19f04433a24a020e2c21ce1a.bmp', '135734', 'image/bmp', '2019-11-29 17:25:10');
INSERT INTO `u_attachment` VALUES ('9ed29b80b1114a98abb08688d913823c', '0abc66e2b4c24a04bee02fcb283c8cc2', '林可-甘肃远程-20190625.zip', '林可-甘肃远程-20190625.zip', '2601346', 'application/x-zip-compressed', '2019-12-17 16:54:52');
INSERT INTO `u_attachment` VALUES ('a5543c58fedd40d6b8a50fa5450beae3', '9b552582d9af4611bf853311ad75541a', '1576564753042.png', 'f8ec50caff674b01b8ba1439246c11b8.png', '9352', 'image/png', '2019-12-17 14:39:13');
INSERT INTO `u_attachment` VALUES ('a657c86644b448ba9f0b053c4b67d816', '0d639a90bec54299aa1e6fbb4880de64', '远程超声修改意见20191125.docx', '远程超声修改意见20191125.docx', '496373', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2019-12-17 17:24:25');
INSERT INTO `u_attachment` VALUES ('acdc5deac5f34c2791ce1d540feafe1b', 'froalaEditor', '1576485984870.png', 'f3d01ed2f9f54d468403e50a2e0fc92a.png', '13804', 'image/png', '2019-12-16 16:46:24');
INSERT INTO `u_attachment` VALUES ('b22ecbe725894a4a8dbe62676c245ef9', 'froalaEditor', '1576487222914.png', 'f9b75c234cd9452ab31b694b9e6f7b92.png', '22589', 'image/png', '2019-12-16 17:07:02');
INSERT INTO `u_attachment` VALUES ('b529904540c94dcb8d83093b031999ee', '624de2741f6e42078fb07e32ae5eecf0', '微信图片_20191217173103.png', '98fa14b42d5748f797add8aa5cf1f149.png', '10546', 'image/png', '2019-12-17 17:32:03');
INSERT INTO `u_attachment` VALUES ('ba86c96a59a344e4aa76e8a89fb1a904', '26533d267d5b4658a39c6d8502ca356d', '1576565611444.png', 'd819d2acd6aa4e418c23c877eede64db.png', '33935', 'image/png', '2019-12-17 14:54:11');
INSERT INTO `u_attachment` VALUES ('c2f9b6b48dea4f4f97f82e98dc47a105', 'ae6bb6fd47a240c5a9f35dda50446fce', '1576565109558.png', '56799af85ad74d6289bf96a9cc76b060.png', '1288', 'image/png', '2019-12-17 14:45:09');
INSERT INTO `u_attachment` VALUES ('d07496d857124cd884327b24ca114aaa', '9caa8f01eeaf4d2dae0b219cf792ac0c', '111.bmp', 'c09cd199afec450896df4b2c16358cdc.png', '416294', 'image/bmp', '2019-12-11 15:34:00');
INSERT INTO `u_attachment` VALUES ('d0874c17b98341bd873381f5e2c20579', 'froalaEditor', '1576487342018.png', 'f31c2bc497cf432fa6854e090a62f5b6.png', '34036', 'image/png', '2019-12-16 17:09:02');
INSERT INTO `u_attachment` VALUES ('d568c87e39074e61a778a13924065fad', 'b19e9795dbe74191869623d3b99188f8', '微信图片_20191204172722.png', '7b728b1728834e5f86e87a9c9ea4498f.png', '13428', 'image/png', '2019-12-06 17:29:27');
INSERT INTO `u_attachment` VALUES ('d6ffdca512604a54b0693c05d98b117b', 'froalaEditor', 'editor.jpg', 'f52af8999d4046c8a1bcd9d8c47a444e.png', '133152', 'image/jpeg', '2019-12-16 17:37:53');
INSERT INTO `u_attachment` VALUES ('e02041d4ced841c4bb408ce25ef89626', 'froalaEditor', '1576477845519.png', 'e5287c478f0445a9aa1248ee88e1bae3.png', '1806', 'image/png', '2019-12-16 14:30:45');
INSERT INTO `u_attachment` VALUES ('ecf4a78a3ba84f899dab62479ef22781', 'froalaEditor', '1576485256206.png', 'a6ff8c13face4c3985b75c1b0e67d24f.png', '18073', 'image/png', '2019-12-16 16:34:16');
INSERT INTO `u_attachment` VALUES ('f32c37d96ad74e5da4b1dd9705f15ad7', '0d639a90bec54299aa1e6fbb4880de64', '远程超声修改意见20191203.docx', '远程超声修改意见20191203.docx', '240568', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2019-12-17 17:28:11');
INSERT INTO `u_attachment` VALUES ('f409f5e6ba5242c1a40d8ba121e8b65c', 'froalaEditor', '1576477858092.png', 'ab5ec7bb130340a6b8bf2e5582d185d6.png', '4930', 'image/png', '2019-12-16 14:30:58');
INSERT INTO `u_attachment` VALUES ('f91540ffa8d640aeb74e064c2c6865ec', 'ccfe1a41ba954877b66d05cce42f4fb0', '1576565984017.png', 'e527d3b6178241c8b8713f13c9b43461.png', '12711', 'image/png', '2019-12-17 14:59:48');
INSERT INTO `u_attachment` VALUES ('f97ba74e43aa4c4ba8f84817ed402676', 'undefined', 'QQ截图20191118145742.bmp', '767814c18f76494b8a0e854ab7ca5cfb.png', '135734', 'image/bmp', '2019-12-05 15:41:13');
INSERT INTO `u_attachment` VALUES ('fafea0be1fa24783943748334f875286', 'ed3d58bddbca4956b7493f114395339e', 'QQ截图20191118145742.bmp', '6ab1e6ab48014894be0721e7ffea491b.png', '135734', 'image/bmp', '2019-11-29 17:32:01');
INSERT INTO `u_attachment` VALUES ('fbe6589dce804a5b8c1398cad30dcf55', 'froalaEditor', '1576485305961.png', '68e7309766ee4a898cc29f89f03d1c91.png', '20033', 'image/png', '2019-12-16 16:35:06');
INSERT INTO `u_attachment` VALUES ('ff00c181a56d4b8099dd3fd2f13b099f', '4703bd2a32774784a77955eed761ab5a', '1576567198378.png', '66172bd1ebd24480bd0aa3ccef918373.png', '6110', 'image/png', '2019-12-17 15:19:58');

-- ----------------------------
-- Table structure for u_user
-- ----------------------------
DROP TABLE IF EXISTS `u_user`;
CREATE TABLE `u_user` (
  `USERID` varchar(36) NOT NULL COMMENT '主键',
  `USERNAME` varchar(100) NOT NULL COMMENT '登录账号',
  `REALNAME` varchar(100) DEFAULT NULL COMMENT '真实姓名',
  `PASSWORD` varchar(100) NOT NULL COMMENT '密码',
  `SITEID` varchar(36) DEFAULT '' COMMENT '所属单位，外键，引用U_SITE表',
  `ROLECODE` varchar(30) DEFAULT NULL COMMENT '用户角色编码',
  `MOBILE` varchar(50) DEFAULT NULL COMMENT '手机',
  `SEX` varchar(50) DEFAULT NULL COMMENT '性别',
  `EMAIL` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `GENDERCODE` varchar(20) DEFAULT NULL COMMENT '字典中性别的编码',
  `BIRTHDAY` datetime DEFAULT NULL COMMENT '出生日期',
  `CREATETIME` datetime DEFAULT NULL COMMENT '记录添加时间',
  `CREATEUSER` varchar(36) DEFAULT NULL COMMENT '记录添加者',
  `UPDATETIME` datetime DEFAULT NULL COMMENT '记录最后一次修改时间',
  `UPDATEUSER` varchar(36) DEFAULT NULL COMMENT '记录最后一次修改者',
  `PHOTO` longtext COMMENT '用户照片',
  `REGIONCODE` varchar(50) DEFAULT NULL COMMENT '位置编码',
  `SALT` varchar(100) DEFAULT NULL COMMENT '盐值',
  `STATUS` int(10) DEFAULT NULL,
  PRIMARY KEY (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of u_user
-- ----------------------------
INSERT INTO `u_user` VALUES ('c834c396e98545c4bc2bf2a119fb1829', 'tom', 'tom', '9ad478122ad741798d5eae825b3a310c0027cb04c9b993a2555df97c4d0095ee', '', null, null, null, null, null, null, null, null, null, null, null, null, 'rbE7pyKgiImylsgcNyp7', '1');
