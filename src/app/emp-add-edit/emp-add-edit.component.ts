import { Component } from '@angular/core';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent {
  education: string[] = [
    '10 th',
    '12 th',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];
}
