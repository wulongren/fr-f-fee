package com.flightroutes.flight.fee.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.flightroutes.flight.fee.bean.FrServiceFee;
import com.flightroutes.flight.fee.repository.FrServiceFeeMapper;

@Service
public class FrServiceFeeService {
	
	@Resource
	FrServiceFeeMapper frServiceFeeMapper;
	
	public int update(FrServiceFee fee){
		return frServiceFeeMapper.update(fee);
	}
	
	public List<FrServiceFee> list(){
		return frServiceFeeMapper.list();
	}
	
	public FrServiceFee get(){
		return frServiceFeeMapper.get();
	}
	
}
