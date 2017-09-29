package com.flightroutes.flight.fee.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.flightroutes.flight.fee.bean.ServiceFee;
import com.flightroutes.flight.fee.bean.ServiceFeeQuery;
import com.flightroutes.flight.fee.repository.ServiceFeeMapper;

@Service
public class ServiceFeeService {
	
	@Resource
	ServiceFeeMapper serviceFeeMapper;
	
	public Long count(ServiceFeeQuery query){
		return serviceFeeMapper.count(query);
	}
	
	public int insert(ServiceFee fee){
		return serviceFeeMapper.insert(fee);
	}
	
	public int update(ServiceFee fee){
		return serviceFeeMapper.update(fee);
	}
	
	public int remove(Long id){
		return serviceFeeMapper.delete(id);
	}
	
	public List<ServiceFee> list(ServiceFeeQuery query){
		return serviceFeeMapper.list(query);
	}
	
	public ServiceFee getByPurchaserCode(String purchaser){
		return serviceFeeMapper.get(purchaser);
	}

}
