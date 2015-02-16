
/**
 * Module dependencies.
 */

//var mongoose = require('mongoose')
//var Article = mongoose.model('Article')
//var utils = require('../../lib/utils')
//var extend = require('util')._extend


//批卷练习
var ZhangjieLianxi = require('../../../kaifa1/mokai/ZhangjieLianxi.js');



exports.baocun = function (req, res){
	console.log( req.param('Name') );

	res.send({name:'ddddddddd'});
};

/**
 * 新建
 */

exports.pijuan = function (req, res){

	//console.log( ZhangjieLianxi );
	var mk = new ZhangjieLianxi();
	mk.xinjian( function(err,mxs){

		//if(err) //  报错页面  return;

		  res.render('lianxi/pijuan', {
			title: '新练习批卷',
			//article: new Article({})
			end:'end'  //为了，号而设的，没有其它显式含义
			,jqdatas:mxs
		  });
	});

	return;

/*
	var jqgridDatas =  [

{ xitiid: '54b4c610475f3dd00b2a1e7b',
   daaiid: '54b4c610475f3dd00b2a1e7a',
	cuowu:'',
	kuofeng:0,
   neilong: '36秒',
   shuoming: undefined 
	
}
,{ xitiid: '54b4c610475f3dd00b2a1e7b',
   daaiid: '54b4c610475f3dd00b2a1e7a',
	cuowu:'',
	kuofeng:0,
   neilong: '77秒',
   shuoming: undefined 
	
}

		];

  res.render('lianxi/pijuan', {
    title: '新练习批卷',
    //article: new Article({})
	end:'tmp'  //为了，号而设的，没有其它显式含义

	,jqdatas:jqgridDatas
  });

  */
};
