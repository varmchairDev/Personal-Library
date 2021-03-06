/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({title:'Chai node.js:Friend or foe?'})
        .end(function(error,respond){
          assert.equal(respond.status,200)
          assert.equal(respond.body.title,'Chai node.js:Friend or foe?')
          done();
        })
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({title:''})
        .end(function(error,respond){
          assert.equal(respond.status,200)
          assert.equal(respond.body.title,undefined)
          done();
        })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(error,respond){
          assert.equal(respond.status,200)
          assert.isArray(respond.body)
          assert.property(respond.body[0],'title')
          assert.property(respond.body[0],'_id')
          done();
        })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/5ccadd5a140ed73cd9b885e2')
        .end(function(error,respond){
          assert.equal(respond.status,200)
          assert.isNotArray(respond.body)
          done();
        })
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/5ccadd5a140ed73cd9b885ec')
        .end(function(error,respond){
          assert.equal(respond.status,200)
          assert.isNotArray(respond.body)
          assert.equal(respond.body.title,'Test')
          done();
        })
      });
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
        .post('/api/books/5ccadd5a140ed73cd9b885ec')
        .send({_id:'5ccadd5a140ed73cd9b885ec',"comment":'Chai testing'})
        .end(function(error,respond){
          assert.equal(respond.status,200)
          assert.isNotArray(respond.body)
          done();
        })
      });
      
    });

  });

});
