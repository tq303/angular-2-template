import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { Router, RouterLink } from 'angular2/router';

import { User } from '../../models/user';
import { ProtectedHttp } from '../../services/protected.http';

@Component({
    selector: 'dashboard'
})
@View({
    templateUrl: 'templates/dashboard/dashboard.html',
    directives: [ CORE_DIRECTIVES, RouterLink ]
})

export class Dashboard {

    auth_token: string;
    response:   string;
    api:        string;

    constructor(
        public router: Router,
        public protectedHttp: ProtectedHttp,
        public user: User
    ) {
        
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.router.parent.navigateByUrl('/login');
    }

    callSecuredApi() {
        this.protectedHttp.get('documents')
            .subscribe(
                response => console.log(response),
                error => console.log(error),
                () => console.log('complete')
            );
    }
}
