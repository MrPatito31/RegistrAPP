import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrgeneratePage } from './qrgenerate.page';

describe('QrgeneratePage', () => {
  let component: QrgeneratePage;
  let fixture: ComponentFixture<QrgeneratePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrgeneratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
