import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr/public_api';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: [
  ]
})
export class EmployeeFormComponent {
  constructor(public service:EmployeeService){}
  submitted:boolean=false

  onSubmit(){
    this.submitted=true
    debugger;
    if(this.service.employeeForm.valid)
      console.log(this.service.employeeForm.get("_id"));
      if(this.service.employeeForm.get("_id")?.value=='')     
        this.service.postEmployee().subscribe(res=>{
          console.log("Got the response");
          this.resetForm();
          this.service.fetchEmployeeList();
        })
      else
      this.service.putEmployee().subscribe(res=>{
        this.service.fetchEmployeeList();
        console.log("updated the response");
        this.resetForm();
        
      })
    
  }

    resetForm(){
      this.service.employeeForm.reset();
      this.submitted=false;
    }
}
