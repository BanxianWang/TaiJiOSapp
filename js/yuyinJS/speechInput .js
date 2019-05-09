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
					content = s
					$.ajax({
						url: "http://192.168.8.119:8080/jsp/test",
						type: "get",
						dataType: "jsonp",
						async: false,
						data: {
							"str": content
						},
						jsonpCallback: "successCallback5",
						success: function(msg) {
							alert(111)
							console.log(msg.result);
		
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
				alert(11)
				var content = $(this).val();
		
			}