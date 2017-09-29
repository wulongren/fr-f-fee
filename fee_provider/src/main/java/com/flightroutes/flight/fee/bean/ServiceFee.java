package com.flightroutes.flight.fee.bean;

import java.util.Date;

public class ServiceFee {
	
	Long id;
	
	/**
	 * 开票费
	 */
	Double fee;
	
	/**
	 * 币种
	 */
	String currency;
	
	/**
	 * 采购商
	 */
	String purchaser;
	
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

	public String getPurchaser() {
		return purchaser;
	}

	public void setPurchaser(String purchaser) {
		this.purchaser = purchaser;
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
		return "ServiceFee [id=" + id + ", fee=" + fee + ", currency=" + currency + ", purchaser=" + purchaser + ", createTime=" + createTime + ", updateTime=" + updateTime + "]";
	}
	
}
