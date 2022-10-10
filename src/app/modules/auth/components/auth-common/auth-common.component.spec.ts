import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCommonComponent } from './auth-common.component';

describe('AuthCommonComponent', () => {
  let component: AuthCommonComponent;
  let fixture: ComponentFixture<AuthCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
