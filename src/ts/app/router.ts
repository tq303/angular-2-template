/**
 * All routes go through here
 */
import { Injectable } from 'angular2/core';
import { Directive, Attribute, ElementRef, DynamicComponentLoader } from 'angular2/core';
import { Router, RouterOutlet, RouteRegistry, ComponentInstruction } from 'angular2/router';


import { User } from '../models/user';
import { ProtectedHttp } from '../services/protected.http';

@Directive({
    selector: 'router-outlet'
})

export class RouterState extends RouterOutlet {

    publicRoutes: any;
    private parentRouter: Router;

    constructor(
        _elementRef: ElementRef,
        _loader: DynamicComponentLoader,
        _parentRouter: Router,
        @Attribute('name') nameAttr: string,
        public user: User
    ) {

        super(_elementRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.publicRoutes = {
            '/login': true
        };

    }

    activate(instruction: ComponentInstruction) {

        // on every entry check user
        if (!this.user.authenticated()) {

            if (instruction.urlPath !== 'login') {

                this.parentRouter.navigateByUrl('/login');

            } else {

                return super.activate(instruction);

            }

        } else {

            return super.activate(instruction);

        }


    }

}
