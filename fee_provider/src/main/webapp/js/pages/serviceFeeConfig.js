$(function(){
	sendReqfrServiceFee();
	showServiceFee(1,10);
});

//获取FR24标准开票费配置的列表
function sendReqfrServiceFee(){
	$.ajax({
		type : "POST",
		url : "/frServiceFee/list",
		async : false,
		success : function(result) {
			if(result.code == 0){
				dtoTmplRenderer("#fr-service-fee-tpl",".fr-service-fee tbody",result.data);
			}
		}
	});
}

/* 模板引擎处理器   */
function dtoTmplRenderer(tmplName,targetEle,data){
	var adultTempFn = doT.template($(tmplName).html());
	var adultResultText = adultTempFn(data);
	$(targetEle).html(adultResultText);
}

//获取FR24标准开票费配置的修改信息
function frServiceFeeUpdateShow(item){
	var id = $(item).parent().parent().children("td").eq(0).html();
	var currency = $(item).parent().parent().children("td").eq(1).html();
	var fee = $(item).parent().parent().children("td").eq(2).html();
	var data = {'id':id,'currency':currency,'fee':fee};
	dtoTmplRenderer("#fr-service-fee-update-tpl","#showModal" ,data);
}

//保存FR24标准开票费配置的修改
function frServiceFeeUpdate(){
	var fee = $.trim($('#fee').val());
	var id = $.trim($('#id').val());
	$('#showModal').empty();
	if(verifyFee()){
		$.ajax({
			type : "POST",
			url : "/frServiceFee/update",
			async : false,
			data:"id="+id+"&fee="+fee,
			success : function(data) {
				var showMsg = "修改失败";
				if (data.code == 0) {
					showMsg = "修改成功";
				}
				CallCapacity("",showMsg,"",function(data){
					location.reload(true);
				});
			}
		});
	}
	
}

$('#searchBtn').click(function(){
	showServiceFee(1,10);
});



function getData(pageNo, pageSize) {
	showServiceFee(pageNo,pageSize);
}

function getReqData(pageNo,pageSize){
	var queryCode = $('#searchCode').val().trim();
	return "key="+queryCode + "&pageNo="+pageNo +"&pageSize="+pageSize;
}

function showServiceFee(pageNo,pageSize){
	$.ajax({
		type : "POST",
		url : "/serviceFee/list",
		data: getReqData(),
		async : false,
		success : function(result) {
			if (result.code == 0) {
				dtoTmplRenderer("#service-fee-tpl",".service-fee tbody",result.data);
			}
			buildPage(data.data.total,pageNo,pageSize,"#page_bar",null,false);
		}
	});
}

//添加采购商开票费的展示
function serviceFeeAddShow(){
	dtoTmplRenderer("#service-fee-add-tpl","#showModal","");
}

//保存添加采购商开票费配置
function serviceFeeAddSave(){
	
	var purchaser = $('#purchaser').val().trim();
	var currency = $('#currency').val().trim();
	var fee = $('#fee').val().trim();
	if(verify(purchaser,currency,fee)){
		$.ajax({
			type : "POST",
			url : "/serviceFee/insert",
			data : "purchaser=" + purchaser + "&currency=" + currency + "&fee=" + fee,
			async : false,
			success : function(data) {
				var showMsg = "添加失败";
				if (data.code == 0) {
					showMsg = "添加成功";
				}
				CallCapacity("",showMsg,"",function(data){
					showServiceFee(1,10);
				});
				
			}
		});
	}
	
}

//修改采购商开票费配置
function serviceFeeUpdateShow(e){
	var id = $(e).parent().parent().children("td").eq(0).html();
	var purchaser = $(e).parent().parent().children("td").eq(1).html();
	var currency = $(e).parent().parent().children("td").eq(2).html();
	var fee = $(e).parent().parent().children("td").eq(3).html();
	var data ={"id":id,"purchaser":purchaser,"currency":currency,"fee":fee}
	dtoTmplRenderer("#service-fee-update-tpl","#showModal",data);
}

/*保存修改采购商开票费配置*/
function serviceFeeUpdateSave(){
	var purchaser = $('#purchaser').val().trim();
	var currency = $('#currency').val().trim();
	var fee = $('#fee').val().trim();
	var id = $('#id').val().trim();
	if(verify(purchaser,currency,fee)){
		$.ajax({
			type : "POST",
			url : "/serviceFee/update",
			data : "id=" + id + "&purchaser=" + purchaser + "&currency=" + currency + "&fee=" + fee,
			async : false,
			success : function(data) {
				var showMsg = "修改失败";
				if (data.code == 0) {
					showMsg = "修改成功";
				}
				CallCapacity("",showMsg,"",function(data){
					showServiceFee(pageNo,pageSize);
				});
				
			}
		});
	}
}

function serviceFeeRemove(id) {
	CallCapacity({
		head_content : "确认删除",
		body_content : "确认要删除吗？删除之后无法恢复哦！",
		foot_item : 2,
		foot_itemContent : [ "确认", "取消" ],
		foot_buttonBg : [ "#e45050", "#eee" ],
		foot_buttonColor : [ "#fefefe", "#666" ],
		capacityClick : function(data) {
			if (data == "button1") {
				$.ajax({
					type : "POST",
					url : "/serviceFee/remove",
					data : "id="+id,
					async : false,
					success : function(data) {
						var showMsg = "删除失败";
						if (data.code == 0) {
							showMsg = "删除成功";
						}
						CallCapacity("",showMsg,"",function(data){
							showServiceFee(pageNo,pageSize);
						});
						
					}
				});
			}
		}
	});
}

function hideModal(){
	$("#showModal").empty();
}

//保留2位小数
function keepTwoNumber(){
	var regExp = /^[0-9]+(\.[0-9]+)?$/;
	var val = $.trim($("#fee").val());
	
	if( regExp.test(val) ){
		var num = parseFloat(val);
	    $("#fee").val(num.toFixed(2));
	    $(".paidAmountTip").hide();
	    return true;
	}else{
		$(".paidAmountTip").show();
		return false;
	}
}

//校验采购商开票费填写
function verify(purchaser,currency,fee){
	/* 在校验之前先把所有的提示框的颜色恢复正常  */
	$("input[type=text]").each(function (index, domEle) { 
		$(domEle).css("border",'1px solid #ddd');
	});
	var state = true;
	if(isNullOrEmpty(purchaser)){
		$('#purchaser').css("border",'1px solid red');
		state = false;
	}
	
	if(isNullOrEmpty(currency)){
		$('#currency').css("border",'1px solid red');
		state = false;
	}
	if(!verifyFee()){
		$('#fee').css("border",'1px solid red');
		state = false;
	}
	
	return state;
}

//开票费校验
function verifyFee(){
	var fee = $("#fee").val();
	var reg = /^\d+(\.\d{1,2})?$/;
	if(isNullOrEmpty(fee)){
		return false;
	}else if(!reg.test(fee)){
		$(".paidAmountTip").show();
		return true;
	}else{
		$(".paidAmountTip").hide();
		return false;
	}
}
