import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationComponent } from 'src/app/common/notification/notification.component';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
  id: string;
  // gender: string;
  name: string;
  phoneNo: number;
  userPhoto: string;
  email: string;
  // dob: string;
  editData: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'userPhoto',
    'name',
    // 'gender',
    'phoneNo',
    'email',
    // 'dob',
    'editData',
  ];

  public dataSource = new MatTableDataSource<any>();

  public allUsers: any;

  public editIndex: any;

  public phoneNo: any;
  public email: any;

  constructor(private adminservice: AdminService, private notif: NotificationComponent) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers = () => {
    this.adminservice
      .getAllUsers()
      .subscribe(({ data: { getAllUser }, error }) => {
        this.dataSource = new MatTableDataSource<any>(getAllUser);
        this.allUsers = getAllUser;
      });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editClick = (index: number) =>{
    this.email = this.allUsers[index].email;
    this.phoneNo = this.allUsers[index].phoneNo;
    this.editIndex = index;
  } 

  updateUserProfile = (index: number) =>{
    this.adminservice.updateUserData(this.allUsers[index].id,{phoneNo: this.phoneNo, email: this.email}).subscribe(({data, error})=>{
      if(!error){
        this.getAllUsers();
        this.notif.showSuccess(data)
        this.editIndex = null;
      }
    })
  }

  defaultProfile = (e: any) => e.target.src = environment.defaultImage;

}
