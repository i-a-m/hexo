/*
*将校验规则写到控件中
*/
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "./jquery.validate.js"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

(function() {

	function stripHtml(value) {
		// remove html tags and space chars
		return value.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
		// remove punctuation
		.replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "");
	}

	$.validator.addMethod("maxWords", function(value, element, params) {
		return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length <= params;
	}, $.validator.format("Please enter {0} words or less."));

	$.validator.addMethod("minWords", function(value, element, params) {
		return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
	}, $.validator.format("Please enter at least {0} words."));

	$.validator.addMethod("rangeWords", function(value, element, params) {
		var valueStripped = stripHtml(value),
			regex = /\b\w+\b/g;
		return this.optional(element) || valueStripped.match(regex).length >= params[0] && valueStripped.match(regex).length <= params[1];
	}, $.validator.format("Please enter between {0} and {1} words."));

}());

$.validator.addMethod("budengTo", function (value, element,param) {
    var target = $( param );
    if ( this.settings.onfocusout ) {
        target.unbind( ".validate-budengTo" ).bind( "blur.validate-budengTo", function() {
            $( element ).valid();
        });
    }
    return value !== target.val();

}, "新密码和旧密码不能相同");
    //手机验证规则
    $.validator.addMethod("telephone", function (value, element) {
        var mobile = /^1[3|4|5|7|8]\d{9}$/;
        return this.optional(element) || (mobile.test(value));
    }, "手机格式不对");

    //汉字
    $.validator.addMethod("chinese", function (value, element) {
        var chinese = /^[\( \) （） \u4E00-\u9FFF]+$/;
        return this.optional(element) || (chinese.test(value));
    }, "格式不对");

    // 字符验证-中文字、英文字母、数字和下划线"
    $.validator.addMethod("stringCheck", function(value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5\w\s\-]+$/.test(value);
    }, "只能包括中文字、英文字母、数字和下划线");

    $.validator.addMethod("userNameCheck", function(value, element) {
        return this.optional(element) || /^[a-zA-Z][a-zA-Z0-9_]{5,20}$/ .test(value);
    }, "只能包括英文字母、数字和下划线");

    // 字符验证2- 英文字母和数字
    $.validator.addMethod("stringNumCheck", function(value, element) {
        return this.optional(element) || /^[A-Za-z0-9]+$/.test(value);
    }, "只能输入包括英文字母和数字");

    // 字符验证3-正整数
    $.validator.addMethod("intNumCheck", function(value, element) {
        return this.optional(element) || /^[0-9]+$/.test(value);
    }, "只能输入正整数");

    // 字符验证4-最多两位小数
    $.validator.addMethod("floatNumCheck", function(value, element) {
        return this.optional(element) || /^(?!0+(?:\.0+)?$)\d+(?:\.\d{1,2})?$/.test(value);
    }, "最多输入两位小数");

    // 字符验证5-最多四位小数
    $.validator.addMethod("floatNumCheck4", function(value, element) {
        return this.optional(element) || /^(?!0+(?:\.0+)?$)\d+(?:\.\d{1,4})?$/.test(value);
    }, "最多输入四位小数");

    // 字符验证6-最多六位小数
    $.validator.addMethod("floatNumCheck6", function(value, element) {
        return this.optional(element) || /^(?!0+(?:\.0+)?$)\d+(?:\.\d{1,6})?$/.test(value);
    }, "最多输入六位小数");

    //下拉框验证
    $.validator.addMethod("selectCheck", function(value, element) {
        return !this.optional(element);
    }, "请选择选项");

    //日期验证  1999-01-01
    $.validator.addMethod("checkDate", function(value, element) {
        return this.optional(element) || /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
    }, "日期格式不正确，正确格式为1999-01-01");

	//电话验证  025/0516-12345678
    $.validator.addMethod("checkMobile", function(value, element) {
        var mobile = /^1[3|4|5|7|8]\d{9}$/;
        var cmobile = /^\d{3}-\d{6,8}|\d{4}-\d{6,8}$/;
        return this.optional(element) || mobile.test(value) || cmobile.test(value);
    }, "11位手机号码或固定电话，电话号码正确格式为(区号-号码)");
    
    //身份证号码验证
    $.validator.addMethod("checkNumber", function(value, element) {
        return this.optional(element) || /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);
    }, "身份证号码格式不正确");


}));
