'use strict'

//选项 xuaxia 
//var Tice = require('../models/zhiliao.js');
require('../models/zhiliao.js');  //TODO 这个应该是在某处被包含一次就可以了

var mongoose = require('mongoose')
var LianxiZhangjie = mongoose.model('LianxiZhangjie')
var Zhangjie = mongoose.model('Zhangjie')
var Q = require('q');


//TODO 可以将整个CONTROLLER整理成一个类，这个类EXPORT，
//TODO 测试类EXPORT后，ROUTER.JS中是否能调用 
//TODO 可以将整个类放入REQ中，能否THIS，或者CONTROLLER封装成对某个类，并对应某个类的对应ACTION。类是独立的。CONTROLLER行为封装

//TODO 页面中可以直接增加删除提示或编辑前的一些提示JAVASCRIPT代码或HTML代码，这样就不需要增加一些页面了。


//题册模块
//某人  某个章节ID，还没有对应的批卷
//新建和编辑，在这里有点重复
//编辑：加载某个批卷信息
//新建：由章节ID，生成一个新的批卷，并组合新的答题
//练习章节转成JQGRID需要的数据模型数组

//function toJQ( lianxiZhangjie){
function toJQ( zhangjie){  //章节里的习题转成JQGRID

		console.log('toJQ');
		console.log(zhangjie);
			var jqdatas = [];

			var xitis = zhangjie.xitis;

			console.log(xitis);
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
				//新加入的应该要在后面
				jqdatas.push.apply( jqdatas, jqdata );
				jqdata = null;
			}

			return jqdatas;
}

function pijuan(zjid,CB){

		Q()
		.then( function(){ 
			return Q.ninvoke(Zhangjie,'findById',zjid);
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
				//新加入的应该要在后面
				jqdatas.push.apply( jqdatas, jqdata );
				jqdata = null;
			}
			console.log( jqdatas );
			CB(null,jqdatas);
			return;
		})
		.fail(CB)
			//在这些模块中还是不需要FIN吧，因为没有要特别处理代码，直接通过CB传递
//		.fin( function(){
//				console.log('fin');
//		})
		;
}
//TODO   某个用户某本题集的章节，包含练习情况  这个应该是在章节模块里的


//TODO 列出一个章节的练习批卷信息  如果没有该章练习，则新建一个章节练习。如果已经存在，则读取  //状态  新建章节，做题，批卷。因为现在不一定需要做题内容，做题这步先略，或者做题内容和批卷 内容在一起

var zjid = '54b4c610475f3dd00b2a1e7c';
var lxzjid = '54cb33a71a577cd41b33796b';

///**
// * Load
// */
//
//exports.load = function (req, res, next, id){
//  var User = mongoose.model('User');
//
//  Article.load(id, function (err, article) {
//    if (err) return next(err);
//    if (!article) return next(new Error('not found'));
//    req.article = article;
//    next();
//  });
//};



/**
 * Load
 */

//利用NEXT规则，先处理ID，ID在多个函数中都需要处理的
exports.load = function (req, res, next, id){

	LianxiZhangjie.load(id
		//,console.log
		,function(err,mx){
		    if (err) return next(err);
			if (!mx) return next(new Error('not found'));
			console.log(mx);
			req.lxzj = mx;  //进入请求环境变量

			next();
		}
	);

};


/**
* 新建
*/
/*
//export.xinjian = function(req,res){
exports.xinjian = function(cb){

		console.log( 'xinjian');
		Q()
		.then( function(){ 
			console.log('q1',zjid);
			//cb('ddddddd');
			//Zhangjie.findById(zjid,cb);

			return Q.ninvoke(Zhangjie,'findById',zjid);
		})
		.then( function(mx){
			console.log('q2');
			console.log(mx);

			var lxzj = new LianxiZhangjie();	
			lxzj.zj = mx;
			
			//保存
			//lxzj.save(  cb );
		})
		.fail(  cb )
		.fin( function(){
			console.log('fin');
		})
		;

};
*/
exports.xinjian = function(req,res){
	console.log( 'xinjian');
	

//		//TODO 在Q里无法执行REQ.RENDER
//
//		Q()
//		.then( function(){ 
//			console.log('q1',zjid);
//			//cb('ddddddd');
//			//Zhangjie.findById(zjid,cb);
//
//			return Q.ninvoke(Zhangjie,'findById',zjid);
//		})
//		.then( function(mx){
//			console.log('q2');
//			console.log(mx);
//
//			var lxzj = new LianxiZhangjie();	
//			lxzj.zj = mx;
//			
//			//保存
//			//lxzj.save(  cb );
//			//在页面系统中不是保存，而是转至编辑页面
//			//console.log(jqdata);
//			  res.render('lianxipijuan/form', {
//			    title: '新建 ',
//			    lxzj: lxzj
//				,jqdata: toJQ(lxzj.zj)
//			 });
//		})
//		.fail(  function(){
//			next(err)
//		})
//		.fin( function(){
//			console.log('fin');
//
//		})
//		;

	Zhangjie.findById(zjid,function(err,mx){
		console.log(err,mx);
			var lxzj = new LianxiZhangjie();	
			lxzj.zj = mx;  //无法将整个MX设置，ZJ＝ID，SCHEMA是这样定的。使用POPULATE。这里应该如何使用？

			console.log('ll');
			//console.log( toJQ(lxzj.zj) ); // 通不过
			console.log( toJQ(mx) ); //

				  res.render('lianxipijuan/form', {
					title: '新建 ',
					lxzj: lxzj
					//,jqdata: toJQ(lxzj.zj)
					,jqdata: toJQ(mx)
				 });
	});

}


/**
* 编辑
*/
exports.bianji = function(req,res){
	console.log( 'bianji');
	
			var lxzj = req.lxzj;
			var jqdata = toJQ(lxzj.zj);  //转成JQGRID需要的数组形式
			console.log(jqdata);
			  res.render('lianxipijuan/form', {
			    title: 'Edit ' + lxzj._id,
			    lxzj: lxzj
				,jqdata: jqdata
			 });

}
/*
exports.bianji = function(req,res){
	console.log( 'bianji');
	
	LianxiZhangjie.load(lxzjid
		//,console.log
		,function(err,mx){
			console.log(mx);
			var lxzj = mx;
			var jqdata = toJQ(lxzj.zj);
			console.log(jqdata);
			  res.render('lianxipijuan/form', {
			    title: 'Edit ' + lxzj._id,
			    lxzj: lxzj
				,jqdata: jqdata
			 });
		}
	);

}
*/

/**
* 保存
*/
exports.baocun = function (req, res){
	//console.log( req.param('Name') );

	var jqdatas = req.param('jqdatas');
	console.log( jqdatas );
	res.send({result:'保存完毕'});

}

/**
* 删除
*/
exports.shanchu = function (req, res){

	var lxzj = req.lxzj;

	//console.log( req.param('Name') );
  //var article = req.article;
  lxzj.remove(function (err){
    req.flash('info', 'Deleted successfully');
    res.redirect('/lianxipijuan/liebiao');
  });

	//res.send({result:'删除成功'});
	//TODO 需要重新刷新列表呀？

}
//TODO 这个现在可以先不要。一个章节，一个用户可以有多个练习。但编辑时一般选择最新的那个，当然也可以挑选
//ZJID  根据章节ID，选出练习列表

//新增练习,现有练习
//TODO  从模型上来说应该只列出练习章节，而从使用角度来说列出章节看得更合理
//TODO 列出某本书的练习章节  ？ 如果需要新的练习章节，再从某本书的章节里去选。或者
//TODO 列出某本书的章节，增加练习的状态信息
//exports.zhangjie
exports.liebiao = function (req, res){

	console.log('liebiao1');

	//列出所有的练习章节
	LianxiZhangjie.list( 
		{}
		,function(err,mxs){
			console.log(mxs);
			  res.render('lianxipijuan/liebiao', {
				title: '批卷列表'
				//,jqdatas: jqdatas
				,mxs:mxs
			  });
		}
	);


	//下面的错误的，属于编辑操作里的
/*
	pijuan(zjid,function(err,jqdatas){
		console.log(err,jqdatas);
		//输出内容
			  res.render('lianxipijuan/jqgrid', {
				title: '批卷列表',
				jqdatas: jqdatas
			  });

	})
	;
*/
/*
	//批卷  不需要分页等
var count = 1;

		  res.render('lianxipijuan/liebiao', {
			title: '批卷列表',
			jqdatas: [],
			page: page + 1,
			pages: Math.ceil(count / perPage)
		  });
*/

/*
  LianxiZhangjie.list(options, function (err, mxs) {
    if (err) return res.render('500');

	LianxiZhangjie.count().exec(function (err, count) {
		  res.render('lianxipijuan/liebiao', {
			title: '批卷列表',
			jqdatas: mxs,
			page: page + 1,
			pages: Math.ceil(count / perPage)
		  });
	 });

  });
  */
};



//Zhangjie.findById(zjid,console.log);
/*
global.db = mongoose.createConnection('mongodb://localhost/xuexiliahua');
Zhangjie.findById(zjid,console.log);
//pijuan( console.log );
xinjian( console.log );
*/
/*
var lxzjid = '54cb33a71a577cd41b33796b';
LianxiZhangjie.load(lxzjid,console.log
//	function(){}
);
*/

//console.log('end');