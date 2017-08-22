(function ($) {  
  
    $.fn.masklayer = function (settings) {  
        /// <summary>  
        /// </summary>  
        /// <param name="settings" type="object">扩展了{title:[div中的内容], action:[执行的动作，目前支持"close"], result:[返回结果]}</param>  
        /// <returns type="void" />  
  
        settings = $.extend(true, { title: '加载中...', action: "open" }, settings); 

        /// <summary>  
        /// 初始化所有 cks 样式的按钮（页面运行时进行初始化）  
        /// </summary>  
        /// <returns type="void" />  
  
        _init = function () {  
            if (settings.action == "open") {  
                if ($("#div_load").length == 0) {  
                    var boardDiv = "<div id='div_load'><h6></h6><\/div>";  
                    $(document.body).append(boardDiv);  
                }  
                if ($("#div_load").length > 0) {  
                    $("#div_load").css({
                    	"display":"block",
                    	"width": document.body.offsetWidth,
                    	"height": document.body.offsetHeight,
                    	"position":"absolute",
                    	"backgroundColor":"#000",
                    	"opacity":"0.5",
                    	"top":"0px",
                    	"left":"0px",
                    	
                    });  
                    $("#div_load").find("h6").css({
                    	"position":"fixed",
                    	"left":"50%",
                    	"top":"50%",
                    	"color":"#FFF"
                    });
                    $("#div_load").find("h6").html(settings.title);  
                }  
            }  
            else if (settings.action == "close") {  
                if ($("#div_load").length > 0) {
                	$("#div_load").css("display", "none");
                }  
            }  
            else if (settings.action = "setTitle") {  
                if ($("#div_load").length > 0){
                	$("#div_load").find("h6").html(settings.title);
                } else {  
                    var boardDiv = "<div id='div_load'><h6>" + settings.title + "</h6><\/div>";  
                    $(document.body).append(boardDiv);  
                     $("#div_load").css({
                    	"display":"block",
                    	"width": document.body.offsetWidth,
                    	"height": document.body.offsetHeight,
                    	"position":"absolute",
                    	"backgroundColor":"#000",
                    	"opacity":"0.5",
                    	"top":"0px",
                    	"left":"0px"
                    	
                    }); 
                     $("#div_load").find("h6").css({
                    	"position":"fixed",
                    	"left":"50%",
                    	"top":"50%",
                    	"color":"#FFF"
                    });  
                }  
            }  
        };  
  
  
        return (function () { _init() })();  
  
    };  

})(jQuery);  


 $.extend({  
	   
	setMaskTitle: function (title) {  
	    /// <summary>  
	    /// 修改遮罩层的内容 Angle.Yang 2012.03.07 16:35 Add  
	    /// </summary>  
	    /// <param name="title" type="string">遮罩层中的提示信息</param>  
	    /// <returns type="void" />  
	    $.fn.masklayer({ title: title, action: "setTitle" });  
	},  

	openMask: function (title) {  
	    /// <summary>  
	    /// 显示遮罩层DIV Angle.Yang 2012.03.07 16:35 Add  
	    /// </summary>  
	    /// <param name="title" type="string">遮罩层中的提示信息</param>  
	    /// <returns type="void" />  
	    $.fn.masklayer({ title: title, action: "open" });  
	},  

	closeMask: function () {  
	    /// <summary>  
	    /// 关闭遮罩层DIV Angle.Yang 2012.03.07 16:35 Add  
	    /// </summary>  
	    /// <returns type="void" />  
	    $.fn.masklayer({ action: "close" });  
	}  
	     
});

/**使用：
 * <script type="text/javascript" src="/util/ck.layer.js"></script>
 * 	$.openMask("数据提交中，请稍等......") 开始给出提示
 * 	$.setMaskTitle("提交成功成功")  中间修改文本
    setInterval(function(){
    	$.closeMask();
    	window.location.href="/origin/views/register3.html"
    },3000)   成功3s关闭调转页面
 * 
 * **/