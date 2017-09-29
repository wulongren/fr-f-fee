package com.flightroutes.flight.fee.bean;

public class PageView {
	
	Long total;
	
	Object data;
	
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

	@Override
	public String toString() {
		return "PageView [total=" + total + ", data=" + data + "]";
	}


}
