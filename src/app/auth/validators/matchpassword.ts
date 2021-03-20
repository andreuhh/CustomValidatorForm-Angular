import { FormGroup, Validator } from '@angular/forms';

export class Matchpassword implements Validator {
    validate(formGroup: FormGroup) {
        const { password, passwordConfirmation } = formGroup.value;

        if (password === passwordConfirmation) {
            return null;
        } else {
            return { passwordsDontMatch: true };
        }
    }
}
