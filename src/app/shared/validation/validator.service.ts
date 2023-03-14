import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public nameSurnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  cannotBeTorito(control: FormControl): ValidationErrors | null {
    const value: string = control.value?.trim().toLowerCase();
    if (value === 'torito') {
      return {
        noTorito: true,
      };
    }
    return null;
  }

  equalFields(label1: string, label2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const pass1 = formGroup.get(label1)?.value;
      const pass2 = formGroup.get(label2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(label2)?.setErrors({ notEquals: true });
        return {
          notEquals: true,
        };
      }
      formGroup.get(label2)?.setErrors(null);

      return null;
    };
  }
}
