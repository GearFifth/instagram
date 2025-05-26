import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../core/services/auth.service";
import {ROUTE_PATHS} from "../../../../core/constants/routes";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token: string | null = this.route.snapshot.queryParamMap.get('token');
    if (token == null) return;

    this.authService.verifyEmail(token).subscribe({
      next: () => {
        this._snackBar.open("User activated successfully", "OK")
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
