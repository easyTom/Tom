package com.easy.common.utils;

public class Constants {
	
	private Constants(){};
	
	public static final String CURRENT_USER = "current_user";
	
	public static final String ROLECODE_ADMIN = "1";
    public static final String ROLECODE_SNDSITE = "2";
    public static final String ROLECODE_RCVSITE = "3";
    public static final String ROLECODE_DOCTOR = "4";
    public static final String ROLECODE_EXPERT = "5";
	
	public static class Security{
		 /** 上次请求地址 */
	    public static final String PREREQUEST = "PREREQUEST";
	    /** 上次请求时间 */
	    public static final String PREREQUEST_TIME = "PREREQUEST_TIME";
	    /** 非法请求次数 */
	    public static final String MALICIOUS_REQUEST_TIMES = "MALICIOUS_REQUEST_TIMES";
	    
	}

	public static class View{
		public static final String BACKEND_PREFIX = "backend/pages/";
	}

	public static class Setting{
		public static final String KEY_DICOM_STORAGE_DEFAULT_PATH = "dicom.storage.defaultPath";
	}

}
