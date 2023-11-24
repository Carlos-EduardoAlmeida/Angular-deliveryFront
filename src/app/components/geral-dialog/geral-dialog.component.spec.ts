import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeralDialogComponent } from './geral-dialog.component';

describe('GeralDialogComponent', () => {
  let component: GeralDialogComponent;
  let fixture: ComponentFixture<GeralDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeralDialogComponent]
    });
    fixture = TestBed.createComponent(GeralDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
