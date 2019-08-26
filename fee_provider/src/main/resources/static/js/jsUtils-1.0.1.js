/* 公用JS方法 */

/*  去除字符串两端的空格  */
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/*  判断是否为空  */
function isNullOrEmpty(str) {
    if (str == null) return true;
	if (str == undefined || str == "undefined") return true;
	if (str == "") return true;
	if (str.length == 0) return true;
	if (!/[^(^\s*)|(\s*$)]/.test(str)) return true;
	return false;
};
/*  判断是否为空且不为0  */
function isEmptyAndNoZero(str) {
    if (str == 0) return false;
	return isNullOrEmpty(str);
};

/*判断是否为空*/
function isNotEmpty(obj) {
	return !isNullOrEmpty(obj);
}
/*  判断是否为整数数字 */
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n%1 === 0;
}
/* 获取字符串中的所有数字  */
function getNum(text){
	var value = text.replace(/[^0-9]/ig,"");
	return value;
};
/* 获取字符串中的所有字母 */
function getLetter(text){
	var value = text.replace(/[^a-zA-Z]/ig,"");
	return value;
}
/*获取字符串中的大写字母和数字*/
function getLetterAndNum(text){
	var value = text.replace(/[^A-Z0-9]/ig,"");
	return value;
}

/* 判断输入内容是否含有小写字母 */
function isContainLowercase(str){
    var reg = /.*[a-z]+.*/;
    if(reg.test(str)){
        return true;
    }else{
        return false;
    }

}
/*  判断是否含有大写字母 */
function isContainUpper(str){
    if (/^[a-z]+$/.test(str)){
       return true;
    }
    return false;
}

/* 判断是否为全英文大写或全中文 */
function isValidTrueName(str){
	var reg = /^[A-Z u4E00-u9FA5]+$/;
	if(reg.test(str)){
		return false;
	}
	return true;
}
/*  失去焦点去前后空格 */
function loseFocusClearBlank(obj){
	$(obj).val($.trim($(obj).val()));
}

/*  键盘弹起转化成大写 */
function keyUpToUpperCase(obj){
	obj.value = obj.value.toUpperCase();
}

/*  键盘弹起转化成小写 */
function keyUpToLowerCase(obj){
	obj.value = obj.value.toLowerCase();
}


var dateUtil = {
	    /*
	     * 取传入日期是星期几
	     * 使用方法：dateUtil.nowFewWeeks(new Date());
	     * @param date{date} 传入日期类型
	     * @returns {星期四，...}
	     */
	    nowIsWeeks:function(date){
	        if(date instanceof Date){
	            var dayNames = new Array(7,1,2,3,4,5,6);
	            return dayNames[date.getDay()];
	        } else{
	            return "Param error,date type!";
	        }
	    },
	};
Date.prototype.dateFormat = function (format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}



String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
/* 判断字符串是否是以指定字符串开头   */
String.prototype.startsWith = function (str){
	 return this.slice(0, str.length) == str;
}

/* 判断字符串是否是以指定字符串结尾   */
String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
};
/* 判断字符串中是否包含指定字符串   */
String.prototype.contains = function (str){
	return this.indexOf(str) == -1 ? false : true;
}

function promptWithPlaceHolder(obj) {
	$(obj).next().show();
	if (obj.value == "" || obj.value == null) {
		obj.value = obj.placeholder;
	}
}

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}
Array.prototype.removeByValue = function(val) {
	 for(var i=0; i<this.length; i++) {
	    if(this[i] == val) {
	      this.splice(i, 1);
	      break;
	    }
	 }
}

/* 比较 */
function Compare(objA, objB) {
	var obj = new Object();
	obj.compareObj = function (objA, objB, flag) {/* 比较两个对象是否相等 */
		for (var key in objA) {
			if (!flag) //跳出整个循环
				break;
			if (!objB.hasOwnProperty(key)) { flag = false; break; }
			if (!obj.isArray(objA[key])) { //子级不是数组时,比较属性值
				if (objB[key] != objA[key]) { flag = false; break; }
			} else {
				if (!obj.isArray(objB[key])) { flag = false; break; }
				var oA = objA[key], oB = objB[key];
				if (oA.length != oB.length) { flag = false; break; }
				for (var k in oA) {
					if (!flag) //这里跳出循环是为了不让递归继续
					break;
					flag = obj.compareObj(oA[k], oB[k], flag);
				}
			}
		}
		return flag;
	},
	obj.isObj = function (object) {/* 判断是否是对象  */
		return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
	},
	obj.isArray = function (object) {/* 判断是否是数组 */
		return object && typeof (object) == 'object' && object.constructor == Array;
	},
	obj.isString = function (object) {/* 判断是否是字符串  */
		return object && typeof (object) == 'string';
	},
	obj.isNumber = function (object) {/* 判断是否是数字  */
		return object && typeof (object) == 'number';
	},
	obj.getLength = function (object) {/* 获取数据长度  */
		var count = 0;
		for (var i in object) count++;
		return count;
	}
	if ((typeof objA) != (typeof objB)){return false;}// 判断类型是否相同
	if (obj.isString(objA) && obj.isString(objB)){return objA == objB;}//判断字符串是否相等
	if (obj.isNumber(objA) && obj.isNumber(objB)){return objA == objB;}//判断数字是否相等
	if (!obj.isObj(objA) || !obj.isObj(objB)){return false;}//判断是否都是对象
	if (obj.getLength(objA) != obj.getLength(objB)) return false; //判断长度是否一致
	return obj.compareObj(objA, objB, true);//默认为true
}

/* 请求操作的提示 显示 */
function commitWarnShow(){
	$("#commit_yy").show();
	$("#commit_title").show();
}

/* 请求操作的提示隐藏  */
function commitWarnHide(){
	$("#commit_yy").hide();
	$("#commit_title").hide();
}
/*获取地址栏参数*/
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)
		return unescape(r[2]);
	return "";
}
//兼IE6~8 indexOf()
if ( !Array.prototype.indexOf ) {
    Array.prototype.indexOf = function ( ele ) {
        // 获取数组长度
        var len = this.length;
        // 检查值为数字的第二个参数是否存在，默认值为0
        var fromIndex = Number( arguments[ 1 ] ) || 0;
        // 当第二个参数小于0时，为倒序查找，相当于查找索引值为该索引加上数组长度后的值
        if ( fromIndex < 0 ) {
            fromIndex += len;
        }
        // 从fromIndex起循环数组
        while ( fromIndex < len ) {
            // 检查fromIndex是否存在且对应的数组元素是否等于ele
            if ( fromIndex in this && this[ fromIndex ] === ele ) {
                return fromIndex;
            }
            fromIndex++;
        }
        // 当数组长度为0时返回不存在的信号：-1
        return -1;
    }
}
//兼IE6~8 forEach()
if ( !Array.prototype.forEach ) {
    Array.prototype.forEach = function forEach( callback ) {
        // 获取数组长度
        var len = this.length;
        if ( typeof callback != "function" ) {
            throw new TypeError();
        }
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments[ 1 ];
        for ( var i = 0; i < len; i++ ) {
            if ( i in this ) {
                // callback函数接收三个参数：当前项的值、当前项的索引和数组本身
                callback.call( thisArg, this[ i ], i, this );
            }
        }
    }
}
//兼IE6~8 map()
if ( !Array.prototype.map ) {
    Array.prototype.map = function ( callback ) {
        // 获取数组长度
        var len = this.length;
        if ( typeof callback != "function" ) {
            throw new TypeError();
        }
        // 创建跟原数组相同长度的新数组，用于承载经回调函数修改后的数组元素
        var newArr = new Array( len );
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments[ 1 ];
        for ( var i = 0; i < len; i++ ) {
            if ( i in this ) {
                newArr[ i ] = callback.call( thisArg, this[ i ], i, this );
            }
        }
        return newArr;
    }
}
//兼IE6~8 filter()
if ( !Array.prototype.filter ) {
    Array.prototype.filter = function ( callback ) {
        // 获取数组长度
        var len = this.length;
        if ( typeof callback != "function" ) {
            throw new TypeError();
        }
        // 创建新数组，用于承载经回调函数修改后的数组元素
        var newArr = new Array();
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments[ 1 ];
        for ( var i = 0; i < len; i++ ) {
            if ( i in this ) {
                if ( callback.call( thisArg, this[ i ], i, this ) ) {
                    newArr.push( val );
                }
            }
        }
        return newArr;
    }
}
//兼IE6~8 some()
if ( !Array.prototype.some ) {
    Array.prototype.some = function ( callback ) {
        // 获取数组长度
        var len = this.length;
        if ( typeof callback != "function" ) {
            throw new TypeError();
        }
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments[ 1 ];
        for ( var i = 0; i < len; i++ ) {
            if ( i in this && callback.call( thisArg, this[ i ], i, this ) ) {
                return true;
            }
        }
        return false;
    }
}
//兼IE6~8 every()
if ( !Array.prototype.every ) {
    Array.prototype.every = function ( callback ) {
        // 获取数组长度
        var len = this.length;
        if ( typeof callback != "function" ) {
            throw new TypeError();
        }
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments[ 1 ];
        for ( var i = 0; i < len; i++ ) {
            if ( i in this && !callback.call( thisArg, this[ i ], i, this ) ) {
                return false;
            }
        }
        return true;
    }
}

/**
 * [getLocalStorage 设置本地缓存]
 * @param  {[type]} k [关键字]
 * @return {[type]}   [description]
 * @param {[booleam]} e [是否编码]
 */
function getLocalStorage(k,e){
	var dataList = localStorage.getItem(k);
    var isUnescape = e == undefined ? true : e ;
    if( isUnescape ){
        return dataList ? JSON.parse(unescape(dataList)) : [];
    }else{
        return dataList ? JSON.parse(dataList) : [];
    }
}
/**
 * [setLocalStorage 获取本地缓存]
 * @param {[type]} k [关键字]
 * @param {[type]} o [数据]
 * @param {[booleam]} e [是否编码]
 */
function setLocalStorage(k,o,e){
    var isEscape = e == undefined ? true : e ;
    if(isEscape){
        localStorage.setItem(k,escape(JSON.stringify(o)));
    }else{
        localStorage.setItem(k,JSON.stringify(o));
    }
}
/*
 * @description距离n日期后的日期 原生计算方法
 * @param d [obj] 起始日期对象
 * @param n [number] n个月之后的日期 且 必须为整数
 * @param type [number] 类型 0 ：年,1 ：月,2 ： 日,3 ： 时,4 ： 分,5 ： 秒,6 ：毫秒
 * */
function nativeDateLater( d, n, type ) {
    if ( n == 0 ) {
        return d;
    }
    switch ( true ) {
        case type == 0:
	        d.setYear( d.getFullYear() + n );
	        break;
        case type == 1:
	        d.setMonth( d.getMonth() + n );
	        break;
        case type == 2:
	        d.setDate( d.getDate() + n );
	        break;
        case type == 3:
	        d.setHours( d.getHours() + n );
	        break;
        case type == 4:
	        d.setMinutes( d.getMinutes() + n );
	        break;
        case type == 5:
	        d.setSeconds( d.getSeconds() + n );
	        break;
        case type == 6:
	        d.setMilliseconds( d.getMilliseconds() + n );
	        break;
        default:
	        console.error( '需要计算的类型设置错误!' );
	        break;
    }
    return d;
}
/**
 * [isPlaceholer 判断是否支持placeholder]
 * @return {Boolean} [description]
 */
function isPlaceholer() {
    var input = document.createElement('input');
    return "placeholder" in input;
}
