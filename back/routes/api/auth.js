const express = require("express");
const passport = require("passport");
const boom = require("boom");
const jwt = require("jsonwebtoken");
const api = express.Router();

const { config } = require("../../config");

// Basic strategy
require("../../utils/auth/strategies/basic");

//Service user.
const UsersServices = require('../../services/users');
const usersServices = new UsersServices();

api.post("/", async function(req, res, next) {
  passport.authenticate("basic", function(error, user) {
    try {
      user = req.body.email;
      password = req.body.password;

      //Validamos que ingresara usuarios.
      if (error || !user || !password) {
        //next(boom.unauthorized());
        return res.status(200).json({ result: 'unauthorized' });
      }
      
      //Obtenemos los datos del usuario y los validamos que existan en la BD.
      async function getDatosUser(user){
        //Realizamos la consulta.
        let resultado = await usersServices.getUser(user);
        return resultado;
      }

      //realizamos la llamada para comparar las password.
      async function resultCompararPassword(user, password){
        let resultado = await usersServices.compararPassword(user, password)
        return resultado;
      }
      
      //Ejecutamos promesa de los datos del usuario.
      const datos = getDatosUser(user, password)
      .then(result => {

        //Obtenemos los datos del usuario.
        getUser = result[0].NombreUser;
        getEmail = result[0].Email;
        getPassword = result[0].Password;

        //Ejecutamos la promesa de la comparacion de password.
        const resultComparacion = resultCompararPassword(password, getPassword)
        .then(re => {
          //Validamos la comparacion de la password.
          if(re){
            req.login(user, { session: false }, async function(error) {
              if (error) {
                return res.status(200).json({ access_token: 'Invalid' });
              }
              
              const payload = { user: getUser, email: getEmail};
              
              const token = jwt.sign(payload, config.authJwtSecret);
              
              //Devolvemos el jwt
              return res.status(200).json({ access_token: token });
            });
          }
          else{
            //Retornamos claves invalidas
            return res.status(200).json({ access_token: 'Invalid' });
          }
        })
        .catch(err => {
          //Ejecutamos las prmoresas
          resultComparacion
          return res.status(200).json({ access_token: 'Invalid' });
        })        
      })
      .catch(err => {
        datos
        return res.status(200).json({ access_token: 'Invalid' });
      })
      

    } catch (error) {
      return res.status(200).json({ access_token: 'Invalid' });
    }
  })(req, res, next);
});

api.post("/:token", async function(req, res, err) {
  const { token } = req.params;
  //Validamos que tenga datos.
  if(token){
    try {
      //Ejecutamos la funcion que valida los token.
      jwt.verify(token, config.authJwtSecret,function(err, val){
        if(err){
          //El token no es valido
          return res.status(200).json({ error: 'Invalid Token' });
        }else{
          //El token esta OK
          return res.status(200).json({ access_token: true });
        }
        });
    } catch (error) {
      console.log(123);
    }

  }else{
    return res.status(200).json({ messaje: 'Invalid' });
  }
});

module.exports = api;