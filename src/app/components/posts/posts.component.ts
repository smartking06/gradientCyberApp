import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { APP_CONSTANTS } from './../../constants/constants';
import { Posts } from '../../model/app.model';
import { RequestService } from '../../services/request.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { API_ENDPOINTS } from './../../constants/api_constant';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  pid: number;
  title: number;
  body: string;
}

@Component({
  selector: 'gca-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  APP_CONSTANTS = APP_CONSTANTS;

  destroy$ = new Subject();

  displayedColumns: string[] = ['pid', 'name', 'title', 'body'];

  responsePosts: Partial<Posts>[];
  dataSource: Partial<Posts>[];

  showTitleSearchBox = false;
  showBodySearchBox = false;

  form: FormGroup;

  constructor(
    private readonly requestService: RequestService,
    private readonly fb: FormBuilder,
    private readonly cdRef: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initializeFormGroup();
    this.onValueChanges();
    this.getPostDetails();
  }

  initializeFormGroup(): void {
    this.form = this.fb.group({
      titleFilter: this.fb.control(null),
      postFilter: this.fb.control(null),
    });
  }

  onValueChanges(): void {
    this.form.controls.titleFilter.valueChanges.subscribe((val) => {
      const data = this.responsePosts.filter((p) => {
        return p.title.toLocaleLowerCase().includes(val);
      });
      this.dataSource = JSON.parse(JSON.stringify(data));
    });
    this.form.controls.postFilter.valueChanges.subscribe((val) => {
      const data = this.responsePosts.filter((p) => {
        return p.body.toLocaleLowerCase().includes(val);
      });
      this.dataSource = JSON.parse(JSON.stringify(data));
    });
  }

  getPostDetails(): void {
    this.requestService
      .get(API_ENDPOINTS.posts, 'Get All Posts')
      .pipe(
        takeUntil(this.destroy$),
        filter((data) => !!data)
      )
      .subscribe(
        (res: Posts[]) => {
          console.log(res);
          this.responsePosts = JSON.parse(JSON.stringify(res));
          this.dataSource = JSON.parse(JSON.stringify(res));
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getUserDetails(pid: number): void {
    const postDetails: Partial<Posts> = this.dataSource.filter(
      (d) => d.pid === pid
    )[0];

    this.router.navigateByUrl('/user/' + postDetails.uId);
  }

  clearTitleFilter(): void {
    this.form.get('titleFilter').setValue(null);
    this.showTitleSearchBox = false;
    this.dataSource = JSON.parse(JSON.stringify(this.responsePosts));
    this.cdRef.detectChanges();
  }
  clearBodyFilter(): void {
    this.form.get('postFilter').setValue(null);
    this.showBodySearchBox = false;
    this.dataSource = JSON.parse(JSON.stringify(this.responsePosts));
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }
}
