import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../core/services/auth.service";
import {ROUTE_PATHS} from "../../../../core/constants/routes";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit{
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token: string | null = this.route.snapshot.queryParamMap.get('token');
    if (token == null) return;

    this.authService.verifyEmail(token).subscribe({
      next: () => {
        console.log('User activated successfully');
        setTimeout(() => {
          this.router.navigate([ROUTE_PATHS.AUTH_LOGIN]);
        }, 5000);
      },
      error: (error) => {
        console.error('Error while activating user:', error);
      }
    });
  }
}
