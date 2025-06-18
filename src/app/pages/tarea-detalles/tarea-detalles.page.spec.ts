import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaDetallesPage } from './tarea-detalles.page';

describe('TareaDetallesPage', () => {
  let component: TareaDetallesPage;
  let fixture: ComponentFixture<TareaDetallesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
