	var text = null;
			var content;
			var flag = false;
		
			function startRecognize() {
				var options = {
					engine: 'baidu'
				};
		
				// text.value = '';
				outSet('开始语音识别：');
				plus.speech.startRecognize(options, function(s) {
					outLine(s);
					// text.value += s;
					console.log(s) ;
					content = s
					$.ajax({
						url: "http://192.168.1.13:8080/getTTS",
						type: "get",
						dataType: "jsonp",
						async: false,
						data: {
							"str": content
						},
						jsonpCallback: "successCallback5",
						success: function(msg) {
							$("#sy").remove();
							var audi="<audio  id='sy' src='' autoplay='autoplay' style='display:none' controls='controls' ></audio>";
							$("#outpos").after(audi)
							$("#sy").attr("src",msg.result);
						},
						error: function() {
							alert("通讯错误")
						}
					})
		
				}, function(e) {
					flag = false;
					outSet('语音识别失败：' + JSON.stringify(e));
				});
		
			}
			function showInfo(obj) {
				var content = $(this).val();
			}