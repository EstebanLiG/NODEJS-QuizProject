/* MiddleWare authorization*/
exports.loginRequired = function(req, res, next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/login');
  }
};

/* GET /login */
exports.new = function(req, res){
  var errors = req.session.errors || {};
  req.session.errors = {};
  res.render('sessions/new',{errors: errors});
};


/* POST /login */
exports.create = function(req, res){
  var login = req.body.login;
  var password = req.body.password;
  var userController = require('./user_controller');
  userController.authenticate(login, password, function(error, user){
    if(error){
      req.session.errors = [{"message": error.toString()}];
      res.redirect("/login");
    }else{
      req.session.user = {id: user.id, username: user.username, isAdmin: user.isAdmin};
      //Redirecction to path before login
      res.redirect(req.session.redir.toString());
    }
  });
};

/* DELETE /logout */
exports.destroy = function (req, res){
  req.session.cookie.expires = new Date(Date.now());
  //Redirecction to path before logout
  res.redirect(req.session.redir.toString());
};
