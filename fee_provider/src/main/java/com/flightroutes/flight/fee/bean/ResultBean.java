package com.flightroutes.flight.fee.bean;

public class ResultBean {
	
	public static final int SUCCESS = 0;
	
	public static final int FAIL = -1;
	
	private int code;
	
	private String msg;
	
	private Object data;
	
	public  ResultBean(){
		this.code = SUCCESS;
	}
	
	private ResultBean(Object o){
		this.code = SUCCESS;
		this.data = o;
	}
	
	private ResultBean(Exception e){
		this.code = FAIL;
	}
	
	
	public static ResultBean newInstance(Object o){
		return new ResultBean(o);
	}
	
	public static ResultBean newInstance(Exception e){
		return new ResultBean(e);
	}
	

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "ResultBean [code=" + code + ", msg=" + msg + ", data=" + data + "]";
	}
	
}
