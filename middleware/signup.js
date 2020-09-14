const User = require('../models/user')

module.exports = async function (req, res, next) {
  try {
    if(!req.captcha) {
      req.session.error = 'Authentication failed, please check captcha.'
      next()
    }else{
      const temp_user = new User({name: req.body.username, 
                                  pass: req.body.password, 
                                  first_name: req.body.first_name})
      const db_user = await temp_user.sign_up()

      if(db_user){
        req.session.regenerate(function(){
          req.session.user = db_user
          req.session.success = 'Authenticated as ' + db_user.nickname
          next()
        })
      }
      else{
        req.session.error = 'Authentication failed, please check your '
          + ' username and password.'
        next()
      }
    }
  }catch (error) {
    next(error)
  }
}