import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styles: [],
})
export class DynamicsComponent {
  myForm: FormGroup = this.fb.group({
    name: ['Torito', [Validators.required, Validators.minLength(3)]],
    favorites: this.fb.array(
      [
        ['God of war', Validators.required],
        ['Dbz budokai', Validators.required],
      ],
      Validators.required
    ),
  });

  newFavorite: FormControl = this.fb.control('', Validators.required);

  get favoritesArray() {
    return this.myForm.get('favorites') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  fieldIsValid(field: string) {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  addFavorite() {
    if (this.newFavorite.invalid) {
      return;
    }
    // this.favoritesArray.push(new FormControl(this.newFavorite.value, Validators.required));á
    this.favoritesArray.push(
      this.fb.control(this.newFavorite.value, Validators.required)
    );

    this.newFavorite.reset();
  }

  save() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }

  delete(i: number) {
    this.favoritesArray.removeAt(i)
  }
}
