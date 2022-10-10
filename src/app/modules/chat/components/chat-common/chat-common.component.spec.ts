import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCommonComponent } from './chat-common.component';

describe('ChatCommonComponent', () => {
  let component: ChatCommonComponent;
  let fixture: ComponentFixture<ChatCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
