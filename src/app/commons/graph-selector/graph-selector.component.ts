import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-graph-selector',
  templateUrl: './graph-selector.component.html',
  styleUrls: ['./graph-selector.component.scss']
})
export class GraphSelectorComponent implements OnInit {

  selected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);


  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit() {
  }
}
