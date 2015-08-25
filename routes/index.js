var express = require('express');
var router = express.Router();

/* quizController in order to use methods inside quiz_controller.js*/
var quizController = require('../controllers/quiz_controller');

/* commnetController in order to use methods inside comment_controller.js*/
var commentController = require('../controllers/comment_controller');

/* sessionController in order to use methods inside session_controller.js*/
var sessionController = require('../controllers/session_controller');

/* userController in order to use methods inside user_controller.js*/
var userController = require('../controllers/user_controller');

/* Autoload DB object*/
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);
router.param('userId', userController.load);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {title: 'QUIZ PROJECT', errors:[]});
});

/********************************QUIZES****************************************/
/* GET question routes*/
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired,
  quizController.edit);
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
  sessionController.loginRequired, commentController.publish);

/* POST question routes*/
router.post('/quizes/create', sessionController.loginRequired,
  quizController.create);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

/* PUT question routes*/
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired,
  quizController.update);

/* DELETE question routes*/
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired,
  quizController.destroy);
/********************************END*QUIZES************************************/

/*********************************SESSION**************************************/
/* GET session routes */
router.get('/login', sessionController.new);
router.get('/logout', sessionController.destroy);

/* POST session routes */
router.post('/login', sessionController.create);
/*******************************END*SESSION************************************/

/******************************USERS*ACCOUNT***********************************/
/* GET user account routes */
router.get('/user', userController.new);
router.get('/user/:userId(\\d+)/edit', sessionController.loginRequired,
  userController.edit);

/* POST user account routes */
router.post('/user', userController.create);

/* PUT user account routes */
router.put('/user/:userId(\\d+)', sessionController.loginRequired,
  userController.update);

  /* PELETE user account routes */
  router.delete('/user/:userId(\\d+)', sessionController.loginRequired,
    userController.destroy);
/****************************END*USERS*ACCOUNT*********************************/



module.exports = router;
