import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalGameBuilderComponent } from './local-game-builder.component';

describe('LocalGameBuilderComponent', () => {
  let component: LocalGameBuilderComponent;
  let fixture: ComponentFixture<LocalGameBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalGameBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalGameBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
