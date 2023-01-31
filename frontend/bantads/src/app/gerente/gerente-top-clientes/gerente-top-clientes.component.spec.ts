import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteTopClientesComponent } from './gerente-top-clientes.component';

describe('GerenteTopClientesComponent', () => {
  let component: GerenteTopClientesComponent;
  let fixture: ComponentFixture<GerenteTopClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteTopClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteTopClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
