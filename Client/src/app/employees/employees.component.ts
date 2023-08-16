import { Component,OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  constructor(public service:EmployeeService){}
  ngOnInit(): void {
    this.service.fetchEmployeeList();
  }

  populateForm(selectedRecord:Employee){
    this.service.employeeForm.setValue({
      _id:selectedRecord._id,
      fullName:selectedRecord.fullName,
      position:selectedRecord.position,
      location:selectedRecord.location,
      salary:selectedRecord.salary
    })
  }

  onDelete(_id:string){
    if(confirm("Are you sure want to delete this data?")){
      this.service.DeleteEmployee(_id).subscribe(res=>{
        this.service.fetchEmployeeList();
      })
    }
  }
}
