/*
	使用案例一：普通按钮
	functon divClick(){
		var capacity = new Capacity();
		capacity.width="200px";
		capacity.head_content = "温馨提示";
		capacity.body_content = "对于一些指定的供应商我们会进行转码！";
		capacity.foot_item = 3;
		capacity.foot_itemContent[0] = "我知道了";
		capacity.foot_itemContent[1] = "确定";
		capacity.foot_itemContent[1] = "取消";
		capacity.foot_timingNumber[0] = 0;
		capacity.foot_timingNumber[1] = 5;
		capacity.foot_timingNumber[2] = 0;
		capacity.show();	//显示弹框
		// 弹框关闭方法
		capacity.capacityClick = function (data){ //定义弹框关闭后执行的方法 data 为出发的按钮的id 格式为 button1 、button2 根据这个返回值来判断哪个按钮被触发 
			alert(data);
			//要执行的语句 
		}
	}
	使用案例二：form表单提交，根据按钮响应对应的操作
		<form name="myform" onSubmit="return false;" action="http://baidu.com" method="get" id="myform">
			<input onClick="return xianshi();" type="submit" value="提交" />
		</form>

		注意：如果是用 input ,则直接调用 click 函数，
			如果是 type = "submit" 的 input ，则要在 form 元素中添加 onSubmit="return false;" 目的是为了阻塞提交
			然后在 click 函数中去根据按钮的响应出发 form 元素的 submit 事件 
			capacity.capacityClick = function (data){
				document.getElementById("myform").submit();
			}
	使用案例三：快速调用弹框
		CallCapacity({
				head_content:"提示",
				foot_buttonBg:["#000","#666","#00f"],
				capacityClick:capacityFun
			});
		function capacityFun(data){}
		或
		CallCapacity({
				head_content:"提示",
				foot_buttonBg:["#000","#666","#00f"],
				capacityClick:function(data){
					alert(data);
				}
			});
		或
		CallCapacity("提示","快捷方式","确定",capacityFun);
	author:colien.cheng
	dateTime:2016/08/18
*/
	
	function Capacity() {
		var obj = new Object();
		obj.styles = "default",  /* 弹框风格 */

		obj.background = "#fff", /* 弹框最外层的背景颜色 */
		obj.width = "400px",	 /* 弹框的宽度 */
		obj.marginTop = '-100px',/* 弹框距离顶部的高度，必须是负值，负号后面数字越大，距离顶部越近 */

		obj.head_background = '#ededed',	/* 弹框头部的背景颜色 */
		obj.head_color = 'red',				/* 弹框头部的字体颜色 */
		obj.head_fontSize = '20px',			/* 弹框头部的字体大小 */
		obj.head_lineHeight = '36px',		/* 弹框头部的字体行高 ，通过改变行高，可以改变头部的高度 */
		obj.head_content = '温馨提示',				/* 弹框头部的内容 */
	
		obj.body_background = '#fff',		/* 弹框内容部分的背景颜色 */
		obj.body_color = '#333',			/* 弹框内容部分的字体颜色 */
		obj.body_fontSize = '13px',			/* 弹框内容部分的字体大小 */
		obj.body_lineHeight = '24px',		/* 弹框内容部分的字体行高 */
		obj.body_content = '',				/* 弹框内容部分的内容*/

		obj.foot_background = '#fff',		/* 弹框底部的背景颜色 */
		obj.foot_height = "40px",			/* 弹框底部的高度 */
		obj.foot_item = 1,					/* 底部有多少个弹框 */
		obj.foot_functionName = new Array(obj.foot_item),	/* 底部每个弹框对应的方法名 */
		obj.foot_itemContent = new Array(obj.foot_item),	/* 底部每个弹框对应的按键内容 */
		obj.foot_timingNumber = new Array(obj.foot_item),	/* 底部按钮对应的定时秒数 */
		obj.foot_buttonId = new Array(obj.foot_item),		/* 底部按钮的 id */
		obj.capacityTimer = new Array(obj.foot_item),		/* 定时器数组 */
		obj.foot_buttonBg = new Array(obj.foot_item),		/* 底部按钮背景颜色 */
		obj.foot_buttonColor = new Array(obj.foot_item),		/* 底部按钮字体颜色 */

		/* 弹框风格仓库，该方法供对象内部使用 */
		obj.repository = function (styles){
			/* 简约风格 */
			var simple = "";
			/* 默认风格 */
			var defaultName = "#capacityDiv{position:fixed;top:0;left:0;width:100%;height:100%;z-index:499;overflow:auto;}"
								+".msg_yy{position:fixed;top:0;left:0;z-index:498;width:100%;height:100%;background:#000;opacity:0.5;filter:alpha(opacity=50);display:none;}"
								+".msg_ {width:400px;position:fixed;top:50%;left:50%;z-index:500;background:#fff;display:none;box-shadow: 0px 0px 5px 1px #000;margin:0px 0px 100px -200px;}"
								+".msg_ .msg_h {background:#ededed;color:red;line-height:36px;text-indent:20px;font-size:20px;font-weight:600;border-left: 4px solid red;border-top: 4px solid transparent;border-bottom: 4px solid transparent;}"
								+".msg_ .msg_c { text-indent:30px;font-size:13px;padding:15px 10px;line-height: 24px;min-height: 50px;}"
								+".msg_ .msg_f { height: 40px; text-align:center;}"
								+".msg_ .msg_f .msg_i { background: #f00; margin: 2px auto;border-radius: 3px;display:inline-block;line-height: 28px; text-align: "+"center;color: #fefefe;padding:0px 10px;}"
								+".msg_ .msg_f .msg_i:hover { background: red; cursor: pointer;}"
								+".msg_submit { float: right;margin-right: 20px !important;}";
			switch (styles){
				case "simple":
					return simple;
				case "default":
					return defaultName;
			}
		},
		/* 构建弹框头部，仅供内部使用 */
		obj.buildHead = function (){
			var headDiv = document.createElement("div");
			headDiv.setAttribute("id","capacity_head");
			headDiv.innerHTML = this.head_content;
			headDiv.className = "msg_h";
			headDiv.style.background = this.head_background;
			headDiv.style.color = this.head_color;
			headDiv.style.fontSize = this.head_fontSize;
			headDiv.style.lineHeight = this.head_lineHeight;
			return headDiv;
		},
		/* 构建弹框主体，仅供内部使用 */
		obj.buildBody = function (){
			var bodyDiv = document.createElement("div");
			bodyDiv.setAttribute("id","capacity_body");
			bodyDiv.innerHTML = this.body_content;
			bodyDiv.className = "msg_c";
			bodyDiv.style.background = this.body_background;
			bodyDiv.style.color = this.body_color;
			bodyDiv.style.fontSize = this.body_fontSize;
			bodyDiv.style.lineHeight = this.body_lineHeight;
			return bodyDiv;
		},
		/* 构建弹框底部，仅供内部使用 */
		obj.buildFoot = function (){
			var footDiv = document.createElement("div");
			footDiv.setAttribute("id","capacity_foot");
			footDiv.className = "msg_f";
			footDiv.style.background = this.foot_background;
			footDiv.style.height = this.foot_height;

			for(var i=0 ;i < this.foot_item ;i++){
				var foot_span = document.createElement("span");
				foot_span.setAttribute("id","button"+(i+1));
				foot_span.setAttribute("index",i);
				foot_span.setAttribute("flagK","false");
				foot_span.className = "msg_i";

				if(!isEmpty(this.foot_buttonBg[i])){
					foot_span.style.background = this.foot_buttonBg[i];
				}
				if(!isEmpty(this.foot_buttonColor[i])){
					foot_span.style.color = this.foot_buttonColor[i];
				}
				foot_span.innerHTML = this.foot_itemContent[i];

				if(!isEmpty(obj.foot_timingNumber[i])){
					var foot_span_span = document.createElement("span");
					foot_span_span.setAttribute("id","msg-time"+i);
					foot_span_span.innerHTML = "("+obj.foot_timingNumber[i]+"s)";
					foot_span.appendChild(foot_span_span);
				}
				footDiv.appendChild(foot_span);
				if(i != this.foot_item-1){
					var foot_i = document.createElement("i");
					foot_i.innerHTML = "&nbsp;&nbsp;";
					footDiv.appendChild(foot_i);
				}
			}
			return footDiv;
		},
		/* 创建 style 标签 */
		obj.buildStyle = function(){
			var styleEle = document.createElement("style");  
			styleEle.setAttribute("type", "text/css");
			styleEle.innerHTML = obj.repository(obj.styles);
			return styleEle;
		},
		/* 创建阴影层  */
		obj.buildYY = function(){
			var YYDiv = document.createElement("div");
			YYDiv.setAttribute("id","msg_yy");
			YYDiv.className = "msg_yy";
			return YYDiv;
		},
		/* 创建弹框 */
		obj.buildCapacity = function(){
			var capaDiv = document.createElement("div");
			capaDiv.setAttribute("id","capacity");
			capaDiv.className = "msg_ magictime slideUpRetourn";
			capaDiv.style.background = this.background;
			capaDiv.style.width = this.width;
			capaDiv.style.marginLeft = parseInt(this.width.substring(0,this.width.length-2))/2 +"px;";
			capaDiv.appendChild(obj.buildHead());
			capaDiv.appendChild(obj.buildBody());
			capaDiv.appendChild(obj.buildFoot());
			return capaDiv;
		}
		/* 显示弹框，通过对象供外部调用 */
		obj.capacityShow = function (){
			var capacityDiv = document.createElement("div");
			capacityDiv.setAttribute("id","capacityDiv");
			capacityDiv.appendChild(obj.buildCapacity());
			var capacityModel = document.createElement("div");
			capacityModel.setAttribute("id","capacityModel");
			capacityModel.appendChild(obj.buildStyle());
			capacityModel.appendChild(obj.buildYY());
			capacityModel.appendChild(capacityDiv);	
			document.getElementsByTagName("body")[0].appendChild(capacityModel);	
			var data = this;
			for(var i = 0 ; i<data.foot_item;i++){
				data.foot_buttonId[i] = "button" +(i+1);
			}
			this.alertShow(data);
		},
		obj.alertShow = function (data){	/* 显示弹框，仅供内部使用 */
			document.getElementById("msg_yy").style.display = "block";
			document.getElementById("capacity").style.display = "block";
			/* 禁用滚动条 */
			document.getElementsByTagName("body")[0].style.overflow = "hidden";
			/* 判断弹框高度是否大于当前屏幕 */
			if(capacityIsOverWindowHeight()){
				document.getElementById("capacity").style.position = "absolute";
				document.getElementById("capacity").style.top = "0";
				document.getElementById("capacity").style.marginTop = "100px";
			}else{
				document.getElementById("capacity").style.marginTop = -(capacityHeight()/2) + "px";
			}
			for(var i=0 ;i<data.foot_item;i++){
				if(!isEmpty(data.foot_timingNumber[i])){
					capacityLoad(i,data);
				}else{
					document.getElementById(data.foot_buttonId[i]).setAttribute("flagK","true");
				}
			}
			for(var i =0 ;i<data.foot_item;i++){
				document.getElementById(data.foot_buttonId[i]).onclick = function(){
					if(data.hideCapacity(this)){
						data.capacityClick(this.getAttribute("id"));
					}
				}
			}
		},
		obj.capacityClick = ""; /* 点击关闭按钮的方法 ，供外部使用，且在 alertShow 方法之前调用 */
		obj.hideCapacity = function (data){	/* 关闭窗口方法，有返回值，true or false ,供内部使用 */
			if(data.getAttribute("flagK") == "true"){
				/* 启用滚动条 */
				document.getElementsByTagName("body")[0].style.overflow = "auto";
				for(var i =0 ;i < obj.foot_item;i++){
					clearInterval(obj.capacityTimer[i]);	
				}
				var capacityDiv = document.getElementById("capacityModel");
				capacityDiv.parentNode.removeChild(capacityDiv);
				return true;
			}
			return false;
		}
		return obj;
	}
	/* 判断是超出屏幕高度  */
	function capacityIsOverWindowHeight(){
		var winHeight = document.getElementById("capacityDiv").offsetHeight;
		var countHeight = 100 + capacityHeight();
		if(countHeight >= winHeight){
			return true;
		}
		return false;
	}
	/* 获取弹框高度  */
	function capacityHeight(){
		return document.getElementById('capacity').offsetHeight;
	}
	/* 定时加载的方法 */
	function capacityLoad(index,data){
		data.capacityTimer[index] = setInterval(function(){capacityUpDate(index,data);},1000);
	}
	/* 更新一秒的方法 */
	function capacityUpDate(index, data){
		document.getElementById(data.foot_buttonId[index]).setAttribute("flagK","false");
		document.getElementById("msg-time" + index).innerHTML = "("+(data.foot_timingNumber[index]-1)+"s)";
		if(data.foot_timingNumber[index]-1 == 0){
			document.getElementById("msg-time" + index).innerHTML="";
			document.getElementById(data.foot_buttonId[index]).setAttribute("flagK","true");
			clearInterval(data.capacityTimer[index]);
		}
		data.foot_timingNumber[index] = data.foot_timingNumber[index]-1;
	}
	/* 判断是否为空 */
	function isEmpty(val){
		if (val == null) return true;
		if (val == undefined || val == "undefined") return true;
		if (val == "") return true;
		if (val.length == 0) return true;
		if (!/[^(^\s*)|(\s*$)]/.test(val)) return true;
		return false;
	}

	/* 快速调用方法弹框 */
	function CallCapacity(){
		var obj = new Capacity();
		if(arguments.length == 1){
			var json = arguments[0];
			for(var key in json){
				for(var attr in obj){
					if(key == attr)
						obj[attr] = json[key];
				}
			}
		}else{
			obj.head_content = isEmpty(arguments[0]) ? obj.head_content:arguments[0];
			obj.body_content = arguments[1];
			obj.foot_itemContent[0] =isEmpty(arguments[2]) ? "我知道了":arguments[2]; 
			obj.capacityClick = isEmpty(arguments[3]) ? function(data){}:arguments[3];
		}
		obj.capacityShow();
	}
	
