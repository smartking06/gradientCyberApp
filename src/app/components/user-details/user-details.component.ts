import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../model/app.model';

@Component({
  selector: 'gca-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  userDetails: User;

  constructor(
    private readonly router: Router,
    private readonly requestService: RequestService
  ) {}

  ngOnInit(): void {
    console.log(this.router.url.split('/')[2]);
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.requestService
      .get(this.router.url.substring(1, this.router.url.length), 'User details')
      .pipe(
        takeUntil(this.destroy$),
        filter((data) => !!data)
      )
      .subscribe(
        (res) => {
          this.userDetails = JSON.parse(JSON.stringify(res));
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
}
