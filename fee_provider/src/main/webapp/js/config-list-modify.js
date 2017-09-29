function createModifyModal(element){
	var tr = $(element.parentNode.parentNode);
	var id = tr.children("td").eq(0).html().trim();
	var code = tr.children("td").eq(7).html().trim();
	var codeType = tr.children("td").eq(2).html().trim();
	var queryCount = tr.children("td").eq(3).html().trim();
	var rateType = tr.children("td").eq(4).html().trim();
	var createTime = tr.children("td").eq(6).html().trim();
	var data = tr.children("td").eq(8).html().trim();
	
	var content = "<div class='modal_yy'></div>"+
		"<div class='modal_content'>"+
		"<div class='modal_head'>"+
			"<p>修改</p>"+
			"<span class='modal_cancel' onclick='hideModal(this)'>X</span>"+
			"<div class='clear'></div>"+
		"</div>"+
		"<form>"+
			"<ul class='modal_ul'>"+
			"<li style='display:none;' id='idID'>"+id+"</li>"+
				"<li>"+
					"<label>合作方代码: </label>"+
					"<input value='"+code+"' class='formEle' type='text' id='codeID' disabled/>"+
                "</li>"+
				"<li>"+
					"<label>合作方类型: </label>"+
					"<select name='codeType' class='formEle' id='codeTypeID' onchange='codeTypeChange()'>"+
					 	"<option value='采购商'>采购商</option>"+
		                "<option value='供应商'>供应商</option>"+
		                "<option value='大合同'>大合同</option>"+
		            "</select>"+
                "</li>"+
				"<li>"+
					"<label>类型 : </label>"+
					"<select name='rateType' id='rateTypeID' class='formEle'>"+
                                "<option value='查订比'>查订比</option>"+
                                "<option value='查票比'>查票比</option>"+
                                "<option value='查段比'>查段比</option>"+
                            "</select>"+
				"</li>"+
				"<li>"+
					"<label>查询量 : </label>"+
					"<input value='"+queryCount+"' class='form-control' type='text' id='queryCountID' />"+
				"</li>"+
				"<li style='display:none;' id='createTimeID'>"+createTime+"</li>"+
				"<li style='display:none;' id='supplierCodes'>"+data+"</li>"+
			"</ul>"+
		"</form>"+
		"<div class='modal_foot'>"+
			"<span  class='save' onclick='updateReq();'>保存</span>"+
			"<span class='modal_cancel' onclick='hideModal(this)'>取消</span>"+
		"</div>"+
	"</div>";
	
	$('#showModal').append(content);
	$('#codeTypeID').val(codeType);
	$('#rateTypeID').val(rateType);
	if(code == "1A" ||code == "1G" ||code == "1P" ||code == "1S"){
		$("#codeTypeID").attr("disabled",true);
	}
	if(codeType == '大合同'){
		$("#rateTypeID").attr("disabled",true);
	}else{
		$("#rateTypeID").attr("disabled",false);
	}
	
}


function updateReq(){
	//校验不通过
	if(!verify()){
		return ;
	}
	
	var id = $('#idID').html().trim();
	var code = $("#codeID").val().trim();
	var codeType = $('#codeTypeID').val();
	var rateType = $('#rateTypeID').val();
	var queryCount = $('#queryCountID').val().trim();
	var createTime = $('#createTimeID').html().trim();
	var data = JSON.parse($("#supplierCodes").html().trim());
	if(!isNullOrEmpty(data.supplierCodes)){
		var supplierCodes = data.supplierCodes;
	}else{
		var supplierCodes = "";
	}
	
	var updateData = "id="+id+"&code="+code+"&codeType="+codeType+"&rateType="+rateType+
				"&queryCount="+queryCount+"&createTime="+createTime+"&supplierCodes="+supplierCodes;
	
	$('#showModal').empty();
	$.ajax({
		type : "POST",
		url : "/qbrConfig/update",
		data : updateData,
		async : false,
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
