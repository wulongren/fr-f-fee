package com.flightroutes.flight.fee.api.enums;

import java.io.Serializable;

public enum ServiceFeeType implements Serializable{
	
	/**
	 * 标准开票费,币种为CNY
	 */
	STANDARD(0,"标准开票费"),
	
	/**
	 * 采购商开票费,币种为采购商的对外报价币种
	 */
	PURCHASER(1,"采购商开票费");
	
	private final int code;
	
	private final String desc;
	
	ServiceFeeType(int code,String desc){
		this.code = code;
		this.desc = desc;
	}

	public int getCode() {
		return code;
	}

	public String getDesc() {
		return desc;
	}
	

}
