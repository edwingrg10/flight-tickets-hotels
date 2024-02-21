import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-edit-stepTwo',
  templateUrl: './add-or-edit-stepTwo.component.html',
  styleUrls: ['./add-or-edit-stepTwo.component.css']
})
export class AddOrEditStepTwoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  item: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddOrEditStepTwoComponent>) {
    if (data && data.item) {
      this.item = data.item;
    }
  }

  ngOnInit() {
    this.createForm();
    if(this.item) {
      this.loadInfo();
    }
  }

  createForm() {
    this.form = this.fb.group({
      afeCC: ['', Validators.required],
      account: ['', Validators.required],
    });
  }

  loadInfo() {
    this.form.controls['afeCC'].setValue(this.item.afeCC);
    this.form.controls['account'].setValue(this.item.account);
  }

  finishForm() {
    let params = {
      afeCC: this.form.value.afeCC,
      account: this.form.value.account
    }
    this.dialogRef.close(params)
  }

}
