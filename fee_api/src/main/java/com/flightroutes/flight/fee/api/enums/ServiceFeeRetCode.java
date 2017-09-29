package com.flightroutes.flight.fee.api.enums;

import com.flightroutes.flight.comm.biz.RetCode;

public enum ServiceFeeRetCode implements RetCode{
	
	
	PARAM_ERROR(330001,"参数错误"),
	
	EXCEPTION(330002,"系统异常");

	private final int code;
	
	private final String msg;
	
	
	ServiceFeeRetCode(int code,String msg){
		this.code = code;
		this.msg = msg;
	}
	
	@Override
	public int getCode() {
		return code;
	}

	@Override
	public String getMsg() {
		return msg;
	}

}
