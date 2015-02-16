'use strict'

//选项 xuaxia 
//var Zhangjie = require('../mokai/Zhangjie.js');
var Moxin = require('../moxin/zhiliao.js');
var Q = require('q');


//初始化  chushihua
function Chushihua() {

	var CThis = this;

	this.zhangjie = {};
	//this.prototype.zhangjie = { s:'prototype'};

	//内部函数
	this.parse = function (  ){
		console.log('parse');
	}


	//增加一个章节
	Chushihua.prototype.zj = function(CB){

		console.log(this);
		console.log( this.zhangjie );
		//console.log( zhangjie ); //error
		var mx = {mc:'秒的认识'};
		Moxin.Zhangjie.create(mx,function(err,zhangjie){
			//this.zhangjie = zhangjie;
			//console.log(this);
			console.log( CThis.zhangjie );
			CThis.zhangjie = zhangjie;
			//this.zhangjie = {};
			CB(err,zhangjie);
		});



	//new Zhangjie().create(mx,CB);

/*
		Q()
		.then( function(){
			return Q.ninvoke(Zhangjie, "create", mx); 
		})
		//.then( parse )
		.fail(console.log)
		.fin( function(result){
				console.log(result);
			}
		)
		;
*/
	}

	//增加一个习题 
	//现在题目不需要，因为只需要列出答案
	Chushihua.prototype.xt = function(CB){

		console.log( this.zhangjie);
		return;
		/*
		var mx = {tigan:'计量很短的时间,常用比分更小的单位是(     )'
					,tixin:'填空题'
				};
		*/

		//能一起做为一个模型增加吗？
		var daais = [
			{	neilong:'秒',zhequema:true	,bianhao: 0	}
		];
		
		//导入时自动计算或预处理工作
		//bianhao可以自动计算  或者在保存DAAI时计算，如果是网页来处理的，也可以直接编辑完
		//数量有DAAIS可以自动计算  是不是可以有内置函数，或成员变量，例子里有一个的。但是临时属性，最好能直接保存成属性
		var mx = {
			daaiduishulia:1 //答案对或正确的数量  正确的答案数量
			,daaizhoushu:1 //答案总数量  正确的答案数量，包含一些混淆的答案数量
		};

//		console.log(daais[0]);
//		Moxin.Daai.create(daais[0],CB);
//		return;
		
		//先保存习题，后保存答案
		//mxsl 模型实例，SL，实例的简称
		Moxin.Xiti.create(mx,function(err,xiti){
			//err判断，

			xiti.daais.create(daais[0],function(err,daaisl){
				console.log( daaisl );
				xiti.daais(console.log);

				Moxin.ZhangjieXiti.create({},function(err,zjxt){
					zjxt.xiti(xiti);
					console.log(xiti);
					console.log(zjxt);

					//Monxin
				});
				//CB(err,xiti);
			});
			//var daai = xiti.daais.build( daais[0]);
		    //post.save(console.log);
			/*
			//代码不对：DAAI实例中没有XTID，需要另外设置或提前设置
			Moxin.Daai.create(daais[0],function(err,daaisl){
				console.log( daaisl );
				mxsl.daais(console.log);
				CB(err,mxsl);
			});
			*/
		});
		
		//Moxin.Xiti.create(mx,CB);
		//Moxin.Xiti.create(mx,CB);

		//user.posts.create(data)
/*
				Q()
		.then( function(){
			return Q.ninvoke(Zhangjie, "create", mx); 
		})
		//.then( parse )
		.fail(console.log)
		.fin( function(result){
				console.log(result);
			}
		)
		;
*/
	}

	//章节与试题进行关连


}


var chushihua = new Chushihua();
chushihua.zj(  console.log  );
chushihua.xt(  console.log  );
//chushihua.parse();
return ;

