import { View, Component } from 'angular2/core';
import { Location, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router } from 'angular2/router';

import { State } from './state';
import { Dashboard } from '../dashboard/dashboard';
import { Login } from '../login/login';

@Component({
    selector: 'auth-app'
})
@View({
    templateUrl: 'templates/app.html',
    directives: [ State, RouterLink ]
})
@RouteConfig([
    { path: '/', name: 'Root', redirectTo: ['Dashboard', 'Login'] },
    { path: '/dashboard', component: Dashboard, name: 'Dashboard' },
    { path: '/login',     component: Login,     name: 'Login' },
])

export class App {
    constructor() {}
}
