/**
 * [AuthHttp description]
 * Relies on auth_token cookie
 */
import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import { Router, RouterLink } from 'angular2/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

import { contentHeaders } from '../common/http';

@Injectable()
export class ProtectedHttp {

    private url: string;

    constructor(
        public router: Router,
        public http: Http,
        public user: User
    ) {
        this.url = 'http://127.0.0.1:8888';
    }

    get(endpoint) {
        return this.requestObserver(this.http.get(`${this.url}/${endpoint}`, contentHeaders));
    }

    post(endpoint, body) {
        return this.requestObserver(this.http.post(`${this.url}/${endpoint}`, body, contentHeaders));
    }

    put(endpoint, body) {
        return this.requestObserver(this.http.put(`${this.url}/${endpoint}`, body, contentHeaders));
    }

    delete(endpoint) {
        return this.requestObserver(this.http.delete(`${this.url}/${endpoint}`, contentHeaders));
    }

    patch(endpoint, body) {
        return this.requestObserver(this.http.patch(`${this.url}/${endpoint}`, body, contentHeaders));
    }

    head(endpoint) {
        return this.requestObserver(this.http.head(`${this.url}/${endpoint}`, contentHeaders));
    }

    /**
     * [requestObserver description]
     * @type {[Observable]}
     * @description
     * Runs Http request and returns observable, intended to handle unauthorized requests.
     */
     requestObserver(requestType) {

         let source = Observable.create((observer)=> {

             requestType.subscribe(
                 response => {
                     observer.next(response.json());
                     observer.complete();
                 },
                 error => {
                     // handle unauthorized
                     if (error.status === 401) {

                         this.unauthorized();

                     } else {
                         // subscribe all other errors
                         observer.error();
                     }
                 }
             );

         });

         return source;
     }

     /**
      * [unauthorized description]
      * @return {[observable]}
      * @desciroption
      * Handles unauthorized requests
      */
     unauthorized() {
         this.http.delete(`${this.url}/auth/destroy`, contentHeaders)
             .subscribe(
                 response => {
                     this.user.destroy();
                     this.router.navigateByUrl('/login');
                 },
                 error => {
                     console.log(error);
                 }
             );
     }

}
