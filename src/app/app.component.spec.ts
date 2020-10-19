import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RequestService } from './services/request.service';

describe('AppComponent', () => {
  // let userServiceStub: Partial<RequestService>;
  const userServiceStub = {
    get: () => {
      return null;
    },
    post: () => {
      return null;
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: RequestService, useValue: userServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    // userServiceStub = TestBed.inject(RequestService);
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'gradientCyberApp'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('gradientCyberApp');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('gradientCyberApp app is running!');
  // // });
});
