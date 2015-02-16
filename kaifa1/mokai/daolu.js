'use strict'

//选项 xuaxia 
var Moxin = require('../moxin/zhiliao.js');
var Q = require('q');

//TODO 这类可能只有在与网页或WEB SERVICE时有用吧，因为不是简单的调用数据库操作。有时进接使用模型就可以了。

module.exports = exports = Daolu ;
function Daolu() {

	//内部函数
//	this.parse = function (  ){
//
//	}

	//外部函数
	//TODO 去除XITI,DAAI的ID
	Daolu.prototype.zhangjie = function(){

		//读取JSON文件

		
		var zhangjie = {
			mc:"秒的认识"
			,xitis:[
				['秒'],['1','5','60','1'],['15','20']
				,
				['秒'],['分'],['秒'],['分']
				,
				[6,0,20],[8,30,15],[10,58,50]
				,
				['小狗','小白兔',8,'5时59分58秒',2]
				,
				['30','80','20','1','跳一下']
				,
				['36秒']
			]
		};
			//处理XITI属性
//			zhangjie.xitis = [
//				{ tigan:'ffffffff'}
//				];
			zhangjie.xitis = zhangjie.xitis.map( function(dlXiti){

				  //现在导入时都是答案
				  var dlDaais = dlXiti;
				var daais  = dlDaais.map( function(dlDaai,index){
					  var daai = new Moxin.Daai(
					{
						neilong:dlDaai
						,zhequema:true
						//,bianhao:index  //数组属性已经包含了顺序，编号在些无意义。就是保存时如何处理顺序的调整，还未研究过
					}
						  );
					return daai;
				});

				
				  //var xiti = { tigan:'ffffffff'};
				  var xiti = new Moxin.Xiti( { } );
				  xiti.daais = daais;

				  return xiti;
			});

			console.log( zhangjie.xitis );
		
		//保存一个章节
		  Moxin.Zhangjie.create( zhangjie, 
			  function (err, doc) {
				if (err) return next(err);
				//res.send(doc);
				console.log(doc);
				console.log(doc.xitis);
		  })

	}




	//导入交卷后的相关数据
	//将答题数据保存
	Daolu.prototype.jiaojuan = function(){

		//现在使用模拟数据，作为传入数据
			//获取一个章节的完整数据
			//只保留答案所需要的数据和顺序
			//答题内容从正确答案复制
			//Moxin.Zhangjie.find({ mc: /^秒的认识/ }, function (err, mxs) {  //test ok
			//Moxin.Zhangjie.find({ id: '54b4c610475f3dd00b2a1e7c' }, function (err, mxs) {   //test failure
			//Moxin.Zhangjie.find({ _id: '54b4c610475f3dd00b2a1e7c' }, function (err, mxs) {   //test ok
//			  if (err) return console.error(err);
//			  console.log(mxs);
//			  console.log(mxs[0].xitis);
//			});
			Moxin.Zhangjie.findById('54b4c610475f3dd00b2a1e7c' , function (err, mx) {   //test ok
			  if (err) return console.error(err);
			  console.log(mx);
			  console.log(mx.xitis);

				var zhangjie = mx;
				var lianxi = new Moxin.LianxiZhangjie( { yonghu:'俞可亲' } );
				lianxi.zhangjie = { zjid: zhangjie._id};
				lianxi.zhangjie.xitis = zhangjie.xitis.map( function(xiti){
					var lxxt = { daais:[] };
					lxxt.xtid = xiti._id;

					lxxt.daais  = xiti.daais.map( function(daai,index){

						var lxdaai = {
							daid:daai._id
							,cuowu:0
							,kofen:0
							,dati: daai.neilong
						};

						//console.log( lxdaai);
						return lxdaai;
					});

					return lxxt;

				});
				
				//console.log(lianxi);
				console.log(lianxi.zhangjie.xitis);


				//保存答题数据
				lianxi.save(function (err, lianxi) {
				  if (err) return console.error(err);
				  //fluffy.speak();
					console.log( lianxi );
				});



			});


			//TODO 还没测试过关连某个集合后，MONGOOSE是如何处理的
			
//			Moxin.Zhangjie.find(function (err, mxs) {
//			  if (err) return console.error(err);
//			  console.log(mxs)
//			})

		
		//传入数据处理
		//判断交卷数据是否已存在，如果允许更改答案的话
		//判断是否更新
		//保存

	}

	//整个章节的对错情况保存
	//暂时整个章节为一次，以后可引入一个一个试题
	//整个章节处理是在页面完成
	Daolu.prototype.pijuan = function(){

		//传入批卷数据
	  //传入的就是批改后的数据
	  //TODO 

		//现在直接查找某个练习，修改对错
 // yonghu: '俞可亲',
  //_id: 54bf9233cb9c38c00f64ec1f,
  Moxin.LianxiZhangjie.findById('54bf9233cb9c38c00f64ec1f' , function (err, mx) {   //test ok
			  if (err) return console.error(err);

			  //console.log(mx);
			  var lianxi = mx;

			  //答案和答题比对

			  //更新练习

			  //章节错误数  //某个习题错误数   //某个答案错误数
			 lianxi.cuowu = 1;

			 var xiti = lianxi.zhangjie.xitis[0];
			 xiti.cuowu = 1;
			 xiti.daais[0].cuowu = 1;

			 //lianxi.update();  //update的用法更多样化
			 //保存批卷数据
			 lianxi.save(  function (err, lianxi) {
				  if (err) return console.error(err);
				  //fluffy.speak();
					console.log( lianxi );
					console.log(lianxi.zhangjie.xitis[0] );
			});





  });

		//保存批卷数据
		//var lianxi = new Moxin.LianxiZhangjie( { } );

		//console.log(lianxi);

	}
	

	//TODO  数据统计
	//TODO  页面级开发
}


//var daolu = new Daolu();
//daolu.zhangjie();
//daolu.jiaojuan();
//daolu.pijuan();
return ;

