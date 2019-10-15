package com.flightroutes.flight.fee.api.service;

import com.flightroutes.flight.comm.biz.RetData;
import com.flightroutes.flight.fee.api.bean.ServiceFeeRs;
public interface ServiceFeeApiService {
	
	RetData<ServiceFeeRs> getServiceFee(String purchaserCode);

}
