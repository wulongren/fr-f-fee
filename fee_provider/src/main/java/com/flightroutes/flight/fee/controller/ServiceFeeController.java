package com.flightroutes.flight.fee.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.flightroutes.flight.fee.bean.PageView;
import com.flightroutes.flight.fee.bean.ResultBean;
import com.flightroutes.flight.fee.bean.ServiceFee;
import com.flightroutes.flight.fee.bean.ServiceFeeQuery;
import com.flightroutes.flight.fee.service.ServiceFeeService;

@Controller
@RequestMapping("/serviceFee")
public class ServiceFeeController {
	
	@Resource
	ServiceFeeService serviceFee;
	
	@ResponseBody
	@RequestMapping("/get")
	public ResultBean get(Long id){
		return ResultBean.newInstance(new ServiceFee());
	}
	
	@ResponseBody
	@RequestMapping("/insert")
	public ResultBean insert(ServiceFee fee){
		return ResultBean.newInstance(serviceFee.insert(fee));
	}
	
	@ResponseBody
	@RequestMapping("/update")
	public ResultBean update(ServiceFee fee){
		return ResultBean.newInstance(serviceFee.update(fee));
	}
	
	@ResponseBody
	@RequestMapping("/remove")
	public ResultBean remove(Long id){
		return ResultBean.newInstance(serviceFee.remove(id));
	}
	
	@ResponseBody
	@RequestMapping("/list")
	public ResultBean list(ServiceFeeQuery query){
		List<ServiceFee> list = serviceFee.list(query);
		Long count = serviceFee.count(query);
		PageView view =  new PageView(count,list);
		return ResultBean.newInstance(view);
	}
}
