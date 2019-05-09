			if(!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
				new WOW().init();
			};
			$(function() {
				getTemperature();
				getSomeInfo();
				getHouseTemperature();
				 getDaysTemperature();
				setInterval(function() {
					getTemperature();
				}, 10000)
			});

			function showData(data) {
				console.log(data)
			}
			
			//ajax获取实时温度
			function getTemperature() {
				$.ajax({
					url: "http://192.168.8.119:8080/jsp/getLastTemperature",
					type: "post",
					data: {
						machineID: 1
					},
					dataType: "jsonp",
					jsonpCallback: "successCallback", //指定回调函数名称
					success: function(data) {
						$("#sx2").text(data.temperature.temperature + "°c")
					}
				});
			}
		
			//ajax获取24小温度
			function getHouseTemperature(){
				$.ajax({
					url: "http://192.168.8.119:8080/jsp/getHoursTemperature",
					type: "post",
					data: {
						machineID: 1
					},
					dataType: "jsonp",
					jsonpCallback: "successCallback1", //指定回调函数名称
					success: function(data) {
						var dataModels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23','24'];
						bindContainer($("#container"),data.hoursavg,dataModels);
					}
				});
			}
			
			function getDaysTemperature(){
				$.ajax({
					url: "http://192.168.8.119:8080/jsp/getDaysTemperature",
					type: "post",
					data: {
						machineID: 1
					},
					dataType: "jsonp",
					jsonpCallback: "successCallback2", //指定回调函数名称
					success: function(data) {
						var dataModels = ['1', '2', '3', '4', '5', '6', '7'];
						bindContainer($("#container1"),data.daysavg,dataModels);
					}
				});
			}
			
			function getSomeInfo(){
				$.ajax({
					url: "http://192.168.8.119:8080/jsp/getSomeInfo",
					type: "post",
					data: {
						machineID: 1
					},
					dataType: "jsonp",
					jsonpCallback: "successCallback3", //指定回调函数名称
					success: function(data) {
						$("#maxTemperature").text(data.max);
						$("#minTemperature").text(data.min);
						$("#avgTemperature").text(data.avg);
					}
				});
			}
			
			
		
			//绑定温度列表控件，dm为jquery列表元素，temperatures为温度数组,datas为列表区间个数
			function bindContainer(dm,temperatures,dataModels) {
						dm.highcharts({
							chart: {
								type: 'area',
								spacingBottom: 30,
								backgroundColor: 'rgba(0,0,0,0)'
							},
							legend: {
								//去掉底部的series名称
								enabled: false,
							},
							title: {
								text: ''
							},
							subtitle: {
								text: false,
								floating: false,
								align: 'right',
								//verticalAlign: 'bottom',
								//y: 15
							},
							/*
							legend: {
								layout: 'vertical',
								align: 'left',
								verticalAlign: 'top',
								x: 150,
								y: 100,
								floating: true,
								borderWidth: 1,
								backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
							},
							*/

							xAxis: {
								lineColor: '#5EB8EE',
								lineWidth: 1,
								tickColor: '#5EB8EE',
								tickLength: 5,
								tickWidth: 1,
								gridLineColor: '#5EB8EE',
								plotBorderColor: '#5EB8EE',
								categories: dataModels,
								labels: {
									//enabled:false, //去掉分类名称
									formatter: function() {
										return this.value;
									},
									style: {
										color: '#b8def5',
										fontSize: '12px',
										fontFamily: '微软雅黑'
									}
								}
							},

							yAxis: {
								lineColor: '#5EB8EE',
								lineWidth: 1,
								tickColor: '#5EB8EE',
								tickLength: 5,
								tickWidth: 1,
								gridLineColor: '#5EB8EE',
								title: {
									text: false,

								},

								labels: {
									formatter: function() {
										return this.value;
									},
									style: {
										color: '#b8def5',
										fontSize: '10px',
										fontFamily: '微软雅黑'
									}
								}
							},
							//数据点提示框

							/*tooltip: {
								headerFormat: '',
								pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
							},*/
							tooltip: {
								formatter: function() {
									return '<b>' +'平均温度：' + '</b><br/>' +
										 + this.y+"°C";
								}
							},

							plotOptions: {
								areaspline: {
									color: '#rgba(0, 0, 0, 0.8)',
									lineColor: '#000',
									fillOpacity: 0.2
								}
							},

							credits: {
								enabled: false
							},
							series: [{
								name: '月入额',
								data: temperatures,
								marker: { //线上数据点
									radius: 5,
									lineWidth: 2,
									lineColor: '#a6e1f8',
									fillColor: '#0090d1',
									states: {
										hover: {
											lineColor: '#fe7a6b',
											fillColor: '#fe7a6b',
											//enabled:false
										}
									}
								}

							}]

						});
					}