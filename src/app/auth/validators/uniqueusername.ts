// validate if the name is already used in the db
import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';

// injection serve per aver accesso al client hhtp
@Injectable({ providedIn: 'root' })
export class Uniqueusername implements AsyncValidator {
    constructor(private authService: AuthService) { }

    validate = (control: FormControl) => {
        const { value } = control;

        return this.authService.usernameAvaible(value).pipe(
            map(value => {
                if (value.available) {
                    return null;
                }
            }),
            catchError((err) => {
                console.log(err);
                if (err.error.username) {
                    //of operator is a shortcut to return a new observable
                    return of({
                        nonUniqueUsername: true
                    });
                } else {
                    return of({ noConnection: true });
                }
            }
            ));
    };
}
