
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../server')
  , context = describe
  , User = mongoose.model('User')
  ,lianxipijuan = require('lianxipijuan');


var cookies, count

/**
 * Users tests
 */

describe('LianxiPijuan', function () {
  describe('Xinjian', function () {

    describe('Function Test', function () {
      before(function (done) {
		  /*
        User.count(function (err, cnt) {
          count = cnt
          done()
        })
		*/
		done();
      })

      it('xinjian', function (done) {
		  //lianxipijuan.xinjian( console.log );
		  done();
      })
      it('bianji', function (done) {
		  lianxipijuan.bianji( );
		  done();
      })
	/*
		it('should redirect to /articles', function (done) {
        request(app)
        .post('/users')
        .field('name', 'Foo bar')
        .field('username', 'foobar')
        .field('email', 'foobar@example.com')
        .field('password', 'foobar')
        .expect('Content-Type', /plain/)
        .expect('Location', /\//)
        .expect(302)
        .expect(/Moved Temporarily/)
        .end(done)
      })

      it('should insert a record to the database', function (done) {
        User.count(function (err, cnt) {
          cnt.should.equal(count + 1)
          done()
        })
      })

      it('should save the user to the database', function (done) {
        User.findOne({ username: 'foobar' }).exec(function (err, user) {
          should.not.exist(err)
          user.should.be.an.instanceOf(User)
          user.email.should.equal('foobar@example.com')
          done()
        })
		
      })*/
    })
  })

  after(function (done) {
    require('./helper').clearDb(done)
  })
})
