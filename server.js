'use strict';

const express        = require('express'),
      path           = require('path'),
      app            = express(),
      expressSession = require('express-session'),
      bodyParser     = require('body-parser'),
      cookieParser   = require('cookie-parser');

// google setup
const googleConfig = require('./google_config.json'),
      google       = require('googleapis'),
      OAuth2       = google.auth.OAuth2;

let gAuth = new OAuth2(googleConfig.web.client_id, googleConfig.web.client_secret, googleConfig.web.redirect_uris[0]);

const drive = google.drive({ version: 'v2', auth: gAuth });

// web server setup
app.use(express.static(path.join(__dirname, 'dist')));

var port = 8888;

if (process.env.SERVER_PORT) {
	port = parseInt(process.env.SERVER_PORT, 10);
}

app.use(expressSession({
	name: 'domain.ksf.sid',
	secret: 'domain secret',
}));
app.use(bodyParser());
app.use(cookieParser());

// initial auth request
app.get('/auth/google', (req, res) => {
	res.redirect(gAuth.generateAuthUrl({
		access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
		scope: [
			'https://www.googleapis.com/auth/plus.login',
			'https://www.googleapis.com/auth/drive'
		],
		// hd: "domain.com"
	}));
});

// oauth callback url
app.get('/auth/google/callback', (req, res) => {

	gAuth.getToken(req.query.code, (err, tokens) => {

		if(!err) {
			gAuth.setCredentials(tokens);
			res.cookie('access_token',  tokens.access_token);
			res.cookie('refresh_token', tokens.refresh_token);
			res.redirect('/#/dashboard');
		}

	});

});

// initial auth request
app.delete('/auth/destroy', (req, res) => {

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.clearCookie('domain.ksf.sid');

    return res.status(200).send('user session destroyed');

});

// get google docs list
app.get('/documents', (req, res) => {

	gAuth.setCredentials({
		access_token: req.cookies.access_token,
		refresh_token: req.cookies.refresh_token
	});

	drive.files.list({}, function(err, response) {

        if (err) {

            res.status(err.code).send({
                'message': err.message
            });

        } else {

            res.send(response.items.map(item => {
                return {
                    id:            item.id,
                    title:         item.title,
                    embedLink:     item.embedLink,
                    iconLink:      item.iconLink,
                    thumbnailLink: item.thumbnailLink,
                }
            }));

        }


	});

});

app.listen(port);

console.log('listening on localhost:' + port);
