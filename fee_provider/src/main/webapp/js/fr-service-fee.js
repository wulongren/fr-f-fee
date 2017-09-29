$(function(){
	fr_service_fee_tpl();
});


function fr_service_fee_tpl(){
	$('.fr-service-fee tbody').empty();
	$.ajax({
		type : "POST",
		url : "/frServiceFee/list",
		async : false,
		success : function(data) {
			if(data.code == 0){
				$('.fr-service-fee tbody').empty();
				$('.fr-service-fee tbody').append(template('fr-service-fee-tpl', data));
			}
		}
	});
}

function fr_service_fee_update_tpl(id,currency,fee){
	$('#showModal').append(template('fr-service-fee-update-tpl', {"id":id,"currency":currency,"fee":fee}));
}

function fr_service_fee_update(){
	var fee = $('#fee').val().trim();
	var id = $('#id').val().trim();
	$('#showModal').empty();
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