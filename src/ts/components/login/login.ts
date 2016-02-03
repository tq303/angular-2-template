import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';

import { User } from '../../models/user';

@Component({
    selector: 'login',
})
@View({
    directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
    templateUrl: 'templates/login/login.html'
})

export class Login {

    constructor(
        public router: Router,
        public http: Http,
        public user: User
    ) {

    }

}
