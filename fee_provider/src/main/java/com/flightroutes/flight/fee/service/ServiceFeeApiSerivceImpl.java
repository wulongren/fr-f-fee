package com.flightroutes.flight.fee.service;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.flightroutes.flight.comm.biz.RetData;
import com.flightroutes.flight.fee.api.bean.ServiceFeeRs;
import com.flightroutes.flight.fee.api.enums.ServiceFeeRetCode;
import com.flightroutes.flight.fee.api.enums.ServiceFeeType;
import com.flightroutes.flight.fee.api.service.ServiceFeeApiService;
import com.flightroutes.flight.fee.bean.FrServiceFee;
import com.flightroutes.flight.fee.bean.ServiceFee;
import com.flightroutes.flight.fee.constant.MonitorConsts;
import com.flightroutes.flight.monitor.FalconMonitor;



@Service("serviceFeeApiService")
public class ServiceFeeApiSerivceImpl implements ServiceFeeApiService{
	
	private static final Logger logger = LoggerFactory.getLogger(ServiceFeeApiSerivceImpl.class);
	
	@Resource
	ServiceFeeService serviceFeeService;
	
	@Resource
	FrServiceFeeService frServiceFeeService;
	
	@Override
	public RetData<ServiceFeeRs> getServiceFee(String purchaserCode) {
		long start = System.currentTimeMillis();
		System.out.println(start);
        System.out.println("gitee Test2");
		try {
			if(StringUtils.isEmpty(purchaserCode)){
				FalconMonitor.recordOne(MonitorConsts.SERVICE_FEE_CALL_FAIL);
				return RetData.getInstance(ServiceFeeRetCode.PARAM_ERROR);
			}
			ServiceFeeRs rs = new ServiceFeeRs();
			ServiceFee serviceFee = serviceFeeService.getByPurchaserCode(purchaserCode);
			if(serviceFee != null){
				rs.setFee(serviceFee.getFee());
				rs.setType(ServiceFeeType.PURCHASER);
				return RetData.getInstance(rs);
			}
			
			FrServiceFee frServiceFee = frServiceFeeService.get();
			rs.setFee(frServiceFee.getFee());
			rs.setType(ServiceFeeType.STANDARD);
			
			return RetData.getInstance(rs);
		} catch (Exception e) {
			FalconMonitor.recordOne(MonitorConsts.SERVICE_FEE_CALL_FAIL);
			logger.error("failed get service fee,the purchaser is {}",purchaserCode,e);
			return RetData.getInstance(ServiceFeeRetCode.EXCEPTION);
		}finally{
			FalconMonitor.recordOne(MonitorConsts.SERVICE_FEE_CALL,System.currentTimeMillis() - start);
		}
		
	}

}
