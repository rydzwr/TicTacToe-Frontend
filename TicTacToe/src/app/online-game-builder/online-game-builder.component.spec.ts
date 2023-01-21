import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineGameBuilderComponent } from './online-game-builder.component';

describe('OnlineGameBuilderComponent', () => {
  let component: OnlineGameBuilderComponent;
  let fixture: ComponentFixture<OnlineGameBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineGameBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineGameBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
