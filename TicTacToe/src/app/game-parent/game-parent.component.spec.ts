import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameParentComponent } from './game-parent.component';

describe('GameParentComponent', () => {
  let component: GameParentComponent;
  let fixture: ComponentFixture<GameParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
