package com.flightroutes.flight.fee.api.bean;

import java.io.Serializable;

import com.flightroutes.flight.fee.api.enums.ServiceFeeType;

public class ServiceFeeRs implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 685409728013676825L;
	
	public ServiceFeeType type;
	
	public Double fee;

	public ServiceFeeType getType() {
		return type;
	}

	public void setType(ServiceFeeType type) {
		this.type = type;
	}

	public Double getFee() {
		return fee;
	}

	public void setFee(Double fee) {
		this.fee = fee;
	}

	@Override
	public String toString() {
		return "ServiceFeeRs [type=" + type + ", fee=" + fee + "]";
	}
	
}
