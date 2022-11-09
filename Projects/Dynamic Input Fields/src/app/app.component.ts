import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;
  data: any[];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      first: [''],
      inputList: this.fb.array([]),
    });
    this.addInputField;
  }

  get addInputField() {
    return this.form.get('inputList') as FormArray;
  }

  //Adds new input in list;
  add() {
    this.addInputField.push(this.createInput());
  }

  //Removes selected input field from list;
  remove(i) {
    this.addInputField.removeAt(i);
  }

  //create input field for the list;
  createInput() {
    return this.fb.group({
      input: [],
    });
  }
}
