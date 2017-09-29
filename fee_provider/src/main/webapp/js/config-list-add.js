function createAddModal(){
	var content = "<div class='modal_yy'></div>"+
		"<div class='modal_content'>"+
		"<div class='modal_head'>"+
			"<p>添加</p>"+
			"<span class='modal_cancel' onclick='hideModal(this)'>X</span>"+
			"<div class='clear'></div>"+
		"</div>"+
		"<form>"+
			"<ul class='modal_ul'>"+
				"<li>"+
					"<label>合作方代码: </label>"+
					"<input name='code' class='formEle' type='text' id='codeID' onkeyup='codeTypeSelect(this)' />"+
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
					"<input class='form-control' type='text' id='queryCountID' />"+
				"</li>"+
			"</ul>"+
		"</form>"+
		"<div class='modal_foot'>"+
			"<span  class='save' onclick='addReq();'>保存</span>"+
			"<span class='modal_cancel' onclick='hideModal(this)'>取消</span>"+
		"</div>"+
	"</div>";
	
	$('#showModal').append(content);
}

function hideModal(e){
	$(e.parentNode.parentNode.parentNode).empty();
}

function verify(){
	/* 在校验之前先把所有的提示框的颜色恢复正常  */
	$("input[type=text]").each(function (index, domEle) { 
		$(domEle).css("border",'1px solid #e5e6e7');
	});
	var state = true;
	if(isNullOrEmpty($('#queryCountID').val().trim()) ||  !isPositiveInteger($('#queryCountID').val().trim())){
		$('#queryCountID').css("border",'1px solid red');
		state = false;
	}
	
	if(isNullOrEmpty($('#codeID').val().trim())){
		$('#codeID').css("border",'1px solid red');
		state = false;
	}
	
	
	return state;
}

function addReq(){
	//校验不通过
	if(!verify()){
		return ;
	}
	
	
	var code = $("#codeID").val().trim();
	var codeType = $('#codeTypeID').val();
	var rateType = $('#rateTypeID').val();
	var queryCount = $('#queryCountID').val().trim();
	
	
	var addData = "code="+code+"&codeType="+codeType+"&rateType="+rateType+"&queryCount="+queryCount;
	
	$('#showModal').empty();
	$.ajax({
		type : "POST",
		url : "/qbrConfig/insert",
		data : addData,
		async : false,
		success : function(data) {
			var showMsg = "添加失败";
			if (data.code == 0) {
				showMsg = "添加成功";
			}
			CallCapacity("",showMsg,"",function(data){
				location.reload(true);
			});
			
		}
	});
	
	
	
}

/* 判断是否为空  */
function isNullOrEmpty(str) {
    if (str == null) return true;
	if (str == undefined || str == "undefined") return true;
	if (str == "") return true;
	if (str.length == 0) return true;
	if (!/[^(^\s*)|(\s*$)]/.test(str)) return true;
	return false;
};

//检查是否为正整数
function isPositiveInteger(a){
	var reg = /^[1-9]\d*$/;
	return reg.test(a);
} 