import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validation/validator.service';
import { EmailValidatorService } from '../../../shared/validation/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validator.nameSurnamePattern),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.validator.emailPattern)],
        [this.emailValidator],
      ],
      username: ['', [Validators.required, this.validator.cannotBeTorito]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [this.validator.equalFields('password', 'password2')],
    }
  );

  get emailErrorMsg(): string {
    const errors = this.myForm.get('email')?.errors;
    if (errors?.['required']) {
      return 'Email is required';
    } else if (errors?.['pattern']) {
      return 'It is not an email type';
    } else if (errors?.['emailUsed']) {
      return 'This email already exists';
    }

    return '';
  }

  constructor(
    private fb: FormBuilder,
    private validator: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.myForm.reset({
      name: 'Juan Sanchez',
      email: 'test1@test.com',
      username: 'toro',
      password: '123456',
      password2: '123456',
    });
  }

  fieldNotValid(field: string) {
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  // emailRequired() {
  //   return this.myForm.get('email')?.errors?.['required'] && this.myForm.get('email')?.touched;
  // }

  // emailFormat() {
  //   return this.myForm.get('email')?.errors?.['pattern'] && this.myForm.get('email')?.touched;
  // }

  // emailUsed() {
  //   return this.myForm.get('email')?.errors?.['emailUsed'] && this.myForm.get('email')?.touched;
  // }

  submitForm() {
    console.log(this.myForm.value);

    this.myForm.markAllAsTouched();
  }
}
