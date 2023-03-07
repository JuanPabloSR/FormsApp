import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styles: [],
})
export class BasicsComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;

  initForm = {
    product: 'rtx',
    price: 10,
    stock: 10
  }

  constructor() {}

  ngOnInit(): void {}

  nameValid() {
    return (
      this.myForm?.controls['product']?.invalid &&
      this.myForm?.controls['product']?.touched
    );
  }

  priceValid(): boolean{
    return (
      this.myForm?.controls['price']?.touched &&
      this.myForm?.controls['price']?.value < 0
    )
  }

  save() {
    // console.log(this.myForm);

    console.log('correct post');

    this.myForm.resetForm({
      price: 0,
      stocks: 0
    })
  }
}
