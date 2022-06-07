import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSoundsComponent } from './join-sounds.component';

describe('JoinSoundsComponent', () => {
  let component: JoinSoundsComponent;
  let fixture: ComponentFixture<JoinSoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinSoundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinSoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
