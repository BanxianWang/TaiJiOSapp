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
					if(content.indexOf("找")!=-1){
						$.ajax({
							url: "http://106.14.208.219:8080/taijios/getshopTTS",
							type: "post",
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
								    
									$("#sname1").text(msg.shops[0].sName)
									$("#sname2").text(msg.shops[1].sName)
									$("#sname3").text(msg.shops[2].sName)
									$("#sname4").text(msg.shops[3].sName)
									$("#sname5").text(msg.shops[4].sName)
									
									$("#avgf1").text(msg.shops[0].avgcomment)
									$("#avgf2").text(msg.shops[1].avgcomment)
									$("#avgf3").text(msg.shops[2].avgcomment)
									$("#avgf4").text(msg.shops[3].avgcomment)
									$("#avgf5").text(msg.shops[4].avgcomment)
									$("#saddress1").text(msg.shops[0].saddress)
									$("#saddress2").text(msg.shops[1].saddress)
									$("#saddress3").text(msg.shops[2].saddress)
									$("#saddress4").text(msg.shops[3].saddress)
									$("#saddress5").text(msg.shops[4].saddress)
									
									$("#pcount1").text(msg.shops[0].pcount)
									$("#pcount2").text(msg.shops[1].pcount)
									$("#pcount3").text(msg.shops[2].pcount)
									$("#pcount4").text(msg.shops[3].pcount)
									$("#pcount5").text(msg.shops[4].pcount)
									
									$("#avgprice1").text(msg.shops[0].avgprice)
									$("#avgprice2").text(msg.shops[1].avgprice)
									$("#avgprice3").text(msg.shops[2].avgprice)
									$("#avgprice4").text(msg.shops[3].avgprice)
									$("#avgprice5").text(msg.shops[4].avgprice)
									
									$("#simg1").attr("src",msg.shops[0].imgurl);
									$("#simg2").attr("src",msg.shops[1].imgurl);
									$("#simg3").attr("src",msg.shops[2].imgurl);
									$("#simg4").attr("src",msg.shops[3].imgurl);
									$("#simg5").attr("src",msg.shops[4].imgurl);
									
									$("#dianlist").show();
									
									$("#latitude1").text(msg.shops[0].latitude);
									$("#longitude1").text(msg.shops[0].longitude);
									
									$("#latitude2").text(msg.shops[1].latitude);
									$("#longitude2").text(msg.shops[1].longitude);
									
									$("#latitude3").text(msg.shops[2].latitude);
									$("#longitude3").text(msg.shops[2].longitude);
									
									$("#latitude4").text(msg.shops[3].latitude);
									$("#longitude4").text(msg.shops[3].longitude);
									
									$("#latitude5").text(msg.shops[4].latitude);
									$("#longitude5").text(msg.shops[4].longitude);
									
							},
							error: function() {
								alert("通讯错误")
							}
						})
					}else{
						$.ajax({
							url: "http://106.14.208.219:8080/taijios/getTTS",
							type: "post",
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
					}
		
				}, function(e) {
					flag = false;
					outSet('语音识别失败：' + JSON.stringify(e));
				});
		
			}
			function showInfo(obj) {
				var content = $(this).val();
			}