
/*!
 * Module dependencies.
 */

// Note: We can require users, articles and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

var users = require('users');
var articles = require('articles');
var comments = require('comments');
var tags = require('tags');
var auth = require('./middlewares/authorization');

var lianxi = require('lianxi');
var tice = require('tice');
var lianxipijuan = require('lianxipijuan');

/**
 * Route middlewares
 */

var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
var commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // user routes
  app.get('/login', users.login);
  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);
  app.get('/users/:userId', users.show);
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/github',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/twitter',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/google',
    passport.authenticate('google', {
      failureRedirect: '/login',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }), users.signin);
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/linkedin',
    passport.authenticate('linkedin', {
      failureRedirect: '/login',
      scope: [
        'r_emailaddress'
      ]
    }), users.signin);
  app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
      failureRedirect: '/login'
    }), users.authCallback);

  app.param('userId', users.load);

  // article routes
  app.param('id', articles.load);
  app.get('/articles', articles.index);
  app.get('/articles/new', auth.requiresLogin, articles.new);
  app.post('/articles', auth.requiresLogin, articles.create);
  app.get('/articles/:id', articles.show);
  app.get('/articles/:id/edit', articleAuth, articles.edit);
  app.put('/articles/:id', articleAuth, articles.update);
  app.delete('/articles/:id', articleAuth, articles.destroy);

  // home route
  app.get('/', articles.index);

  // comment routes
  app.param('commentId', comments.load);
  app.post('/articles/:id/comments', auth.requiresLogin, comments.create);
  app.get('/articles/:id/comments', auth.requiresLogin, comments.create);
  app.delete('/articles/:id/comments/:commentId', commentAuth, comments.destroy);

  // tag routes
  app.get('/tags/:tag', tags.index);


  //lianxi routes
  app.get('/lianxi/pijuan',  lianxi.pijuan);
  app.post('/lianxi/baocun',  lianxi.baocun);

  //题集练习批卷  //  批卷是练习章节的一个子功能模块
   app.param('lxzjid', lianxipijuan.load);
	app.get('/lianxipijuan/liebiao',  lianxipijuan.liebiao); ///lianxipijuans
	app.get('/lianxipijuan/xinjian',  lianxipijuan.xinjian);
	//app.get('/lianxipijuan/bianji',  lianxipijuan.bianji); //固定了ID，测试时使用的
	app.get('/lianxipijuan/:lxzjid/bianji',  lianxipijuan.bianji);
	app.post('/lianxipijuan/:lxzjid/baocun',  lianxipijuan.baocun);
	app.get('/lianxipijuan/:lxzjid/shanchu',  lianxipijuan.shanchu);


  //题册 tice
//  app.param('id', tice.jiazai);  //加载  //这个类似于过滤器，如果ID存在，则从数据库加载模型，出错等转至错误页面,使用next()转到下一个。这样在下面的函数中就不需要重复验证类似的ID
  app.get('/tice/liebiao', tice.liebiao);  //列表
 // app.get('/tice/liebiao', articles.index);  //列表
//  app.get('/tice/xinjian', tice.xinjian);  //新建
//  app.get('/tice/:id/chakan', tice.chakan );  //查看  (有些模块这个不需要)
//  app.get('/tice/:id/bianji', tice.bianji );  //编辑
//  //app.post('/tice/:id/baocun', tice.baocun);
//  app.post('/tice/baocun', tice.baocun);		//保存   数据以JSON格式提交至服务器
//  app.get('/tice/:id/shanchu', tice.shanchu );  //删除

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
}
