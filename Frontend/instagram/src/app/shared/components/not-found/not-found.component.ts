import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ROUTE_PATHS} from "../../../core/constants/routes";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor(private router: Router) {
  }

  goToHome(){
    this.router.navigate([ROUTE_PATHS.POSTS]);
  }
}
