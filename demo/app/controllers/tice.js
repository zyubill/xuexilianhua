'use strict'

//选项 xuaxia 
//var Tice = require('../models/zhiliao.js');
require('../models/zhiliao.js');  //TODO 这个应该是在某处被包含一次就可以了

var mongoose = require('mongoose')
var Tice = mongoose.model('Tice')
var Q = require('q');


//题册模块

exports.liebiao = function (req, res){
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
  var perPage = 30;
  var options = {
    perPage: perPage,
    page: page
  };

  Tice.list(options, function (err, mxs) {
    if (err) return res.render('500');

	Tice.count().exec(function (err, count) {
		  res.render('tice/liebiao', {
			title: '题册(书)列表',
			tices: mxs,
			page: page + 1,
			pages: Math.ceil(count / perPage)
		  });
	 });

//    Article.count().exec(function (err, count) {
//      res.render('articles/index', {
//        title: 'Articles',
//        articles: articles,
//        page: page + 1,
//        pages: Math.ceil(count / perPage)
//      });
//    });
  });
};
