'use strict';

const express        = require('express'),
	  path           = require('path'),
	  app            = express(),
	  passport       = require('passport'),
	  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	  expressSession = require('express-session'),
	  bodyParser     = require('body-parser'),
	  cookieParser   = require('cookie-parser');

const googleConfig = require('./google_config.json');

// authentication
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((obj, done) => {
	done(null, obj);
});

// google auth
passport.use(new GoogleStrategy({
    clientID: googleConfig.web.client_id,
    clientSecret: googleConfig.web.client_secret,
    callbackURL: googleConfig.web.redirect_uris[0],
	authorizationURL: googleConfig.web.auth_uri,
  },
  (accessToken, refreshToken, profile, done) => {
	  let user = {
		  googleId: profile.id,
		  accessToken: accessToken,
		  refreshToken: refreshToken,
		  displayName: profile.displayName
	  };
	  return done(null, user);
  }
));

// overide passport-oauth2 function to allow to custom params
GoogleStrategy.prototype.authorizationParams = function(options) {
	return options.params || {};
};

// web server setup
app.use(express.static(path.join(__dirname, 'dist')));

var port = 8888;

if (process.env.SERVER_PORT) {
	port = parseInt(process.env.SERVER_PORT, 10);
}

app.use(expressSession({ secret: 'mubaloo secret' }));
app.use(bodyParser());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] , params: { hd: "mubaloo.com" } }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/#/login' }), (req, res) => {
	res.redirect('/#/dashboard');
});

app.listen(port);

console.log('listening on localhost:' + port);
