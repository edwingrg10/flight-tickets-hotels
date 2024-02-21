import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-edit-traveler',
  templateUrl: './add-or-edit-traveler.component.html',
  styleUrls: ['./add-or-edit-traveler.component.css']
})
export class AddOrEditTravelerComponent implements OnInit {
  identificationTypes: any[] = ['Pasaporte', 'Cédula', 'NIT']
  form: FormGroup = new FormGroup({});
  traveler: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddOrEditTravelerComponent>) {
    if (data && data.traveler) {
      this.traveler = data.traveler;
    }
  }

  ngOnInit() {
    this.createForm();
    if(this.traveler) {
      this.loadInfo();
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      identificationType: ['', Validators.required],
      identification: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      hasHoldSuitcase: [false, Validators.required]
    });
  }

  loadInfo() {
    this.form.controls['name'].setValue(this.traveler.name);
    this.form.controls['lastName'].setValue(this.traveler.lastName);
    this.form.controls['identificationType'].setValue(this.traveler.identificationType);
    this.form.controls['identification'].setValue(this.traveler.identification);
    this.form.controls['phone'].setValue(this.traveler.phone);
    this.form.controls['birthDate'].setValue(this.traveler.birthDate);
    this.form.controls['hasHoldSuitcase'].setValue(this.traveler.hasHoldSuitcase);
  }

  finishForm() {
    let params = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      identificationType: this.form.value.identificationType,
      identification: this.form.value.identification,
      phone: this.form.value.phone,
      birthDate: this.form.value.birthDate,
      hasHoldSuitcase: this.form.value.hasHoldSuitcase,
    }
    this.dialogRef.close(params)
  }
}
