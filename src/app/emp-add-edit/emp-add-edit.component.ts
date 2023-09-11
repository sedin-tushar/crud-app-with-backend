import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    '10 th',
    '12 th',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  constructor(private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: DialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
    )
    {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })
  }

  onFormSubmit() {
    if(this.empForm.valid){
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employe Added Successfully')
          this._dialogRef.close();
        },
        error: (err: any) =>{
          console.log(err);
        },
      })
    }
  }
}
