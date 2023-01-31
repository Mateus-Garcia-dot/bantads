import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteConsultaCpfComponent } from './gerente-consulta-cpf.component';

describe('GerenteConsultaCpfComponent', () => {
  let component: GerenteConsultaCpfComponent;
  let fixture: ComponentFixture<GerenteConsultaCpfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteConsultaCpfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteConsultaCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
