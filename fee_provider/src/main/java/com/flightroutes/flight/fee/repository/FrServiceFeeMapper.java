package com.flightroutes.flight.fee.repository;

import java.util.List;

import com.flightroutes.flight.fee.bean.FrServiceFee;

public interface FrServiceFeeMapper {
	
	int update(FrServiceFee fee);
	
	List<FrServiceFee> list();
	
	FrServiceFee get();
	
}
