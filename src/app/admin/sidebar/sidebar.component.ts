import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private adminservice: AdminService, private router: Router) {
}
ngOnInit(): void {}

logout = () =>{
  this.adminservice.adminLogout().subscribe(({ error, data })=>{
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin'])
  })
}
}
