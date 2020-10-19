import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

import { UserDetailsComponent } from './user-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  // let userServiceStub: Partial<RequestService>;
  let router: Router;

  const userServiceStub = {
    get: () => of([]),
    post: () => of([]),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserDetailsComponent],
      providers: [{ provide: RequestService, useValue: userServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
