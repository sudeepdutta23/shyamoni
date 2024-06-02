import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shyamoni';
  public url = window.location.href;
  public showNav = true;

  constructor(private router: ActivatedRoute, private route: Router){
    this.url.includes('admin') ? this.showNav = false : this.showNav = true;
  }
}
