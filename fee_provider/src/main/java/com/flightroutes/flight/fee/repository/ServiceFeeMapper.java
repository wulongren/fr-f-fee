package com.flightroutes.flight.fee.repository;

import java.util.List;

import com.flightroutes.flight.fee.bean.ServiceFee;
import com.flightroutes.flight.fee.bean.ServiceFeeQuery;

public interface ServiceFeeMapper {
	
	Long count(ServiceFeeQuery query);
	
	List<ServiceFee> list(ServiceFeeQuery query);
	
	int insert(ServiceFee fee);
	
	int update(ServiceFee fee);
	
	int delete(Long id);
	
	ServiceFee get(String purchaser);

}
