'use strict'

//选项 xuaxia 
var Moxin = require('../moxin/zhiliao.js');
var Q = require('q');

//TODO 这类可能只有在与网页或WEB SERVICE时有用吧，因为不是简单的调用数据库操作。有时进接使用模型就可以了。

module.exports = exports = Zhangjie ;
function Zhangjie() {

	//内部函数
//	this.parse = function (  ){
//
//	}

	//外部函数
	Zhangjie.prototype.create = function(mx,CB){

		//	return Q.ninvoke(Model.Heyue, "create", value); 
		//console.log( Moxin.Zhangjie );
		Moxin.Zhangjie.create(mx,CB);
	//new Moxin.Zhangjie().create(mx,CB);
//		Q()
//		.then( function(){
//			return Q.ninvoke(Moxin.Zhangjie, "create", mx); 
//		})
//		//.then( parse )
//		.fail(console.log)
//		.fin( function(result){
//				console.log(result);
//				CB();
//			}
//		)
//		;
	}
	
}

return ;

