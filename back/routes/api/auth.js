const express = require("express");
const passport = require("passport");
const boom = require("boom");
const jwt = require("jsonwebtoken");
const api = express.Router();

const { config } = require("../../config");

// Basic strategy
require("../../utils/auth/strategies/basic");

api.post("/", async function(req, res, next) {
  passport.authenticate("basic", function(error, user) {
    try {
      if (error || !user) {
        next(boom.unauthorized());
      }

      req.login(user, { session: false }, async function(error) {
        if (error) {
          next(error);
        }
        console.log("------------------------")
        console.log(user)
        const payload = { user: user.NombreUser, email: user.Email};
        console.log("------------------------1")
        console.log(payload)
        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: "15m"
        });

        return res.status(200).json({ access_token: token });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

module.exports = api;