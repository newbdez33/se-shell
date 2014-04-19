/*
 *	Demo Login 
 *  Jacky <newbdez33@gmail.com>
 */
var AppView = Backbone.View.extend({
	el: $(".container"),

	events: {
		"click #loginBtn" : "doLogin",
	},

	initialize: function () {
		console.log("AppView initialized.");
	},

	render: function() {
		return this;
	},

	doLogin: function() {

		var username = this.$("#username").val();
		var password = this.$("#password").val();
	
		$.post('http://218.61.39.208/jacky/Account/LoginJson.aspx', { 
			username: username, 
			password: password 
		}, function(response){
			console.log(response);
			if(response.Funcs=="") {
				$('.modal').modal('show');
				return;
			}

			$(".container").transition({ scale: 2, opacity: 0, complete:function(){
				console.log("登陆成功");
				$(".container").html('');	//临时处理
				$("<h2>校讯快递 | 您好"+username+"</h2>").appendTo($(".container"));
				$(".container").css({ scale: 1, opacity:0 }).transition({ scale: 1, opacity: 1});

				$.get('http://218.61.39.208/jacky/Account/CurrentRoleByGroupJson.aspx', function(resp) {
					console.log(resp.RoleName);
					var type = "未知";
					switch(resp.RoleName[0]) {
						case "ParentRole" :
						type = "家长";
						break;
						case "SuperAdministrator" :
						type = "管理员";
						break;
						case "GroupMasterRole" :
						type = "班主任";
						break;
						case "GroupAssistantMaster" :
						type = "任课老师";
						break;
					}
					
					$("<h4>你已经成功登陆("+type+"帐号)。</h4>").appendTo($(".container"));
					var jsonPretty = JSON.stringify(response,null,2);  
					$("<div>以下为API返回内容：</div>").appendTo($(".container"));
					$("<pre>"+jsonPretty+"</pre>").appendTo($(".container"));
				});
			}});
		});

		//TODO 登陆Loading indicator
		//TODO 成功后简介页面transite
	},

});