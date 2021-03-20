// validate if the name is already used in the db
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from '@angular/forms';

// injection serve per aver accesso al client hhtp
@Injectable({ providedIn: 'root' })
export class Uniqueusername implements AsyncValidator {
    constructor(private http: HttpClient) { }

    validate = (control: FormControl) => {
        const { value } = control;

        return this.http.post<any>('https://api.angular-email.com/auth/username', {
            username: value
        })
    }
}
