import { Injectable } from 'angular2/core';

@Injectable()
export class User {

    private name: string;

    constructor() {
        this.name = 'oliver white';
    }

    create() {

    }

    destroy() {
        console.log(document.cookie);
    }

    authenticated() {

        let stripCookies = document.cookie.replace(/\s/g, '');

        let cookieKeys = stripCookies.split(';').map(cookie => {
            return cookie.split('=')[0];
        });

        return (cookieKeys.indexOf('access_token') >= 0) && (cookieKeys.indexOf('refresh_token') >= 0);
    }

    get() {
        return this.name;
    }

    set(name) {
        this.name = name;
    }

}
