import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySoundsComponent } from './play-sounds.component';

describe('PlaySoundsComponent', () => {
  let component: PlaySoundsComponent;
  let fixture: ComponentFixture<PlaySoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaySoundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaySoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
