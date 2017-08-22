/*
 *   此文件用于validate前台信息验证，其他功能请勿放此文件 
 * 
 */
 $(function () {
    /*注册第一步*/
     if($("#registerForm").length){

        $("#registerForm").validate({
            debug:true,  //只验证不提交表单
            rules: {
                userName: {
                    required: true,
                    userNameCheck:true,
                    minlength:6,
                    maxlength: 20,
                    remote: { //验证用户名是否被占用
                        url: pathUrl+'uniqueness',
                        type:'get',
                        cache: false,
                        crossDomain: true,
                        data:{
                            value: function(){
                                return $('#userName').val()
                            },
                            type:'userName'
                        },
                        dataFilter:function (res) {
                            res = eval('(' + res + ')');
                            console.log(res.state);
                            if(res.state == 404){
                                console.log(true);
                                return true;
                            }else{
                                console.log(false);
                                return false;
                            }
                        }
                    }
                },
                mobile: {
                    required: true,
                    telephone: function () {
                        if($('#telephone').val().length != 11) {
                            $('#getImageCode').attr('disabled', true);
                            return false;
                        } else {
                            if($('#getImageCode').text().indexOf('重发') < 0) {
                                $('#getImageCode').attr('disabled', false);
                            }
                            return true;
                        }

                    },
                    //验证手机号是否被占用
                    remote: {
                        url: pathUrl+'uniqueness',
                        type:'get',
                        cache: false,
                        crossDomain: true,
                        data:{
                            value: function(){
                                return $('#telephone').val()
                            },
                            type:'mobile'
                        },
                        dataFilter:function (res) {
                            res = eval('(' + res + ')');
                            console.log(res.state);
                            if(res.state == 404){
                                $('#getImageCode').attr('disabled', false);
                                return true;
                            }else{
                                $('#getImageCode').attr('disabled', true);
                                return false;
                            }
                        }
                    }
                },
                mobileVerificationCode: {
                    required: true,
                    intNumCheck:true,
                    rangelength:[6,6],
                },
                userPassword: {
                    required: true,
                    minlength: 6
                },
                confirmPassword: {
                    required: true,
                    minlength: 6,
                    equalTo: "#userPassword"
                },
                invitationCodeFrom: {  //邀请码
                    required: false,
                    minlength:6,
                    maxlength: 6,
                    //验证邀请码是否可用
                    remote: {
                        url: pathUrl+'uniqueness',
                        type:'get',
                        cache: false,
                        crossDomain: true,
                        data:{
                            value: function(){
                                return $('#invitationCodeFrom').val()
                            },
                            type:'invitationCode'
                        },
                        dataFilter:function (res) {
                            res = eval('(' + res + ')');
                            console.log(res.state);
                            if(res.state == 200){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    }
                },
                ck: {
                    required: true
                }
            },
            messages: {
                userName: {
                    required: '请输入用户名，用户名为6-20位英文字母和数字组成',
                    userNameCheck: '只能包括6-20位英文字母和数字组成',
                    minlength:'用户名至少6位',
                    maxlength: '用户名最多20位',
                    remote: "用户名已被使用，请使用其他用户名"
                },
                mobile: {
                    required: "请输入手机号",
                    telephone: "请输入正确的手机号",
                    remote: '手机号已被使用，请使用其他手机号'
                },
                mobileVerificationCode: {
                    required: '请输入短信验证码',
                    intNumCheck: '验证码输入不正确',
                    rangelength:'请输入6位数字短信验证码'
                },
                userPassword: {
                    required: "请输入密码",
                    minlength: $.validator.format("密码不能小于{0}个字符")
                },
                confirmPassword: {
                    required: "请输入确认密码",
                    minlength: "确认密码不能小于6个字符",
                    equalTo: "两次输入密码不一致"
                },
                invitationCodeFrom: {
                    minlength:'邀请码至少6位',
                    maxlength: '邀请码最多6位',
                    remote: "邀请码不存在，请检查邀请码是否输入有误"
                },
                ck: {
                    required: '请阅读并同意注册协议'
                }
            },
            errorPlacement:function (error, element) {//更改错误信息显示位置
                error.appendTo(element.parents('.validate-div').next());
            },   
            errorElement:"span", //用什么标签标记错误
            submitHandler: function() {     //更改表单的默认提交
                $.ajax({
                    type:"post",
                    url: pathUrl+"register",
                    data:$("#registerForm").serialize(),
                    cache: false,
                    crossDomain: true,
                    success:function(res) {
                        if(res.state == 200){
                            window.location.href="../../views/register/registerThree.html"
                        }else{
                            alert(res.msg);
                        }
                    }
                });
            },
            success: function(label) {//每个字段验证通过执行函数
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {//可以给未通过验证的元素加效果,闪烁等
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
        })
        
     }

      /*注册-第二步*/
    if($('#registerThreeForm').length) {
        $('#registerThreeForm').validate({
            debug:true,  //只验证不提交表单
            rules: {
                companyName: {
                    required: true,
                    chinese: true,
                    minlength:4
                },
                companyAddress: {
                    required: true,
                    stringCheck: true,
                    minlength:4
                },
                contactsUserName: {
                    required: true,
                    chinese:true,
                    maxlength: 15
                },
                contactsUserPhone: {
                    required: true,
                    checkMobile: true
                },
            },
            messages: {
                companyName: {
                    required: '请输入公司名称',
                    chinese: '公司名称必须为中文',
                    minlength:'公司名称输入不正确'
                },
                companyAddress: {
                    required: '请输入通讯地址' ,
                    stringCheck: '必须为中文、英文、数字',
                    minlength:'通讯地址输入不正确'
                },
                contactsUserName: {
                    required: '请输入您的姓名',
                    chinese:'您的姓名必须为中文',
                    maxlength: $.validator.format("姓名不能超过{0}个汉字")
                },
                contactsUserPhone: {
                    required: '请输入您的固定电话或手机号',
                    checkMobile: '电话号码格式不正确，正确格式为(区号-号码)'
                },
            },
            errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
            submitHandler: function() {     //更改表单的默认提交
                $.ajax({
                    type:"post",
                    url: pathUrl+"ws/user/register",
                    data:$("#registerThreeForm").serialize(),
                    cache: false,
                    crossDomain: true,
                    success:function(res) {
                        if(res.state == 200){
                            window.location.href="../../views/register/registerTwo.html"
                        }else{
                            alert(res.msg);
                        }
                    }
                });
            },
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
        })
    }
    /*登录*/
    if($('#loginForm').length){
        $('#loginForm').validate({
            debug:true, 
            rules: {
            	userName: {
            		required:true
            	},
            	password:{
            		required:true
            	}

            },
            messages: {
            	userName: {
            		required:"请输入注册手机号或账号"
            	},
            	password:{
            		required:"请输入密码"
            	}
            },
            errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
            submitHandler: function(form) {     //更改表单的默认提交
                $.ajax({
                    type:"get",
                    data:$("#loginForm").serialize(),
                    url: pathUrl + 'login',
                     cache: false,
                     crossDomain: true,
                    success:function(res) {
                        console.log(res.state);
                        if(res.state==200){
                            window.location.href="../../views/homeDetails/userCenter.html"
                        }else{
                            alert(res.msg);
                        }
                    }
                    
                });
            },
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }

        });
    }
    /*忘记密码-验证手机号*/
    if($('#firstPwdForm').length) {
        $('#firstPwdForm').validate({
            rules: {
            	mobile: {
                    required: true,
                    telephone: function () {
                        if($('#mobile').val().length != 11) {
                            return false;
                        } else {
                            if($('#getImageCode').text().indexOf('重发') < 0) {
                                $('#getImageCode').attr('disabled', false);
                            }
                            return true;
                        }

                    },
                    remote: {//手机号是否存在
                    	url: pathUrl+'uniqueness',
                        type:'get',
                        cache: false,
                        crossDomain: true,
                        data:{
                            value: function(){
                                return $('#mobile').val()
                            },
                            type:'mobile'
                        },
                        dataFilter:function (res) {
                            res = eval('(' + res + ')');
                            console.log(res.state);
                            if(res.state == 200){
                                $('#getImageCode').attr('disabled', false);
                                return true;
                            }else{
                                $('#getImageCode').attr('disabled', true);
                                return false;
                            }
                        }
                    }
                },
                mobileVerificationCode: {
                    required: true,
                    intNumCheck:true,
                    rangelength:[6,6],
                },
                userPassword: {
                    required: true,
                    minlength: 6
                },
                confirmPassword: {
                    required: true,
                    minlength: 6,
                    equalTo: "#userPassword"
                }
            },
            messages: {
            	mobile: {
                    required: "请输入手机号",
                    telephone: "请输入正确的手机号",
                    remote: '手机号码输入有误或未注册'
                },
                mobileVerificationCode: {
                    required: '请输入短信验证码',
                    intNumCheck: '验证码输入不正确',
                    rangelength:'请输入6位数字短信验证码',
                    remote: '验证码不正确或已失效，请重新获取'
                },
                userPassword: {
                    required: "请输入密码",
                    minlength: $.validator.format("密码不能小于{0}个字符")
                },
                confirmPassword: {
                    required: "请输入确认密码",
                    minlength: "确认密码不能小于{0}个字符",
                    equalTo: "两次输入密码不一致"
                }
            },
            errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
            submitHandler: function(form) {     //更改表单的默认提交
            	$.ajax({
                    type:"PUT",
                    url: pathUrl+"resetPassword",
                    data:$("#firstPwdForm").serialize(),
                    cache: false,
                    crossDomain: true,
                    success:function(res) {
                        if(res.state == 200){
                        	alert("修改密码成功");
                            window.location.href="../../views/login/login.html"
                        }else{
                            alert(res.msg);
                        }
                    }
                });
            },
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
        })
    }

    /*发布票据*/
    if($('#billPublishForm').length){
    	$('#billPublishForm').validate({
    		rules:{
    			/*汇票日期*/
    			ticketBeginDate:{
    				required: true,
                    checkDate: false
    			},
		    	/*汇票到期日*/
    			draftEndDate:{
		    		required: true,
		    		checkDate: false
		    	},
		    	/*票据号码*/
		    	ticketNumber:{
		    		required: true,
                    intNumCheck: true,
                    minlength: 30,
                    maxlength: 30
		    	},
		    	/*交易合同号*/
		    	contractNumber:{
		    		intNumCheck:true
		    	},
		    	/*票据金额*/
		    	ticketAmount:{
		    		required: true,
		    	},
		    	/*出票人全称*/
		    	drawerFullName:{
		    		required: true,
                    chinese: true,
                    minlength: 2
		    	},
		    	/*出票人账号*/
		    	drawerAccountNumber:{
		    		required: true,
                    intNumCheck: true,
                    minlength:16,
                    maxlength: 21
		    	},
		    	/*出票人开户银行*/
		    	drawerBank:{
		    		required: false,
                    stringCheck: true,
                    minlength:4
		    	},
		    	/*收票人全称*/
		    	collectorFullName:{
		    		required: true,
                    chinese: true,
                    minlength:2
		    	},
		    	/*收票人账号*/
		    	collectorAccountNumber:{
		    		required: true,
                    intNumCheck: true,
                    minlength:16,
                    maxlength: 21
		    	},
		    	/*收票人开户银行*/
		    	collectorBank:{
		    		required: false,
                    stringCheck: true,
                    minlength:4
		    	},
		    	/*承兑人账号*/
		    	acceptorAccountNumber:{
		    		required: true,
                    intNumCheck: true,
                    minlength:16,
                    maxlength: 21
		    	},
		    	/*开户行行号*/
		    	acceptorBankNumber:{
		    		required: true,
                    intNumCheck: true,
                    minlength:16,
                    maxlength: 21
		    	},
		    	/*承兑人开户行名称*/
		    	acceptorBankName:{
		    		required: false,
                    stringCheck: true,
                    minlength:4
		    	},
		    	/*最高贴现利率*/
		    	matchingFloorPrice:{
		    		intNumCheck: true,
		    	}
    		},
    		messages:{
    			/*汇票日期*/
    			ticketBeginDate:{
    				required: '请选择汇票日期',
                    checkDate: '日期格式不正确，正确格式为2008-01-01'
    			},
		    	/*汇票到期日*/
    			draftEndDate:{
		    		required: '请选择汇票到期日',
		    		checkDate: '日期格式不正确，正确格式为2008-01-01'
		    	},
		    	/*票据号码*/
		    	ticketNumber:{
		    		required: "请输入30位票据号码",
                    intNumCheck: "票据号码必须为数字",
                    minlength: "票据号码至少位30位数字",
                    maxlength: "票据号码最多30位有效数字"
		    	},
		    	/*交易合同号*/
		    	contractNumber:{
		    		intNumCheck:"请检查交易合同号是否为纯数字"
		    	},
		    	/*票据金额*/
		    	ticketAmount:{
		    		required: '请输入票面金额',
		    	},
		    	/*出票人全称*/
		    	drawerFullName:{
		    		required: "请输入出票人全称",
                    chinese: "出票人全称须为中文",
                    minlength: "请输入出票人全称哦"
		    	},
		    	/*出票人账号*/
		    	drawerAccountNumber:{
		    		required: "请输入出票人账号",
                    intNumCheck: "请检查出票人账号是否数字",
                    minlength:"请检查出票人账号",
                    maxlength: "请检查出票人账号"
		    	},
		    	/*出票人开户银行*/
		    	drawerBank:{
		    		required: "请输入出票人开户银行",
                    stringCheck: "请输入正确出票人开户银行",
                    minlength:"请输入正确出票人开户银行"
		    	},
		    	/*收票人全称*/
		    	collectorFullName:{
		    		required: "请输入收票人全称",
                    chinese: "收票人全称须为中文",
                    minlength: "请输入收票人全称哦"
		    	},
		    	/*收票人账号*/
		    	collectorAccountNumber:{
		    		required: "请输入收票人账号",
                    intNumCheck: "请检查收票人账号是否数字",
                    minlength:"请检查收票人账号",
                    maxlength: "请检查收票人账号"
		    	},
		    	/*收票人开户银行*/
		    	collectorBank:{
		    		required: "请输入收票人开户银行",
                    stringCheck: "请输入正确收票人开户银行",
                    minlength:"请输入正确收票人开户银行"
		    	},
		    	/*承兑人账号*/
		    	acceptorAccountNumber:{
		    		required: "请输入承兑人账号",
                    intNumCheck: "请检查收票人账号是否数字",
                    minlength:"请检查收票人账号",
                    maxlength: "请检查收票人账号"
		    	},
		    	/*开户行行号*/
		    	acceptorBankNumber:{
		    		required: "请输入开户行行号",
                    intNumCheck: "请检查开户行行号是否数字",
                    minlength:"请检查开户行行号",
                    maxlength: "请检查开户行行号"
		    	},
		    	/*承兑人开户行名称*/
		    	acceptorBankName:{
		    		required: "请输入承兑人开户行名称",
                    stringCheck: "请输入正确承兑人开户行名称",
                    minlength:"请输入正确承兑人开户行名称"
		    	},
		    	/*最高贴现利率*/
		    	matchingFloorPrice:{
		    		intNumCheck: "请检查贴现利率是否正确",
		    	}
    		},
    		errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
           
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
    		
    	});
    }
    //实名认证
    if($("#nameIdentification").length){
		$("#nameIdentification").validate({
			rules:{
				businessLicenseNumber:{//营业执照号
					 required: true,
					 minlength:15,
				},
				taxRegistrationNumber:{//税务登记号
					 required: true,
					 minlength:15,
				},
				organizationCode:{//组织机构代码
					required: true,
					minlength:8,
				},
				openingPermit:{//开户许可证核准号
					required: true,
					minlength:14,
				},
				institutionalCreditCode:{//机构信用代码
					required: true,
					minlength:18,
				},
				legalPersonName:{//法人姓名
					required: true,
				},
				legalPersonIdNumber:{//法人身份证号
					checkNumber:true
				},
				operatorName:{
					required: true,
				},
				operatorIdNumber:{
					checkNumber:true
				},
				enterpriseName:{//企业名称
					required: true,
					minlength:4
				},
				taxPersonIdentificationNumber:{
					required: true,
					minlength:8
				},
				address:{
					required: true,
				},
				phone:{
					required: true,
					checkMobile:true
				},
				openingBank:{
	                stringCheck: true,
	                minlength:4
				},
				openingBankAccountNumber:{
					required: true,
	                intNumCheck: true,
	                minlength:16,
	                maxlength: 21
				}

			},
			messages:{
				businessLicenseNumber:{//营业执照号
					 required: "请您填写营业执照号",
					 minlength:"请您填写正确营业执照号",
				},
				taxRegistrationNumber:{//税务登记号
					 required: "请您填写税务登记号",
					 minlength:"请您填写正确税务登记号",
				},
				organizationCode:{//组织机构代码
					 required: "请您填写组织机构代码",
					 minlength:"请您填写正确组织机构代码",
				},
				openingPermit:{//开户许可证核准号
					 required: "请您填写开户许可证核准号",
					 minlength:"请您填写正确开户许可证核准号",
				},
				institutionalCreditCode:{//机构信用代码
					required: "请您填写机构信用代码",
					 minlength:"请您填写正确机构信用代码",
				},
				legalPersonName:{//法人姓名
					required: "请您填写法人姓名",
				},
				legalPersonIdNumber:{//法人身份证号
					checkNumber:"请您填写正确法人身份证号"
				},
				operatorName:{//经办人姓名
					required: "请您填写经办人姓名",
				},
				operatorIdNumber:{
					checkNumber:"请您填写正确经办人身份证号"
				},
				enterpriseName:{//企业名称
					required: "请您填写企业名称",
					minlength:"请您填写正确企业名称"
				},
				taxPersonIdentificationNumber:{//税务人识别号
					required: "请您填写税务人识别号",
					minlength:"请您填写正确税务人识别号"
				},
				address:{
					required: "请您填写地址",
				},
				phone:{
					required: "请您填写电话",
					checkMobile:"格式错误"
				},
				openingBank:{
	                stringCheck: "请您填写正确开户银行",
	                minlength:"请您填写正确开户银行"
				},
				openingBankAccountNumber:{
					required: "请您填写开户银行账号",
	                intNumCheck: "请检查开户银行账号是否纯数字",
	                minlength:"请填写正确开户银行账号",
	                maxlength: "请填写正确开户银行账号"
				}
			},
			errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
		});
		
	}
    
    //修改登录密码
    if($('#updatePassword').length){
        $("#updatePassword").validate({
            rules:{
                oldUserPassword:{//旧密码
                     required: true,
                     minlength:6,
                     maxlength:18
                },
                newUserPassword:{//新密码
                    required: true,
                    minlength:6,
                    maxlength:18,
                    budengTo:"#oldUserPassword"
                },
                confirmPassword:{//确认新密码
                    required: true,
                    minlength:6,
                    maxlength:18,
                    equalTo: "#newUserPassword"
                }
                
            },
            messages:{
                oldUserPassword:{//旧密码
                    required: "请输入您的旧密码",
                    minlength:"请您填写正确旧密码",
                    maxlength: '密码最多20位字母数字下划线',
                },
                newUserPassword:{//新密码
                    required: "请您输入6-18位新密码",
                    minlength: "确认密码不能小于{0}个字符",
                    maxlength: '密码最多20位字母数字下划线',
                    budengTo:"新密码和旧密码不能相同"
                },
                confirmPassword:{//确认新密码
                    required: "请您再次输入密码",
                    minlength: "确认密码不能小于{0}个字符",
                    equalTo: "两次输入密码不一致"
                }
               
            },
            errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
            submitHandler: function() {     //更改表单的默认提交
                //console.log(pathUrl);
                $.ajax({
                    type:"PUT",
                    url: pathUrl+"ws/user/updatePassword",
                    data:$("#updatePassword").serialize(),
                    cache: false,
                    crossDomain: true,
                    success:function(res) {
                        if(res.state == 200){
                           alert("修改密码成功");
                           window.location.href="../../../login/login.html"
                        }else if(res.state==400){
                           alert("密码格式不正确");
                        }else if(res.state==500){
                            alert("旧密码错误")
                        }
                    }
                });
               
            },
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
        });
    }
    //更换手机号码 原手机号可用
    if($("#changePassword").length){
        $("#changePassword").validate({
             debug:true,
            rules:{
                verifyCodes:{//旧密码
                    required: true,
                    maxlength:4
                },
                messagePass:{//新密码
                    required: true,
                    intNumCheck:true,
                    rangelength:[6,6]
                }
            },
            messages:{
                verifyCodes:{//图片验证码
                    required: "请输入图片验证码",                   
                },
                messagePass:{//短信验证码
                    required: "请输入6位短信验证码",
                    intNumCheck: '验证码输入不正确',
                    rangelength:'请输入6位数字短信验证码'
                }
            },
            errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
        
        })         
            
    }
     //更换手机号 第二步
    if($("#newMobileVal").length){
        $("#newMobileVal").validate({
             rules:{
                newMobile:{//新手机号码
                    required: true,
                    telephone:function () {
                        if($('#newMobile').val().length!=11) {
                            //console.log(false);
                            //alert("手机号码验证失败")
                            return false;
                        } else {
                            if($('#sendTwo').text().indexOf('重发') < 0) {
                                $('#sendTwo').attr('disabled', false);
                            }
                           // alert("手机号码验证成功")

                            return true;
                        }

                    },
                    //验证手机号是否被占用
                   /* remote: {
                        url: pathUrl+'uniqueness',
                        type:'get',
                        cache: false,
                        crossDomain: true,
                        data:{
                            value: function(){
                                return $('#newMobile').val()
                            },
                            type:'newMobile'
                        },
                        dataFilter:function (res) {
                            res = eval('(' + res + ')');
                            console.log(res.state);
                            if(res.state == 404){
                                return true;
                            }else{
                                return false;
                            }
                        }
                    }*/
                },
                verifyCodes:{//旧密码
                    required: true,
                    maxlength:4
                },
                mobileVerificationCode:{
                    required: true,
                    intNumCheck:true,
                    rangelength:[6,6]

                }
            },
            messages:{
                newMobile:{//手机号码
                    required: "请输入手机号",
                    telephone: "请输入正确的手机号"
                },
                verifyCodes:{//图片验证码
                    required: "请输入图片验证码",                   
                },
                mobileVerificationCode:{//短信验证码
                    required: "请输入6位短信验证码",
                    intNumCheck: '验证码输入不正确',
                    rangelength:'请输入6位数字短信验证码'
                }
            },
            errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
            submitHandler: function() {     //更改表单的默认提交
                $.ajax({
                    type:"PUT",
                    url: pathUrl+"ws/user/updateMobile",
                    data:$("#newMobileVal").serialize(),
                    cache: false,
                    crossDomain: true,
                    success:function(res) {
                        if(res.state == 200){
                            alert("新手机号绑定成功")
                            $(".mask").show()
                            //window.location.href="../../views/register/registerThree.html"
                        }else{
                            alert(res.msg);
                        }
                    }
                });
            },
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
        
        })         
            
    }
    //更换手机号码 原手机不可用
    if($("#changeMobile").length){
        $("#changeMobile").validate({
             rules:{
                newMobile:{//新手机号码
                    required: true,
                    telephone:function () {
                        if($('#newMobile').val().length!=11) {
                            //console.log(false);
                            //alert("手机号码验证失败")
                            return false;
                        } else {
                            if($('#sendTwo').text().indexOf('重发') < 0) {
                                $('#sendTwo').attr('disabled', false);
                            }
                           // alert("手机号码验证成功")

                            return true;
                        }

                    }
                   
                },
                verifyCodes:{//旧密码
                    required: true,
                    maxlength:4
                },
                mobileVerificationCode:{
                    required: true,
                    intNumCheck:true,
                    rangelength:[6,6]

                }
            },
            messages:{
                newMobile:{//手机号码
                    required: "请输入手机号",
                    telephone: "请输入正确的手机号"
                },
                verifyCodes:{//图片验证码
                    required: "请输入图片验证码",                   
                },
                mobileVerificationCode:{//短信验证码
                    required: "请输入6位短信验证码",
                    intNumCheck: '验证码输入不正确',
                    rangelength:'请输入6位数字短信验证码'
                }
            },
            errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
            submitHandler: function() {     //更改表单的默认提交
                $.ajax({
                    type:"PUT",
                    url: pathUrl+"ws/user/changeMobile",
                    data:$("#changeMobile").serialize(),
                    cache: false,
                    crossDomain: true,
                    success:function(res) {
                        if(res.state == 200){
                            alert("新手机号绑定成功")
                            $(".mask").show()
                        }else{
                            alert(res.msg);
                        }
                    }
                });
            },
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
        
        })         
            
    }
    /*基本信息*/
    if($('#basicInformationForm').length) {
        $('#basicInformationForm').validate({
            debug:true,  //只验证不提交表单
            rules: {
               address:{
                    required: true,
                },
                phone:{
                    required: true,
                    checkMobile:true
                },
                openingBank:{
                    stringCheck: true,
                    minlength:4
                },
                openingBankAccountNumber:{
                    required: true,
                    intNumCheck: true,
                    minlength:16,
                    maxlength: 21
                }
            },
            messages: {
                companyName: {
                    required: '请输入公司名称',
                    chinese: '公司名称必须为中文',
                    minlength:'公司名称输入不正确'
                },
                companyAddress: {
                    required: '请输入通讯地址',
                    stringCheck: '必须为中文',
                    minlength:'通讯地址输入不正确'
                },
                contactsUserName: {
                    required: '请输入您的姓名',
                    chinese:'您的姓名必须为中文',
                    maxlength: $.validator.format("姓名不能超过{0}个汉字")
                },
                contactsUserPhone: {
                    checkMobile: '电话号码格式不正确，正确格式为(区号-号码)'
                },
            },
            errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
        })
    }
    /*实名认证首页*/
    if($('#nameCertificationHomeForm').length) {
        $('#nameCertificationHomeForm').validate({
            debug:false,  //只验证不提交表单
            rules: {
                companyName: {
                    required: true,
                    chinese: true,
                    minlength:4
                },
                companyAddress: {
                    required: false,
                    stringCheck: true,
                    minlength:4
                },
                contactsUserName: {
                    required: true,
                    chinese:true,
                    maxlength: 4
                },
                contactsUserPhone: {
                    required: false,
                    checkMobile: true
                },
            },
            messages: {
                address:{
                    required: "请您填写地址",
                },
                phone:{
                    required: "请您填写电话",
                    checkMobile:"格式错误"
                },
                openingBank:{
                    stringCheck: "请您填写正确开户银行",
                    minlength:"请您填写正确开户银行"
                },
                openingBankAccountNumber:{
                    required: "请您填写开户银行账号",
                    intNumCheck: "请检查开户银行账号是否纯数字",
                    minlength:"请填写正确开户银行账号",
                    maxlength: "请填写正确开户银行账号"
                }
            },
            errorPlacement:function (error, element) {
                error.appendTo(element.parents('.validate-div').next());
            },   //报错的位置
            errorElement:"span",  //报错的标签
            success: function(label) {
                label.html("&nbsp;").addClass("checked");
            },
            highlight: function(element, errorClass) {
                $(element).parents('.validate-div').next().find("." + errorClass).removeClass("checked");
            }
        })
    }

 });
