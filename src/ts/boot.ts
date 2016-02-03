import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { FORM_PROVIDERS } from 'angular2/common';
import { ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { Http, HTTP_PROVIDERS } from 'angular2/http';

import { App } from './app/app';
import { User } from './models/user';
import { ProtectedHttp } from './services/protected.http';

bootstrap(
  App,
  [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF, {useValue : '/'}), // set base url
    provide(LocationStrategy, {useClass: HashLocationStrategy}), // use hash separator for url
    ProtectedHttp,
    User
  ]
);
