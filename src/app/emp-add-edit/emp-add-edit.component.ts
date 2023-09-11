import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreService } from 'core/core.service';

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
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _snackBar: MatSnackBar
    )
    {
    this.empForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', Validators.required],
      package: ['', Validators.required],
    })
  }

  onFormSubmit() {
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee Edited Succesfully!', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.log(err);
          },
        })
      }
      else
      {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee Added Succesfully!', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.log(err);
          },
        })
      }
    }
  }
}
