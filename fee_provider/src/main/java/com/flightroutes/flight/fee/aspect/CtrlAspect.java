package com.flightroutes.flight.fee.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.flightroutes.flight.fee.bean.ResultBean;

@Aspect
@Component
public class CtrlAspect {

	private static final Logger logger = LoggerFactory.getLogger(CtrlAspect.class);

	@Around("execution(* com.flightroutes.flight.fee.controller.*.*(..))")
	public Object handle(ProceedingJoinPoint pjp) throws Throwable {
		ResultBean result = null;
		try {
			result = (ResultBean) pjp.proceed();
		} catch (Exception e) {
			logger.error("view exception,",e);
			result = ResultBean.newInstance(e);
		}
		return result;
	}

}
