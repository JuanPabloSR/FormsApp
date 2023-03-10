import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [],
})
export class SwitchesComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    genre: ['F', Validators.required],
    notifications: [false, Validators.required],
    conditions: [true, Validators.requiredTrue]
  });

  person = {
    genre: 'M',
    notifications: true,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm.reset({...this.person, conditions: true});

    this.myForm.valueChanges.subscribe( ({conditions, ...rest}) =>  {

      this.person = rest;
    })
  }

  save(){
    const formValue = { ...this.myForm.value };
    delete formValue.conditions;

    this.person = formValue;

  }
}
