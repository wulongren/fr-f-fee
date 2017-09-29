package com.flightroutes.flight.fee.bean;

import java.util.Date;

public class FrServiceFee {
	
	Long id;
	
	/**
	 * 开票费
	 */
	Double fee;
	
	/**
	 * 币种
	 */
	String currency;
	
	Date createTime;
	
	Date updateTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getFee() {
		return fee;
	}

	public void setFee(Double fee) {
		this.fee = fee;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@Override
	public String toString() {
		return "FrServiceFee [id=" + id + ", fee=" + fee + ", currency=" + currency + ", createTime=" + createTime + ", updateTime=" + updateTime + "]";
	}

}
