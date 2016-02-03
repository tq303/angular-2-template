import { View, Component } from 'angular2/core';
import { Location, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouterLink, Router } from 'angular2/router';

import { RouterState } from './router';

// route components
import { Login }     from '../components/login/login';
import { Dashboard } from '../components/dashboard/dashboard';

@Component({
    selector: 'auth-app'
})
@View({
    templateUrl: 'templates/app.html',
    directives: [ RouterState, RouterLink ]
})
@RouteConfig([
    { path: '/', name: 'root', redirectTo: ['/Dashboard'] },
    { path: '/dashboard', component: Dashboard, name: 'Dashboard' },
    { path: '/login',     component: Login,     name: 'Login' },
])

export class App {

    constructor() {}

}
