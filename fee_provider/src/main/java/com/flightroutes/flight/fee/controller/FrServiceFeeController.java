package com.flightroutes.flight.fee.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.flightroutes.flight.fee.bean.FrServiceFee;
import com.flightroutes.flight.fee.bean.ResultBean;
import com.flightroutes.flight.fee.service.FrServiceFeeService;

@Controller
@RequestMapping("/frServiceFee")
public class FrServiceFeeController {
	
	@Resource
	FrServiceFeeService frServiceFee;
	
	
	@ResponseBody
	@RequestMapping("/update")
	public ResultBean update(FrServiceFee fee){
		return ResultBean.newInstance(frServiceFee.update(fee));
	}
	
	@ResponseBody
	@RequestMapping("/list")
	public ResultBean list(){
		return ResultBean.newInstance(frServiceFee.list());
	}
}
