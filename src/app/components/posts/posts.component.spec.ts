import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestService } from 'src/app/services/request.service';

import { PostsComponent } from './posts.component';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Posts } from 'src/app/model/app.model';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let router: Router;
  let spyNavigateByUrl;

  const mockRes = [
    {
      pid: 1,
      name: 'Max',
      uId: 1,
      title: 'Hello, this is Max!!!',
      body: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    {
      pid: 2,
      name: 'William',
      uId: 2,
      title: 'Hello, this is William!!!',
      body: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    {
      pid: 3,
      name: 'Himanshu',
      uId: 4,
      title: 'Hello, this is Himanshu!!!',
      body: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    {
      pid: 4,
      name: 'Phillip',
      uId: 6,
      title: 'Hello, this is Phillip!!!',
      body: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    {
      pid: 5,
      name: 'jay',
      uId: 3,
      title: 'Hello, this is jay!!!',
      body: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    {
      pid: 6,
      name: 'Mr. X',
      uId: 5,
      title: 'Hello, this is Mr. X!!!',
      body: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
  ];
  const userServiceStub = {
    get: () => of([]),
    post: () => of([]),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      declarations: [PostsComponent],
      providers: [
        { provide: RequestService, useValue: userServiceStub },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Router, useValue: router },
        ChangeDetectorRef,
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = fixture.debugElement.injector.get(Router);
    spyNavigateByUrl = spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear title filter', () => {
    component.showTitleSearchBox = true;
    expect(component.showTitleSearchBox).toBe(true);
    component.clearTitleFilter();
    expect(component.showTitleSearchBox).toBe(false);
    fixture.detectChanges();
  });
  it('should clear body filter', () => {
    component.showBodySearchBox = true;
    expect(component.showBodySearchBox).toBe(true);
    component.clearBodyFilter();
    expect(component.showBodySearchBox).toBe(false);
    fixture.detectChanges();
  });

  it('', () => {
    spyNavigateByUrl = spyOn(router, 'navigateByUrl');
    const url = router.url;
    spyNavigateByUrl.calls.first().args[0];
    let pid = 2;
    component.getUserDetails(pid);
    // const postDetails: Partial<Posts> = mockRes.filter((d) => d.pid === pid)[0];
    expect(url).toBe('users/2');
  });
});
