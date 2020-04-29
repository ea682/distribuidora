const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("boom");
const { config } = require("../../../config");
const UsersServices = require('../../../services/users');
const usersServices = new UsersServices();

passport.use(

    //Obtenemos los datos para leer el Token
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    //Esperamos que responda y lo obtenemos
    async function(tokenPayload, cb) {

      try {
        //Realizamos la consulta en la BD.
        const [user] = await usersServices.validarLogin(tokenPayload.user);
        
        //Validamos que exista.
        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);