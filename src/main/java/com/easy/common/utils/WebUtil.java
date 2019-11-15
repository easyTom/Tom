package com.easy.common.utils;

import com.easy.tom.system.entity.User;
import com.easy.tom.system.service.IUserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.InvalidSessionException;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Map;
import java.util.ResourceBundle;

/**
 * Web层辅助类
 */
public final class WebUtil {
    private WebUtil() {
    }

    private static Logger logger = LogManager.getLogger(WebUtil.class);

    /**
     * 获取指定Cookie的值
     * 
     * @param cookies cookie集合
     * @param cookieName cookie名字
     * @param defaultValue 缺省值
     * @return
     */
    public static final String getCookieValue(HttpServletRequest request, String cookieName, String defaultValue) {
        Cookie cookie = WebUtils.getCookie(request, cookieName);
        if (cookie == null) {
            return defaultValue;
        }
        return cookie.getValue();
    }


    /** 获取当前用户 */
    public static final User getCurrentUser() {
        Subject currentUser = SecurityUtils.getSubject();
        if (null != currentUser) {
            try {
                Session session = currentUser.getSession();
                if (null != session) {
                    User user =  (User)session.getAttribute(Constants.CURRENT_USER);
                    if(user == null){
                    	IUserService service = com.tom.common.utils.SpringContextProvider.getBean("userService");
                        User u = (User)currentUser.getPrincipal();
                    	user = service.findUserByUserName(u.getUserName());
                    	WebUtil.setSession(Constants.CURRENT_USER, user);
                    }
                    return user;
                }
            } catch (InvalidSessionException e) {
                logger.error(e);
            }
        }
        return null;
    }

    /**
     * 获取登录的认证身份，如果没登录返回none
     */
    public static final String getPrincipal(){
        try {
            Subject currentUser = SecurityUtils.getSubject();
            String userId = currentUser.getPrincipal().toString();
            if(userId == null || "".equals(userId)){
                userId = "none";
            }
            return userId;
        }catch (Exception e){}

        return "none";
    }

    /**
     * 将一些数据放到ShiroSession中,以便于其它地方使用
     * 
     */
    public static final void setSession(Object key, Object value) {
        Subject currentUser = SecurityUtils.getSubject();
        if (null != currentUser) {
            Session session = currentUser.getSession();
            if (null != session) {
                session.setAttribute(key, value);
            }
        }
    }

    /**
     * 将一些数据放到ShiroSession中,以便于其它地方使用
     * 
     */
    public static final void setSession(HttpServletRequest request, String key, Object value) {
        HttpSession session = request.getSession();
        if (null != session) {
            session.setAttribute(key, value);
        }
    }

    /** 移除当前用户 */
    public static final void removeCurrentUser(HttpServletRequest request) {
//        request.getSession().removeAttribute(Constants.CURRENT_USER);
    }

    /**
     * 获得国际化信息
     * 
     * @param key 键
     * @param request
     * @return
     */
    public static final String getApplicationResource(String key, HttpServletRequest request) {
        ResourceBundle resourceBundle = ResourceBundle.getBundle("ApplicationResources", request.getLocale());
        return resourceBundle.getString(key);
    }

    /**
     * 获得参数Map
     * 
     * @param request
     * @return
     */
    public static final Map<String, Object> getParameterMap(HttpServletRequest request) {
        return WebUtils.getParametersStartingWith(request, null);
    }

    /** 获取客户端IP */
    public static final String getHost(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if ("127.0.0.1".equals(ip)) {
            InetAddress inet = null;
            try { // 根据网卡取本机配置的IP
                inet = InetAddress.getLocalHost();
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
            ip = inet.getHostAddress();
        }
        // 对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
        if (ip != null && ip.length() > 15) {
            if (ip.indexOf(",") > 0) {
                ip = ip.substring(0, ip.indexOf(","));
            }
        }
        return ip;
    }
    
    /**
     * 获取HttpServletRequest
     * @return
     */
    public static HttpServletRequest getHttpServletRequest(){
    	ServletRequestAttributes servletRequestAttributes  = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		if (servletRequestAttributes == null || servletRequestAttributes.getRequest()==null) {
			return null;
		}
		HttpServletRequest request =  servletRequestAttributes.getRequest();
		return request;
    }


	public static boolean hasSession(String key) {
		Subject currentUser = SecurityUtils.getSubject();
        if (null != currentUser) {
            try {
//            	setSession(Constants.CURRENT_USER, user)
                Session session = currentUser.getSession();
                if (null != session) {
                	Object o = session.getAttribute(key);
                    return o != null;
                }
            } catch (InvalidSessionException e) {
                logger.error(e);
            }
        }
		return false;
	}

	public static void writeJson(HttpServletResponse response,String jsonStr){
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=utf-8");
        try(PrintWriter pw = response.getWriter()) {
            pw.write(jsonStr);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
