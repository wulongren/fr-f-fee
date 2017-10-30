package com.flightroutes.flight.fee.bean;

public class PageView {
	
	
	/**
	 * 总记录数
	 */
	Long total;
	
	/**
	 * 数据内容
	 */
	Object data;
	
	/**
	 * 当前页
	 */
	Integer pageNo;
	
	/**
	 * 每页大小
	 */
	Integer pageSize;
	
	/**
	 * 总页数
	 */
	Integer pageCount;
	
	public PageView(Long total,Object data){
		this.total = total;
		this.data = data;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getPageCount() {
		return (int) (total % pageSize == 0? total / pageSize : (total / pageSize + 1));
	}

	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}

	@Override
	public String toString() {
		return "PageView [total=" + total + ", data=" + data + ", pageNo=" + pageNo + ", pageSize=" + pageSize + ", pageCount=" + pageCount + "]";
	}


}
