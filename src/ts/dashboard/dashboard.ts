import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router, RouterLink } from 'angular2/router';

@Component({
    selector: 'dashboard'
})
@View({
    templateUrl: 'templates/dashboard/dashboard.html',
    directives: [CORE_DIRECTIVES, RouterLink]
})

export class Dashboard {

    auth_token: string;
    response:   string;
    api:        string;

    constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
        this.auth_token = localStorage.getItem('auth_token');
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.router.parent.navigateByUrl('/login');
    }

    callSecuredApi() {
        this.authHttp.get('http://localhost:8888/documents')
            .subscribe(
                response => {
                    console.log(response);
                    this.response = response.json()
                },
                error => {
                    this.response = error.json()
                }
            );
    }
}
