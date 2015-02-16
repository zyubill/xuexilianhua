'use strict'

//选项 xuaxia 
var Moxin = require('../../moxin/zhiliao.js');
var Q = require('q');

//TODO 这类可能只有在与网页或WEB SERVICE时有用吧，因为不是简单的调用数据库操作。有时进接使用模型就可以了。

module.exports = exports = Pijuan ;


//章节练习
//对某个章节
//TODO
//新建一个练习
//编辑一个练习
//更新一个练习
//删除一个练习

function Pijuan() {

	//内部函数
//	this.parse = function (  ){
//
//	}
	var lianxiid;
	var zjid = '54b4c610475f3dd00b2a1e7c';

	//答案列表
	//Zhangjie.prototype.daaiLianbian = function(){
	ZhangjieLianxi.prototype.xinjian = function(CB){
		var lianxi = new Moxin.LianxiZhangjie( { yonghu:'俞可亲' } );

		//某个章节
		//列出所有的答案数据
		//转成JQGRID格式

		//var lxid = '54bf9233cb9c38c00f64ec1f';
		Q()
		.then( function(){ 
			return Q.ninvoke(Moxin.Zhangjie,'findById',zjid);
			//return Q.nfcall(Moxin.Zhangjie.findById,'54b4c610475f3dd00b2a1e7c'); //报错
		})
		.then( function(mx){
			//CB(null,mx);
			//{id:"12345",name:"Desktop Computer",note:"note",stock:"Yes",ship:"FedEx"},

			var jqdatas = [];

			var xitis = mx.xitis;
			for(var i=0,len = xitis.length;i<len;i++){
				var xiti = xitis[i];
				//var jqdata = { xiti:xiti._id };
				//	jqdatas.push( jqdata,jqdata )


				var jqdata  = xiti.daais.map( function(daai,index){
						//应该只输出正确的答案
						//简单模型，直接可以返回吧？因为都是集合，属性也不选择的话
						var jqdaai = { xitiid:xiti._id,daaiid:daai._id,neilong:daai.neilong,shuoming:daai.shuoming };
						return jqdaai;
					});
				//因为现在jqdata是数组，处理得稍微麻烦一些
				//对数组合并的内存要求有一篇文档，已百度文章
				jqdatas.push.apply( jqdatas, jqdata );
				jqdata = null;
			}
			console.log( jqdatas );
			return;
		})
		.fail(CB)
		.fin( function(){
				console.log('fin');
		})
		;


	}


}

var mk = new ZhangjieLianxi();
mk.xinjian( console.log );
	//function(err,datas){});
