import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingPlayersLobbyComponent } from './awaiting-players-lobby.component';

describe('AwaitingPlayersLobbyComponent', () => {
  let component: AwaitingPlayersLobbyComponent;
  let fixture: ComponentFixture<AwaitingPlayersLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitingPlayersLobbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwaitingPlayersLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
