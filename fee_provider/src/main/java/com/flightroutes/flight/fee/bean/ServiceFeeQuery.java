package com.flightroutes.flight.fee.bean;

public class ServiceFeeQuery {
	
	private static  final int DEFAULT_PAGE_NO = 1;
	
	private static final int DEFAULT_PAGE_SIZE = 10;

	/**
	 * 查询条件
	 */
	String key;
	
	Integer pageNo;
	
	Integer pageSize;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		if(pageSize == null || pageSize < 1){
			return DEFAULT_PAGE_SIZE;
		}
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	
	public Integer getStart(){
		if(pageNo == null || pageNo < 1){
			pageNo =  DEFAULT_PAGE_NO;
		}
		if(pageSize == null || pageSize < 1){
			pageSize =  DEFAULT_PAGE_SIZE;
		}
		
		return (pageNo - 1) * pageSize;
	}
	
	@Override
	public String toString() {
		return "ServiceFeeQuery [key=" + key + ", pageNo=" + pageNo + ", pageSize=" + pageSize + "]";
	}
	
}
