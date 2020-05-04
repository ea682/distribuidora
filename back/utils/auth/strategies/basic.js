const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("boom");
const bcrypt = require("bcrypt");


const UsersServices = require('../../../services/users');
const usersServices = new UsersServices();

passport.use(
    new BasicStrategy(async function(email, password, cb) {
      try {
        const [user] = await usersServices.validarLogin(email);
        
  
        if (!user) {
          return cb(boom.unauthorized(), false);
        }
  
        if (!(await bcrypt.compare(password, user.Password))) {
          return cb(boom.unauthorized(), false);
        }
  
        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    })
  );