$('#searchBtn').click(function(){
	var queryCode = $('#searchCode').val().trim();
	show_service_fee(queryCode,1,10);
});


$(function(){
	show_service_fee("",1,10);
});

function getData(pageNo, pageSize) {
	var queryCode = $('#searchCode').val().trim();
	show_service_fee(queryCode,pageNo,pageSize);
}

function show_service_fee(search,no,size){
	$.ajax({
		type : "POST",
		url : "/serviceFee/list",
		data:"key="+search+"&pageNo="+no+"&pageSize="+size,
		async : false,
		success : function(data) {
			if (data.code == 0) {
				$('.service-fee tbody').empty();
				$('.service-fee tbody').append(template('service-fee-tpl', data.data));
			}
			buildPage(data.data.total,no,size,"#page_bar",null,false);
		}
	});
}

function service_fee_add_tpl(){
	$('#showModal').append(template('service-fee-add-tpl', {}));
}

function service_fee_add(){
	var purchaser = $('#purchaser').val().trim();
	var currency = $('#currency').val().trim();
	var fee = $('#fee').val().trim();
	$('#showModal').empty();
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
				location.reload(true);
			});
			
		}
	});
}

function service_fee_update_tpl(e){
	var id = $(e).parent().parent().children("td").eq(0).html();
	var purchaser = $(e).parent().parent().children("td").eq(1).html();
	var currency = $(e).parent().parent().children("td").eq(2).html();
	var fee = $(e).parent().parent().children("td").eq(3).html();
	$('#showModal').append(template('service-fee-update-tpl', {"id":id,"purchaser":purchaser,"currency":currency,"fee":fee}));
}

function service_fee_update(){
	var purchaser = $('#purchaser').val().trim();
	var currency = $('#currency').val().trim();
	var fee = $('#fee').val().trim();
	var id = $('#id').val().trim();
	$('#showModal').empty();
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
				location.reload(true);
			});
			
		}
	});
}

function service_fee_remove(id) {
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
							location.reload(true);
						});
						
					}
				});
			}
		}
	});
}

function hideModal(e){
	$(e.parentNode.parentNode.parentNode).empty();
}
