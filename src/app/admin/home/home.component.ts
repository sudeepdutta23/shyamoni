import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public dashboard: any = [];

  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
    this.getDashboardData()
  }

  getDashboardData = () =>{
    this.adminservice.getDashboardData().subscribe(({data, error})=>{
      this.dashboard = data;
    })
  }

}
