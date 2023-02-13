const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwtSecret = require("../../config").api.jwtSecret;
const { findUserById } = require("../users/users.controllers");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: jwtSecret,
};
passport.use(
  new JwtStrategy(options, async (tokenDecoded, done) => {
   
    try {
      const user = await findUserById(tokenDecoded.id);
      if (!user) {
        return done(null, false); //? No tenemos error, pero tampoco el usuario
      }
      return done(null, tokenDecoded); //? No tenemos error, pero si el usuario
    } catch (error) {
      return done(error, false); //? Si tenemos un error, pero no el usuario
    }
  })
);

module.exports = passport;