import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteConsultaClientesComponent } from './gerente-consulta-clientes.component';

describe('GerenteConsultaClientesComponent', () => {
  let component: GerenteConsultaClientesComponent;
  let fixture: ComponentFixture<GerenteConsultaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteConsultaClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteConsultaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
